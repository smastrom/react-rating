import { test, expect } from '@playwright/test';
import {
	beforeAny,
	expectNoneToBeChecked,
	expectToBeTheOnlyChecked,
	expectToBeTheOnlyFocusable,
	pressShiftTab,
	pressTab,
} from './testUtils';

/** Tests are done with an initial rating value of 3 as set in dev/App.tsx.
 * The number of displayed items equals to 5 (default value).
 */

test.beforeEach(async ({ page, browserName }) => {
	await beforeAny(page, browserName);

	await pressTab(page, browserName);
	await pressTab(page, browserName);

	await expect(page.locator('data-testid=rating-child-3')).toBeFocused();
});

test.describe('Keyboard navigation', () => {
	test('While navigating, only the current focused item should be focusable', async ({
		page,
	}) => {
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await expectToBeTheOnlyFocusable(page, 'data-testid=rating-child-5');

		await page.keyboard.press('ArrowLeft');
		await expectToBeTheOnlyFocusable(page, 'data-testid=rating-child-4');

		await page.keyboard.press('ArrowLeft');
		await page.keyboard.press('ArrowLeft');
		await page.keyboard.press('ArrowRight');
		await expectToBeTheOnlyFocusable(page, 'data-testid=rating-child-3');
	});

	test('Should loop through rating items if navigating beyond the ', async ({ page }) => {
		const toBeFocused = async (locatorId: string) => {
			await expect(page.locator(locatorId)).toBeFocused();
			await expectToBeTheOnlyFocusable(page, locatorId);
		};

		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await toBeFocused('data-testid=rating-child-5');

		await page.keyboard.press('ArrowRight');
		await toBeFocused('data-testid=rating-child-1');

		await page.keyboard.press('ArrowLeft');
		await toBeFocused('data-testid=rating-child-5');
	});

	test('While navigating, the checked value should not change and should always be the only one checked', async ({
		page,
	}) => {
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');

		await expect(page.locator('data-testid=rating-child-2')).toBeFocused();
		await expectToBeTheOnlyChecked(page, 'data-testid=rating-child-3');
	});

	test('The checked value should change only if pressing space, then, if pressing space again on the same item no other value should be checked', async ({
		page,
	}) => {
		await page.keyboard.press('ArrowLeft');
		await page.keyboard.press('ArrowLeft');
		await page.keyboard.press('Space');
		await expectToBeTheOnlyChecked(page, 'data-testid=rating-child-1');

		await page.keyboard.press('Space');
		await expectNoneToBeChecked(page);
	});

	test(`If checking/uncheking multiple items, only the final checked value should be checked`, async ({
		page,
	}) => {
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('Space');
		await expectToBeTheOnlyChecked(page, 'data-testid=rating-child-4');

		await page.keyboard.press('ArrowLeft');
		await page.keyboard.press('Space');

		await page.keyboard.press('ArrowLeft');
		await page.keyboard.press('Space');

		await page.keyboard.press('ArrowLeft');
		await page.keyboard.press('Space');
		await page.keyboard.press('Space');

		await page.keyboard.press('ArrowLeft');
		await page.keyboard.press('Space');

		await expectToBeTheOnlyChecked(page, 'data-testid=rating-child-5');
	});

	test(`After checking a new rating value (5), navigate with tab to next/prev focusable element (button).
  If navigating back/forward to radio-group, we should always land on the rating value just set (5)`, async ({
		page,
		browserName,
	}) => {
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('Space');
		await expectToBeTheOnlyChecked(page, 'data-testid=rating-child-5');

		await pressTab(page, browserName);
		await expect(page.locator('id=second_button')).toBeFocused();
		await expectToBeTheOnlyFocusable(page, 'data-testid=rating-child-5');

		await pressShiftTab(page, browserName);
		await expect(page.locator('data-testid=rating-child-5')).toBeFocused();
		await expectToBeTheOnlyChecked(page, 'data-testid=rating-child-5');

		await pressShiftTab(page, browserName);
		await expect(page.locator('id=first_button')).toBeFocused();
		await expectToBeTheOnlyFocusable(page, 'data-testid=rating-child-5');

		await pressTab(page, browserName);
		await expect(page.locator('data-testid=rating-child-5')).toBeFocused();
		await expectToBeTheOnlyChecked(page, 'data-testid=rating-child-5');
	});

	test(`After unchecking the rating value (3 to 0), navigate with tab to next focusable element (button).
  If navigating back to radio-group, we should always land on the first rating item and not the third (the one we navigated from)`, async ({
		page,
		browserName,
	}) => {
		await page.keyboard.press('Space');
		await expectNoneToBeChecked(page);

		await pressTab(page, browserName);
		await expect(page.locator('id=second_button')).toBeFocused();

		await pressShiftTab(page, browserName);
		await expect(page.locator('data-testid=rating-child-1')).toBeFocused();
	});
});
