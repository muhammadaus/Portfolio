# Navigation accessibility regression checks

Requires Node.js 22+, Python 3, and Playwright. No screenshot baselines needed.
These behavioral tests are independent of the visual-test proposal in PR #9.

Install the browser tool outside the repository (replace `$TMPDIR` with a scratch directory if unset):

```sh
npm install --prefix "$TMPDIR/portfolio-browser" playwright
"$TMPDIR/portfolio-browser/node_modules/.bin/playwright" install chromium
```

From the repository root, serve the site in one terminal:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

In another terminal, from the repository root:

```sh
NODE_PATH="$TMPDIR/portfolio-browser/node_modules" node --test tests/navigation-accessibility.cjs
```

`BASE_URL` overrides the default local URL. External requests are blocked in tests for deterministic results; local scripts, styles and markup remain real. Checks cover English-to-Japanese navigation and keyboard-reached project link visibility at desktop and mobile widths. The Japanese page uses a separate legacy template and is not covered by the project-overlay checks. These are not a complete accessibility audit or a performance benchmark.
