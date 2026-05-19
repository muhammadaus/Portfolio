// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

/**
 * Visual Regression Tests for Portfolio Website
 *
 * These tests capture and compare screenshots of key pages and sections
 * to detect unintended visual changes during development.
 */

// Helper function to get file path for HTML pages
const getFilePath = (filename) => {
  return 'file://' + path.resolve(__dirname, '..', filename);
};

// Viewport sizes for responsive testing
const viewports = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
};

test.describe('English Portfolio Page (index.html)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(getFilePath('index.html'));
    // Wait for fonts and images to load
    await page.waitForLoadState('networkidle');
    // Wait for any animations to complete
    await page.waitForTimeout(500);
  });

  test('full page screenshot - desktop viewport', async ({ page }) => {
    await page.setViewportSize(viewports.desktop);
    await expect(page).toHaveScreenshot('index-full-page-desktop.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('full page screenshot - tablet viewport', async ({ page }) => {
    await page.setViewportSize(viewports.tablet);
    await expect(page).toHaveScreenshot('index-full-page-tablet.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('full page screenshot - mobile viewport', async ({ page }) => {
    await page.setViewportSize(viewports.mobile);
    await expect(page).toHaveScreenshot('index-full-page-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('header section visual regression', async ({ page }) => {
    const header = page.locator('header.header');
    await expect(header).toHaveScreenshot('index-header.png', {
      animations: 'disabled',
    });
  });

  test('about section visual regression', async ({ page }) => {
    const about = page.locator('#about');
    await about.scrollIntoViewIfNeeded();
    await expect(about).toHaveScreenshot('index-about-section.png', {
      animations: 'disabled',
    });
  });

  test('projects section visual regression', async ({ page }) => {
    const projects = page.locator('#projects');
    await projects.scrollIntoViewIfNeeded();
    await expect(projects).toHaveScreenshot('index-projects-section.png', {
      animations: 'disabled',
    });
  });

  test('experience section visual regression', async ({ page }) => {
    const experience = page.locator('#experience');
    await experience.scrollIntoViewIfNeeded();
    await expect(experience).toHaveScreenshot('index-experience-section.png', {
      animations: 'disabled',
    });
  });

  test('skills section visual regression', async ({ page }) => {
    const skills = page.locator('#skills');
    await skills.scrollIntoViewIfNeeded();
    await expect(skills).toHaveScreenshot('index-skills-section.png', {
      animations: 'disabled',
    });
  });

  test('contact section visual regression', async ({ page }) => {
    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();
    await expect(contact).toHaveScreenshot('index-contact-section.png', {
      animations: 'disabled',
    });
  });

  test('navigation bar visual regression', async ({ page }) => {
    const navbar = page.locator('#navbar');
    await expect(navbar).toHaveScreenshot('index-navbar.png', {
      animations: 'disabled',
    });
  });

  test('footer visual regression', async ({ page }) => {
    const footer = page.locator('footer.footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toHaveScreenshot('index-footer.png', {
      animations: 'disabled',
    });
  });
});

test.describe('Japanese Portfolio Page (index_ja.html)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(getFilePath('index_ja.html'));
    // Wait for fonts and images to load
    await page.waitForLoadState('networkidle');
    // Wait for any animations to complete
    await page.waitForTimeout(500);
  });

  test('full page screenshot - desktop viewport', async ({ page }) => {
    await page.setViewportSize(viewports.desktop);
    await expect(page).toHaveScreenshot('index-ja-full-page-desktop.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('full page screenshot - mobile viewport', async ({ page }) => {
    await page.setViewportSize(viewports.mobile);
    await expect(page).toHaveScreenshot('index-ja-full-page-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('header section visual regression', async ({ page }) => {
    const header = page.locator('header.header');
    await expect(header).toHaveScreenshot('index-ja-header.png', {
      animations: 'disabled',
    });
  });

  test('about section visual regression', async ({ page }) => {
    const about = page.locator('#about');
    await about.scrollIntoViewIfNeeded();
    await expect(about).toHaveScreenshot('index-ja-about-section.png', {
      animations: 'disabled',
    });
  });

  test('projects section visual regression', async ({ page }) => {
    const projects = page.locator('#projects');
    await projects.scrollIntoViewIfNeeded();
    await expect(projects).toHaveScreenshot('index-ja-projects-section.png', {
      animations: 'disabled',
    });
  });

  test('experience section visual regression', async ({ page }) => {
    const experience = page.locator('#experience');
    await experience.scrollIntoViewIfNeeded();
    await expect(experience).toHaveScreenshot('index-ja-experience-section.png', {
      animations: 'disabled',
    });
  });

  test('skills section visual regression', async ({ page }) => {
    const skills = page.locator('#skills');
    await skills.scrollIntoViewIfNeeded();
    await expect(skills).toHaveScreenshot('index-ja-skills-section.png', {
      animations: 'disabled',
    });
  });

  test('contact section visual regression', async ({ page }) => {
    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();
    await expect(contact).toHaveScreenshot('index-ja-contact-section.png', {
      animations: 'disabled',
    });
  });

  test('navigation bar visual regression', async ({ page }) => {
    const navbar = page.locator('#navbar');
    await expect(navbar).toHaveScreenshot('index-ja-navbar.png', {
      animations: 'disabled',
    });
  });

  test('footer visual regression', async ({ page }) => {
    const footer = page.locator('footer.footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toHaveScreenshot('index-ja-footer.png', {
      animations: 'disabled',
    });
  });
});

test.describe('Interactive Elements Visual Regression', () => {
  test('language toggle button hover state - English page', async ({ page }) => {
    await page.goto(getFilePath('index.html'));
    await page.waitForLoadState('networkidle');

    const langToggle = page.locator('.lang-toggle');
    await langToggle.hover();
    await page.waitForTimeout(300); // Wait for hover transition

    await expect(langToggle).toHaveScreenshot('lang-toggle-hover-en.png', {
      animations: 'disabled',
    });
  });

  test('navigation links visual state', async ({ page }) => {
    await page.goto(getFilePath('index.html'));
    await page.waitForLoadState('networkidle');

    const navLinks = page.locator('#navbar ul');
    await expect(navLinks).toHaveScreenshot('nav-links.png', {
      animations: 'disabled',
    });
  });

  test('project cards visual regression', async ({ page }) => {
    await page.goto(getFilePath('index.html'));
    await page.waitForLoadState('networkidle');

    const projectCards = page.locator('.main-cards');
    await projectCards.scrollIntoViewIfNeeded();
    await expect(projectCards).toHaveScreenshot('project-cards.png', {
      animations: 'disabled',
    });
  });

  test('skill cards visual regression', async ({ page }) => {
    await page.goto(getFilePath('index.html'));
    await page.waitForLoadState('networkidle');

    const skillCards = page.locator('.skill-cards').first();
    await skillCards.scrollIntoViewIfNeeded();
    await expect(skillCards).toHaveScreenshot('skill-cards.png', {
      animations: 'disabled',
    });
  });

  test('experience cards visual regression', async ({ page }) => {
    await page.goto(getFilePath('index.html'));
    await page.waitForLoadState('networkidle');

    const experienceCards = page.locator('.experience-cards');
    await experienceCards.scrollIntoViewIfNeeded();
    await expect(experienceCards).toHaveScreenshot('experience-cards.png', {
      animations: 'disabled',
    });
  });
});

test.describe('Profile Image and Branding Visual Regression', () => {
  test('profile image in header', async ({ page }) => {
    await page.goto(getFilePath('index.html'));
    await page.waitForLoadState('networkidle');

    const profileContainer = page.locator('.header .profile-container').first();
    await expect(profileContainer).toHaveScreenshot('profile-header.png', {
      animations: 'disabled',
    });
  });

  test('profile image in contact section', async ({ page }) => {
    await page.goto(getFilePath('index.html'));
    await page.waitForLoadState('networkidle');

    const contactProfile = page.locator('#contact .profile-container');
    await contactProfile.scrollIntoViewIfNeeded();
    await expect(contactProfile).toHaveScreenshot('profile-contact.png', {
      animations: 'disabled',
    });
  });

  test('social media icons in header', async ({ page }) => {
    await page.goto(getFilePath('index.html'));
    await page.waitForLoadState('networkidle');

    const socialIcons = page.locator('.header .list-items-circle');
    await expect(socialIcons).toHaveScreenshot('social-icons-header.png', {
      animations: 'disabled',
    });
  });
});

test.describe('Responsive Design Visual Regression', () => {
  const responsiveBreakpoints = [
    { name: 'mobile-sm', width: 320, height: 568 },
    { name: 'mobile-lg', width: 414, height: 896 },
    { name: 'tablet-portrait', width: 768, height: 1024 },
    { name: 'tablet-landscape', width: 1024, height: 768 },
    { name: 'laptop', width: 1366, height: 768 },
    { name: 'desktop', width: 1920, height: 1080 },
  ];

  for (const viewport of responsiveBreakpoints) {
    test(`navigation at ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(getFilePath('index.html'));
      await page.waitForLoadState('networkidle');

      const navbar = page.locator('#navbar');
      await expect(navbar).toHaveScreenshot(`navbar-${viewport.name}.png`, {
        animations: 'disabled',
      });
    });
  }
});
