import { expect } from '@playwright/experimental-ct-react';
import { Locator, Page } from '@playwright/test';

/** Copy-pasting it as it is not exported by playwright */
export interface MountResult extends Locator {
	unmount(): Promise<void>;
	rerender(component: JSX.Element): Promise<void>;
}

export const groupTestId = 'rating';
export const firstButtonId = 'id=first_button';
export const secondButtonId = 'id=second_button';
export const resetTestId = 'data-testid=rating-reset';

export const childTestIds = [
	'data-testid=rating-child-1',
	'data-testid=rating-child-2',
	'data-testid=rating-child-3',
	'data-testid=rating-child-4',
	'data-testid=rating-child-5',
];

export function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

export async function pressTab(page: Page, browserName: string) {
	if (browserName === 'webkit') {
		await page.keyboard.press('Alt+Tab');
	} else {
		await page.keyboard.press('Tab');
	}
}

export async function pressShiftTab(page: Page, browserName: string) {
	if (browserName === 'webkit') {
		await page.keyboard.press('Alt+Shift+Tab');
	} else {
		await page.keyboard.press('Shift+Tab');
	}
}

export async function expectToBeTheOnlyFocusable(result: MountResult, locatorId: string) {
	await expect(result.locator(locatorId)).toHaveAttribute('tabindex', '0');

	const notFocusedChild = childTestIds.filter((childName) => childName !== locatorId);
	for await (const childName of notFocusedChild) {
		await expect(result.locator(childName)).toHaveAttribute('tabindex', '-1');
	}
}

export async function expectToBeTheOnlyChecked(result: MountResult, locatorId: string) {
	await expect(result.locator(locatorId)).toBeChecked();

	const notFocusedChild = childTestIds.filter((childName) => childName !== locatorId);
	for await (const childName of notFocusedChild) {
		await expect(result.locator(childName)).not.toBeChecked();
	}
}

export async function expectNoneToBeChecked(result: MountResult) {
	for await (const childName of childTestIds) {
		await expect(result.locator(childName)).not.toBeChecked();
	}
}

export async function tabNavigateToRating(page: Page, browserName: string) {
	await pressTab(page, browserName);
	await pressTab(page, browserName);
}
