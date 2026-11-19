# Reduced-motion scrolling checks

Use the Playwright installation and local server documented in `navigation-accessibility.md`.
Node.js 20+ is supported. Run both behavioral suites from the repository root:

```sh
BASE_URL=http://127.0.0.1:8765 NODE_PATH="$TMPDIR/portfolio-browser/node_modules" node --test tests/*.cjs
```

`reduced-motion.cjs` checks the modern English page at a mobile viewport:
- Reduced-motion CSS disables native smooth scrolling.
- Section navigation reaches its destination synchronously with reduced motion; normal preferences retain smooth scrolling. Preference changes are read on each invocation.
- The scroll handler clears an existing hero parallax transform with reduced motion, while preserving default parallax. The assertion allows the existing 0.01ms reduced-motion CSS transition to settle.

Tests use real Chromium, site markup, styles and scripts, with external requests blocked. Each regression was observed failing before its implementation. Desktop (1280px) and mobile (375px) screenshots were also inspected with external resources allowed: project heading remains visible below navigation and neither viewport has horizontal overflow.

Scope: modern English page CSS scrolling, navbar/back-to-top section navigation and hero parallax. The separate legacy Japanese template is unchanged. Other JavaScript animations and the independent skill-filter / `PortfolioUtils.scrollTo` smooth-scroll paths remain outside this small batch. This is not a complete WCAG audit or performance benchmark.

Research:
- https://web.dev/articles/prefers-reduced-motion — honor motion preferences in both CSS and JavaScript, particularly large scrolling movement.
- https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html — preserve usable navigation.
- https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html — retain prior keyboard-focus regression coverage.
- https://brittanychiang.com/ and https://leerob.com/ — examples of direct access to experience/projects/writing; no branding copied or popularity ranking implied.
