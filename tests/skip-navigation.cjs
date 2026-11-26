const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:8765';

// One behavior: keyboard users can bypass the navigation to the About content.
for (const source of ['index.html', 'index_ja.html']) {
for (const width of [375, 1280]) {
for (const javaScriptEnabled of [true, false]) {
test(`${source} at ${width}px (JS ${javaScriptEnabled}): skip link transfers keyboard focus to content`, async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width, height: 812 }, javaScriptEnabled });
    await page.route('**/*', route => route.request().url().startsWith(base) ? route.continue() : route.abort());
    await page.goto(`${base}/${source}`);
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').getAttribute('class'), 'skip-link');
    const link = page.locator('.skip-link');
    const box = await link.boundingBox();
    assert.ok(box.y >= 0 && box.y + box.height <= 812, 'focused skip link is on screen');
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.activeElement.id === 'about', null, { timeout: 2000 });
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').evaluate(el => !!(document.querySelector('#about').compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING)), true);
  } finally {
    await browser.close();
  }
});
}
}
}
