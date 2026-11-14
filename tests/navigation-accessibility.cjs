// Run: NODE_PATH=<directory containing playwright> node --test tests/navigation-accessibility.cjs
// Serve the repository at BASE_URL (default http://127.0.0.1:8765).
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:8765';

for (const [source, destination] of [['index.html', 'index_ja.html']]) {
  test(`${source}: language navigation works without JavaScript interception`, async () => {
    const browser = await chromium.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      await page.route('**/*', route => route.request().url().startsWith(base) ? route.continue() : route.abort());
      await page.goto(`${base}/${source}`);
      await page.waitForFunction(() => !!window.portfolioInstance);
      const link = page.locator(`.nav-link[href^="${destination}"]`);
      await link.click();
      await page.waitForURL(`**/${destination}*`, { timeout: 3000 });
      assert.equal(new URL(page.url()).pathname, `/${destination}`);
    } finally {
      await browser.close();
    }
  });
}

for (const viewport of [{ width: 1280, height: 900 }, { width: 375, height: 812 }]) {
  test(`project evidence is visible when reached by keyboard at ${viewport.width}px`, async () => {
    const browser = await chromium.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport });
      await page.route('**/*', route => route.request().url().startsWith(base) ? route.continue() : route.abort());
      await page.goto(`${base}/index.html`);
      await page.waitForFunction(() => !!window.portfolioInstance);
      await page.mouse.move(0, 0);
      const link = page.locator('.project-link').first();
      await link.focus();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      assert.equal(await link.evaluate(el => el === document.activeElement), true);
      await page.waitForFunction(() => Number(getComputedStyle(document.activeElement.closest('.project-overlay')).opacity) === 1, null, { timeout: 2000 });
      assert.notEqual(await link.evaluate(el => getComputedStyle(el).outlineStyle), 'none');
    } finally {
      await browser.close();
    }
  });
}
