// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { describe, test } from 'vitest';
import {
	arrayColorStyles,
	render,
	screen,
	GROUP_ID,
	itemStyles,
	CHILD_ID_1,
	CHILD_ID_2,
	CHILD_ID_3,
	CHILD_ID_4,
	CHILD_ID_5,
	childArr,
} from './testUtils';
import { Rating } from '../../src/Rating';
import {
	ActiveVars,
	GapClasses,
	OrientationClasses,
	PaddingClasses,
	RadiusClasses,
	TransitionClasses,
} from '../../src/constants';

describe('Radio Group - Classes and variables', () => {
	describe('Parent', () => {
		test('Should have default classNames applied', () => {
			const defaultClasses =
				'rr--group rr--dir-x rr--fx-colors rr--pointer rr--has-stroke rr--space-sm';

			render(<Rating value={2} items={3} onChange={() => null} />);

			const group = screen.queryByTestId(GROUP_ID);
			expect(group).toHaveClass(defaultClasses, { exact: true });
		});

		test('Should not have classNames if styling props are disabled', () => {
			const defaultClasses = 'rr--group rr--dir-x rr--pointer rr--has-stroke';

			render(
				<Rating
					value={2}
					items={3}
					onChange={() => null}
					transition="none"
					spaceBetween="none"
					spaceInside="none"
					radius="none"
				/>
			);

			const group = screen.queryByTestId(GROUP_ID);
			expect(group).toHaveClass(defaultClasses, { exact: true });
		});

		test("Shouldn't have stroke or border classNames and no CSS inline vars if not included in itemStyles", () => {
			const defaultClasses = 'rr--group rr--dir-x rr--pointer';

			render(
				<Rating
					value={2}
					items={3}
					itemStyles={itemStyles}
					onChange={() => null}
					transition="none"
					spaceBetween="none"
					spaceInside="none"
				/>
			);

			const group = screen.queryByTestId(GROUP_ID);
			expect(group).toHaveClass(defaultClasses, { exact: true });
			expect(group).not.toHaveAttribute('style');
		});

		test('Should have stroke and border classNames if set in itemStyles', () => {
			const classNames = 'rr--group rr--dir-x rr--pointer rr--has-stroke rr--has-border';

			render(
				<Rating
					value={2}
					items={3}
					itemStyles={{ ...itemStyles, boxBorderWidth: 20, itemStrokeWidth: 20 }}
					onChange={() => null}
					transition="none"
					spaceBetween="none"
					spaceInside="none"
				/>
			);

			const group = screen.queryByTestId(GROUP_ID);
			expect(group).toHaveClass(classNames, { exact: true });
		});

		test('Should have no gap nor padding classNames if spaceInside is set to none (default: small)', () => {
			const classNames = 'rr--group rr--dir-x rr--pointer rr--has-stroke';

			render(
				<Rating
					value={2}
					items={3}
					onChange={() => null}
					transition="none"
					spaceInside="none"
				/>
			);
			const group = screen.queryByTestId(GROUP_ID);
			expect(group).toHaveClass(classNames, { exact: true });
		});

		test('Should have default padding className if spaceInside is set to none', () => {
			const classNames = 'rr--group rr--dir-x rr--pointer rr--has-stroke rr--space-sm';

			render(
				<Rating
					value={2}
					items={3}
					onChange={() => null}
					transition="none"
					spaceBetween="none"
				/>
			);
			const group = screen.queryByTestId(GROUP_ID);
			expect(group).toHaveClass(classNames, { exact: true });
		});

		/* New in v1.1.0 */
		test('If isDisabled, should have proper cursor classNames', async () => {
			render(<Rating isDisabled value={3} onChange={() => null} />);

			const group = screen.queryByTestId(GROUP_ID);
			expect(group).toHaveClass('rr--disabled');
			expect(group).not.toHaveClass('rr-cursor');
		});
	});

	describe('Children', () => {
		const toHaveActiveClassName = (childId: string) => {
			const child = screen.getByTestId(childId);
			expect(child).toHaveClass('rr--box rr--on', { exact: true });
		};

		const toHaveInactiveClassName = (childId: string) => {
			const child = screen.getByTestId(childId);
			expect(child).toHaveClass('rr--box rr--off', { exact: true });
		};

		test('Any className from props is added correctly', () => {
			render(
				<Rating
					value={1}
					items={5}
					onChange={() => null}
					itemStyles={arrayColorStyles}
					spaceBetween="medium"
					spaceInside="large"
					radius="full"
					orientation="vertical"
					transition="opacity"
				/>
			);

			const group = screen.queryByTestId(GROUP_ID);
			expect(group).toHaveClass(
				GapClasses.MEDIUM,
				PaddingClasses.LARGE,
				RadiusClasses.FULL,
				OrientationClasses.VERTICAL,
				TransitionClasses.OPACITY
			);
		});

		test('If ratingValue equals to n, first n child should have correspondent active className', () => {
			render(<Rating value={3} items={6} onChange={() => null} />);

			toHaveActiveClassName(CHILD_ID_1);
			toHaveActiveClassName(CHILD_ID_2);
			toHaveActiveClassName(CHILD_ID_3);

			toHaveInactiveClassName(CHILD_ID_4);
			toHaveInactiveClassName(CHILD_ID_5);
		});

		test('If ratingValue equals to n, only n child should have correspondent active className if highlightOnlySelected is enabled', () => {
			render(<Rating value={3} items={6} onChange={() => null} highlightOnlySelected />);
			toHaveInactiveClassName(CHILD_ID_1);
			toHaveInactiveClassName(CHILD_ID_2);

			toHaveActiveClassName(CHILD_ID_3);

			toHaveInactiveClassName(CHILD_ID_4);
			toHaveInactiveClassName(CHILD_ID_5);
		});

		test('If ratingValue equals to 0, no child should have active className, whether highlightOnlySelected is enabled or not', () => {
			const { rerender } = render(<Rating value={0} items={6} onChange={() => null} />);

			childArr.forEach((testId) => {
				toHaveInactiveClassName(testId);
			});

			rerender(
				<Rating value={0} items={6} onChange={() => null} highlightOnlySelected />
			);

			childArr.forEach((testId) => {
				toHaveInactiveClassName(testId);
			});
		});

		test('If providing array colors, variables should be added correctly to current and prev items', () => {
			const { rerender } = render(
				<Rating
					value={1}
					items={5}
					onChange={() => null}
					itemStyles={arrayColorStyles}
				/>
			);

			const prevChild: HTMLElement[] = [];

			childArr.forEach((childTestId, index) => {
				rerender(
					<Rating
						value={index + 1}
						items={5}
						onChange={() => null}
						itemStyles={arrayColorStyles}
					/>
				);
				const child = screen.queryByTestId(childTestId);
				[...prevChild, child].forEach((prevTestId) => {
					expect(prevTestId).toHaveStyle({
						[ActiveVars.FILL]: (arrayColorStyles.activeFillColor as string[])[
							index
						],
						[ActiveVars.BOX]: (arrayColorStyles.activeBoxColor as string[])[index],
						[ActiveVars.STROKE]: (arrayColorStyles.activeStrokeColor as string[])[
							index
						],
						[ActiveVars.BORDER]: (
							arrayColorStyles.activeBoxBorderColor as string[]
						)[index],
					});
				});

				prevChild.push(child as HTMLElement);
			});
		});
	});
});
