// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { App } from '../../vite/App';
import {
	pressShiftTab,
	pressTab,
	childTestIds,
	firstButtonId,
	secondButtonId,
	MountResult,
	resetTestId,
	getRandomInt,
} from './testUtils';

test.describe('Tab navigation should respect focusable elements order and active rating', () => {
	const ratingItems = 5;
	const ratingValues = Array.from({ length: 5 }, (_, index) => index + 1);

	test('Whether is required or not, it should always focus back/to the active rating radio', async ({
		mount,
		page,
		browserName,
	}) => {
		async function testFocus(component: MountResult) {
			for await (const ratingValue of ratingValues) {
				const currentActive = childTestIds[ratingValue - 1];

				/* If first iteration, navigate to first element (button) */
				if (ratingValue === 1) {
					await pressTab(page, browserName);
				}
				await expect(page.locator(firstButtonId)).toBeFocused();

				/* Navigate to rating */
				await pressTab(page, browserName);
				await expect(component.locator(currentActive)).toBeFocused();

				/* Navigate to last element */
				await pressTab(page, browserName);
				await expect(page.locator(secondButtonId)).toBeFocused();

				/* Navigate back to rating */
				await pressShiftTab(page, browserName);
				await expect(page.locator(currentActive)).toBeFocused();

				/* If not last iteration, set next rating */
				if (ratingValue < ratingItems) {
					await page.keyboard.press('ArrowRight');
					await page.keyboard.press('Space');
				}

				/* Focus back the first element (button) */
				await pressShiftTab(page, browserName);
			}
		}

		const component = await mount(<App initialRating={1} />);
		await testFocus(component);
		await component.unmount();

		const requiredComponent = await mount(<App initialRating={1} isRequired />);
		await testFocus(requiredComponent);
	});

	test('If rating is reset while navigating, should always focus back to reset radio', async ({
		mount,
		page,
		browserName,
	}) => {
		const randomRating = getRandomInt(1, ratingItems);
		const component = await mount(<App initialRating={randomRating} />);

		const expectFirstButtonFocused = () =>
			expect(page.locator(firstButtonId)).toBeFocused();
		const expectSecondButtonFocused = () =>
			expect(page.locator(secondButtonId)).toBeFocused();
		const expectResetFocused = () => expect(component.locator(resetTestId)).toBeFocused();

		/* Focus the first element (button) */
		await pressTab(page, browserName);
		await expectFirstButtonFocused();

		/* Navigate to rating */
		await pressTab(page, browserName);
		await expect(component.locator(childTestIds[randomRating - 1])).toBeFocused();

		/* Get ArrowRight iterarions count to navigate to reset */
		const repeatN = ratingItems - randomRating + 1;

		/* Reset rating */
		for await (const repeat of Array.from({ length: repeatN }, (_, index) => index + 1)) {
			await page.keyboard.press('ArrowRight');

			if (repeat === repeatN) {
				await page.keyboard.press('Space');
			}
		}
		await expectResetFocused();

		/* Navigate to first element (button) */
		await pressShiftTab(page, browserName);
		await expectFirstButtonFocused();

		/* Navigate to rating */
		await pressTab(page, browserName);
		await expectResetFocused();

		/* Navigate to last page element (button) */
		await pressTab(page, browserName);
		await expectSecondButtonFocused();

		/* Navigate back to rating */
		await pressShiftTab(page, browserName);
		await expectResetFocused();
	});
});
