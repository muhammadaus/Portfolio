# 最適化で見るべきもの: ツールより先に空間的局所性を見る

最適化は、よく「Rust、Numba、Polars のどれを使うべきか」という問いから始まります。しかし最初に見るべき問いは別です。「CPU にどんなメモリアクセスをさせているのか」です。

[HL-Optimizer](https://github.com/muhammadaus/HL-Optimizer) のベンチマークは、この違いをかなり具体的に示しています。Monaco の OpenStreetMap データでは、空間インデックスをメモリに保持し続ける長時間稼働サービスでは Rust の KdTree が強く、データを頻繁に読み直して大きな連続配列を処理するバッチでは Numba の flat-grid が有効でした。決め手は言語名ではなく、適応的な枝刈りが効くのか、単純で連続したメモリアクセスが効くのかです。

ツールを選ぶ前に、この視点で見るのが重要です。

## 本当のボトルネックはメモリであることが多い

現代の CPU は計算そのものには非常に強い一方で、メモリアクセスには弱い面があります。次に使う値が今の値の近くにあり、キャッシュに乗っていれば処理は進みます。しかし毎回ポインタをたどって別のヒープ領域へ飛ぶと、実行はメモリ待ちになります。

同じ Big-O のアルゴリズムでも性能が大きく変わるのはこのためです。

- フラットな配列走査は予測しやすく、ベクトル化しやすく、キャッシュに優しい。
- ポインタの多い木構造は探索範囲を大きく削れる一方で、各ステップが別のメモリ位置へ飛びやすい。
- Python オブジェクトのループは、アルゴリズムが単純でもインタプリタとオブジェクト配置のコストを払う。
- Polars や Numba が連続した列データを処理できる場合、多くの処理をネイティブコード側に閉じ込められる。

大事なのは、ライブラリ名の前にデータの形を見ることです。

![連続した Structure-of-Arrays とポインタの多いオブジェクト構造を比較する図](../../img/blog/data-shapes-locality.svg)

## 空間的局所性

空間的局所性とは、一緒に使うデータが近くに置かれていることです。道路リンクの座標、バウンディングボックス、グリッドセル情報がコンパクトな配列に入っていれば、バッチ処理は少ないキャッシュミスでメモリを流れるように読めます。

例えば、次の形はバッチ処理に向いています。

```text
x1: [ ... contiguous float64 ... ]
y1: [ ... contiguous float64 ... ]
x2: [ ... contiguous float64 ... ]
y2: [ ... contiguous float64 ... ]
```

一方で、次のような形は CPU には重くなりやすいです。

```text
Link {
    geometry: Vec<Point>,
    name: String,
    metadata: HashMap<...>,
    next: pointer
}
```

後者は表現力がありますし、正しいモデルになる場面もあります。ただしホットデータ、コールドなメタデータ、ヒープ上の構造が混ざります。ホットパスが座標だけを必要としているなら、文字列やネストしたオブジェクトまで同じ経路で持ち回るのはキャッシュを無駄にします。

## ポインタ追跡

ポインタ追跡は、処理のたびにメモリからアドレスを読み、その先へジャンプして続けるパターンです。木、連結リスト、ハッシュマップ、boxed object、オブジェクトグラフはこのパターンを作りやすいです。

KdTree は分かりやすい例です。アルゴリズムとしては探索範囲を枝刈りできるので強力です。キャッシュ済みの都市タイルインデックスに対して単発の GPS ping を処理する場合、すべての候補を調べずに関連する領域へ降りていけます。HL-Optimizer では、これが 1 query の cached path で大きな差になりました。

ただしポインタ追跡にはコストがあります。ワークロードがより大きな地域を対象にした大規模バッチになると、flat-grid は追いつきやすくなります。賢い探索を減らし、予測しやすい走査を増やすからです。ベンチマークでもリンク数が増えるほど Rust の優位は縮まり、Numba の flat-grid 表現はリンクあたりのメモリ使用量も小さくなりました。

教訓は「木が悪い」でも「配列が常に正しい」でもありません。枝刈りで減らせる仕事量がポインタ移動のコストを上回るなら適応的なインデックスが勝ちます。予測可能なメモリアクセスと並列スキャンが支配的なら、フラットな配列が勝ちます。

## HL-Optimizer の結果から見えること

ベンチマークでは、大きく次の 2 つの形を比較しています。

- 長時間稼働のリアルタイムサービス向け: Rust KdTree と PBF ingestion。
- リロードの多いバッチ処理向け: Numba flat-grid と GeoParquet ingestion。

重要なのはこの境界です。

```text
Index cached across calls:
    build cost が償却され、single-query latency が重要なので
    low-level customization が効きやすい。

Index rebuilt per call:
    rebuild cost と memory footprint が支配的になるため、
    flat arrays を使う Python-native pipeline が効きやすい。
```

また、データがロードされた後は PBF と GeoParquet の違いはクエリ速度にほとんど影響しませんでした。PBF か GeoParquet かは ingestion の問題であり、matching speed の問題ではありません。ロード時の関心とホットパスの関心を分けることも、最適化では大事です。

![キャッシュされた長時間稼働インデックスと再構築されるバッチパイプラインを示す図](../../img/blog/cached-vs-rebuilt-index.svg)

## Low-Level Customization が効く場面

Low-level customization は、レイテンシ、メモリ配置、長寿命の状態を細かく制御したいときに価値があります。

向いている例は次の通りです。

- インデックスを一度構築し、何百万回も再利用するリアルタイムサービス。
- 1 query を短時間で返す必要がある低レイテンシのリクエストパス。
- spatial tree、routing index、compact custom cache など、適応的なデータ構造を使うワークロード。
- メモリ所有権、allocation behavior、tail latency の予測可能性が重要なシステム。
- 汎用的なオブジェクトモデルではなく、ホットデータの配置を意図的に設計できるケース。

Rust は Rust だから自動的に速いわけではありません。ホットパスを小さくできるときに速くなります。少ない allocation、タイトな struct、明示的な lifetime、クエリパターンに合わせたデータ構造が効くからです。

map matching の場合、起動時に地域データをロードし、KdTree を warm に保ち、到着する ping を個別に処理するサービスなら Rust は自然な選択になります。木の構築コストは起動時に消え、query ごとの traversal は小さく保てます。

## Numba が効く場面

Numba は、アルゴリズムを NumPy 風の配列に対する数値ループとして書けると強いです。

向いている例は次の通りです。

- 多数の行や多数の query を処理するバッチ。
- primitive numeric arrays 上で書ける geometry、simulation、scoring、matching、distance calculation。
- Python object iteration がボトルネックだが、別の low-level service を作るほど複雑ではない処理。
- 各 record を独立して処理できる parallel loop。

実用上のルールは単純です。ホットパスを数値配列に変えられるなら、Numba は Python のワークフローを保ったまま多くのオーバーヘッドを外せます。

flat-grid の空間インデックスが有効なのはまさにこの領域です。uniform grid は KdTree より適応的ではないかもしれませんが、コンパクトな配列で表現でき、安く再構築できます。道路リンクを読み込み、数十万の GPS 点を処理して終了する nightly job なら、多くの場合こちらが正しいトレードオフです。

## Polars が効く場面

Polars は、最適化対象が主に表形式の処理であるときに効きます。filter、join、group、sort、aggregate、projection、そしてパイプラインに流すデータ量の削減です。

向いている例は次の通りです。

- 数値ホットパスの前後にある ETL。
- record 全体ではなく必要な列だけをロードする処理。
- Parquet や GeoParquet からの predicate pushdown。
- trip ごとの group 処理、time-window filtering、deduplication、feature construction。
- wide dataframe や不要な intermediate copy がメモリ圧迫を作っているパイプライン。

Polars が有効なのは、列指向で考えることを促すからです。columnar execution は局所性の勝ちです。混ざったフィールドを持つ row object を歩くのではなく、同じ型の dense buffer に対して処理できます。

空間ワークロードでは、Polars が最近傍計算そのものを置き換えるとは限りません。それでも、その計算に届くデータを減らし、周辺のパイプラインを列指向に保つことで、性能の大きな部分を支えられます。

## 最適化前に確認すること

速いツールを選ぶ前に、まず次を確認します。

1. ホットパスは compute-bound か memory-bound か。
2. データは連続して置かれているか、それとも object graph を歩いているか。
3. キャッシュできるインデックスを毎回再構築していないか。
4. ホットパスが使わない列や record をロードしていないか。
5. 必要なのは single-query latency か bulk throughput か。
6. アルゴリズムを array operations として表現できるか。
7. データ構造の枝刈りは、その複雑さに見合うだけの仕事を減らしているか。

この問いを見れば、ツール選択はかなり自然に絞られます。

## 実用的な分け方

サービスが長時間稼働し、インデックスを再利用し、レイテンシが重要なら low-level customization を使います。Rust のような systems language は、リクエストパスに合わせてデータ構造を設計し、allocation と memory layout を制御できます。

高コストな部分が連続配列上の数値ループなら Numba を使います。インデックスの再構築が安く、Python-native なワークフローを保ちたいバッチ処理では特に有効です。

周辺のデータ移動がボトルネックなら Polars を使います。ポインタの多いコードを自動的に局所的にするわけではありませんが、そもそもその問題を作らないようにパイプラインを組めます。

最適化の中心は、最強のツールを選ぶことではありません。CPU から何が見えているかを理解することです。近くにあるデータ、予測可能なループ、少ない allocation、少ない pointer chasing。その理解ができると、Rust、Numba、Polars それぞれの使いどころは自然に見えてきます。
