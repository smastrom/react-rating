import { test } from '@playwright/test';
import {
	beforeAny,
	childTestIds,
	expectToBeTheOnlyChecked,
	expectToBeTheOnlyFocusable,
	expectNoneToBeChecked,
} from './testUtils';

test.beforeEach(async ({ page, browserName }) => {
	await beforeAny(page, browserName);
});

test.describe('Click should check/uncheck and focus properly the target.', () => {
	test('By clicking on an item, the target should be the only checked and focusable element', async ({
		page,
	}) => {
		for await (const childName of childTestIds) {
			await page.locator(childName).click();
			await expectToBeTheOnlyChecked(page, childName);
			await expectToBeTheOnlyFocusable(page, childName);
		}
	});

	test('Should check uncheck the target if clicking multiple times on it, (with resetOnSecondClick prop enabled)', async ({
		page,
	}) => {
		for await (const childName of childTestIds) {
			await page.locator(childName).click();
			await expectToBeTheOnlyChecked(page, childName);
			await expectToBeTheOnlyFocusable(page, childName);

			await page.locator(childName).click();
			await expectNoneToBeChecked(page);
			await expectToBeTheOnlyFocusable(page, childTestIds[0]);

			await page.locator(childName).click();
			await expectToBeTheOnlyChecked(page, childName);
			await expectToBeTheOnlyFocusable(page, childName);

			await page.locator(childName).click();
			await expectNoneToBeChecked(page);
			await expectToBeTheOnlyFocusable(page, childTestIds[0]);
		}
	});
});
