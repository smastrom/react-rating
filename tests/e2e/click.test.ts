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

test('By clicking on an item, the target should be the only checked and focusable element', async ({
  page,
}) => {
  for await (const childName of childTestIds) {
    await page.locator(childName).click();
    await expectToBeTheOnlyChecked(page, childName);
    await expectToBeTheOnlyFocusable(page, childName);
  }
});

test('By clicking on an item, and then clicking again on it the target should checked / unchecked', async ({
  page,
}) => {
  for await (const childName of childTestIds) {
    await page.locator(childName).click();
    await expectToBeTheOnlyChecked(page, childName);

    await page.locator(childName).click();
    await expectNoneToBeChecked(page);

    await page.locator(childName).click();
    await expectToBeTheOnlyChecked(page, childName);

    await page.locator(childName).click();
    await expectNoneToBeChecked(page);
  }
});
