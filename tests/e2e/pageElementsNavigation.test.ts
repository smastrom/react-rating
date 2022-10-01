import { test, expect } from '@playwright/test';
import { beforeAny, pressShiftTab, pressTab } from './testUtils';

test.beforeEach(async ({ page, browserName }) => {
	await beforeAny(page, browserName);
});

test('Tab navigation should respect focusable elements order', async ({
	page,
	browserName,
}) => {
	await pressTab(page, browserName);
	await expect(page.locator('id=first_button')).toBeFocused();

	await pressTab(page, browserName);
	await expect(page.locator('data-testid=rating-child-3')).toBeFocused();

	await pressTab(page, browserName);
	await expect(page.locator('id=second_button')).toBeFocused();

	await pressShiftTab(page, browserName);
	await expect(page.locator('data-testid=rating-child-3')).toBeFocused();

	await pressShiftTab(page, browserName);
	await expect(page.locator('id=first_button')).toBeFocused();
});
