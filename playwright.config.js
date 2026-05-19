// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Visual regression test configuration for Portfolio website
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry failed tests on CI
  retries: process.env.CI ? 2 : 0,

  // Use 1 worker on CI to ensure consistent screenshots
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: 'html',

  // Shared settings for all projects
  use: {
    // Base URL for the static site
    baseURL: 'file://' + __dirname,

    // Collect trace on first retry
    trace: 'on-first-retry',

    // Screenshot settings for visual comparison
    screenshot: 'only-on-failure',
  },

  // Visual comparison settings
  expect: {
    toHaveScreenshot: {
      // Allow 0.5% pixel difference threshold
      maxDiffPixelRatio: 0.005,
      // Animation settling timeout
      animations: 'disabled',
    },
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile viewports for responsive testing
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Local development server (optional, for serving static files)
  webServer: undefined, // Using file:// protocol directly for static HTML
});
