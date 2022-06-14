import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test.describe('Radio group should be rendered in the DOM and have correct props', () => {
  test('The group should be visible', async ({ page }) => {
    await expect(page.locator('.rar--group')).toBeVisible();
  });
});
