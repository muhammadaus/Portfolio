// Uses the same server and Playwright setup as navigation-accessibility.cjs.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:8765';

async function withPage(run) {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 375, height: 812 } });
    await page.route('**/*', route => route.request().url().startsWith(base) ? route.continue() : route.abort());
    await page.goto(`${base}/index.html`);
    await page.waitForFunction(() => !!window.portfolioInstance);
    await run(page);
  } finally {
    await browser.close();
  }
}

test('reduced-motion navigation reaches its destination without intermediate scroll frames', () => withPage(async page => {
  for (const preference of ['reduce', 'no-preference', 'reduce']) {
    await page.emulateMedia({ reducedMotion: preference });
    const result = await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      window.portfolioInstance.smoothScrollTo('#projects');
      return { actual: window.scrollY, target: document.querySelector('#projects').offsetTop - 70 };
    });
    if (preference === 'reduce') assert.ok(Math.abs(result.actual - result.target) <= 1, JSON.stringify(result));
    else assert.ok(result.actual < result.target, 'default navigation retains smooth scrolling');
  }
}));

test('enabling reduced motion removes an existing hero parallax offset', () => withPage(async page => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.evaluate(() => {
    window.scrollTo({ top: 200, behavior: 'instant' });
    window.portfolioInstance.handleScroll();
  });
  assert.notEqual(await page.locator('.hero').evaluate(el => getComputedStyle(el).transform), 'none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => window.portfolioInstance.handleScroll());
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.hero')).transform === 'none', null, { timeout: 1000 });
  assert.equal(await page.locator('.hero').evaluate(el => getComputedStyle(el).transform), 'none');
}));

test('reduced motion disables CSS smooth scrolling', () => withPage(async page => {
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
}));
