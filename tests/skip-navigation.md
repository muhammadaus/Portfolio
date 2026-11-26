# Skip-navigation regression checks

Serve the repository, then run with Node.js 20+ and an external Playwright installation:

```sh
python3 -m http.server 8767 --bind 127.0.0.1
BASE_URL=http://127.0.0.1:8767 NODE_PATH=<directory>/node_modules node --test tests/*.cjs
```

The eight skip-navigation cases exercise real Chromium at 375px and 1280px on both language entry pages, with JavaScript enabled and disabled. First Tab reveals the bypass link; Enter focuses About; the next Tab moves forward into content rather than returning to navigation. English and Japanese regressions were observed failing before their implementations. The Japanese smooth-scroll handler excludes the bypass link so native fragment navigation retains focus transfer.

About is the deliberate entry point to substantive portfolio content; the introductory blog/hero material is bypassed, not removed. The link is localized and stays out of the normal layout until focused. No resume copy changes or framework dependencies are added.

Manual Chromium checks with external resources allowed confirmed focused link visibility, About positioned approximately 96px below the viewport top, and no English horizontal overflow. Screenshots inspected for English mobile and Japanese desktop. Japanese overflow remains: 553px document width at 375px and 1298px at 1280px; removing the new link, stylesheet and tabindex in the browser produced the same widths. This is a pre-existing layout limitation, not fixed by this batch. This is not a complete WCAG audit.

Research:
- https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html — reduce repeated keyboard navigation to reach substantive content.
- https://brittanychiang.com/ — concrete skip-to-content example; experience/project evidence remains accessible.
- https://leerob.com/ — direct, readable access to professional context and writing; no branding copied or ranking claimed.
- https://web.dev/articles/browser-level-image-lazy-loading — reviewed performance guidance; no speculative image changes included.

Git whitespace validation uses `git -c core.whitespace=cr-at-eol diff --check` because the Japanese template retains its original mixed line endings. The repository's existing GitHub Actions workflow enables npm caching without a lockfile, which blocked PR #15 before tests; remote checks must be reported independently from local browser results.
