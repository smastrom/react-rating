import React from 'react';
import {
	render,
	screen,
	beforeEach,
	afterEach,
	ID,
	itemStyles,
	CHILD_ID_1,
	CHILD_ID_2,
	CHILD_ID_3,
	CHILD_ID_4,
	CHILD_ID_5,
	childArr,
} from './testUtils';
import { Rating } from '../../src/Rating';

beforeEach();
afterEach();

describe('Classnames and inline css vars - RadioGroup element', () => {
	test('Should have default classNames applied', () => {
		const defaultClasses =
			'rr--group rr--dir-x rr--fx-colors rr--pointer rr--has-stroke rr--space-sm';

		render(<Rating value={2} items={3} onChange={() => {}} />);

		const item = screen.queryByTestId(ID);
		expect(item).toHaveClass(defaultClasses, { exact: true });
	});

	test('Should not have classNames if styling props are disabled', () => {
		const defaultClasses = 'rr--group rr--dir-x rr--pointer rr--has-stroke';

		render(
			<Rating
				value={2}
				items={3}
				onChange={() => {}}
				transition="none"
				spaceBetween="none"
				spaceInside="none"
			/>
		);

		const item = screen.queryByTestId(ID);
		expect(item).toHaveClass(defaultClasses, { exact: true });
	});

	test('Should have no stroke nor border classNames and no CSS inline vars if not included in itemStyles', () => {
		const defaultClasses = 'rr--group rr--dir-x rr--pointer';

		render(
			<Rating
				value={2}
				items={3}
				itemStyles={itemStyles}
				onChange={() => {}}
				transition="none"
				spaceBetween="none"
				spaceInside="none"
			/>
		);

		const item = screen.queryByTestId(ID);
		expect(item).toHaveClass(defaultClasses, { exact: true });
		expect(item).not.toHaveAttribute('style');
	});

	test('Should have stroke and border classNames if set in itemStyles', () => {
		const classNames = 'rr--group rr--dir-x rr--pointer rr--has-stroke rr--has-border';

		render(
			<Rating
				value={2}
				items={3}
				itemStyles={{ ...itemStyles, boxBorderWidth: 20, itemStrokeWidth: 20 }}
				onChange={() => {}}
				transition="none"
				spaceBetween="none"
				spaceInside="none"
			/>
		);

		const item = screen.queryByTestId(ID);
		expect(item).toHaveClass(classNames, { exact: true });
	});

	test('Should have no gap nor padding classNames if spaceInside is set to none (default: small)', () => {
		const classNames = 'rr--group rr--dir-x rr--pointer rr--has-stroke';

		render(
			<Rating value={2} items={3} onChange={() => {}} transition="none" spaceInside="none" />
		);
		const item = screen.queryByTestId(ID);
		expect(item).toHaveClass(classNames, { exact: true });
	});

	test('Should have default padding className if spaceInside set to none', () => {
		const classNames = 'rr--group rr--dir-x rr--pointer rr--has-stroke rr--space-sm';

		render(
			<Rating value={2} items={3} onChange={() => {}} transition="none" spaceBetween="none" />
		);
		const item = screen.queryByTestId(ID);
		expect(item).toHaveClass(classNames, { exact: true });
	});

	/* New in v1.1.0 */
	test('If isDisabled, should have proper cursor classNames', async () => {
		render(<Rating isDisabled value={3} onChange={() => {}} />);

		const item = screen.queryByTestId(ID);
		expect(item).toHaveClass('rr--disabled');
		expect(item).not.toHaveClass('rr-cursor');
	});
});

describe('Classnames and inline css vars - Radio elements', () => {
	const toHaveActiveClassName = (childId: string) => {
		const child = screen.getByTestId(childId);
		expect(child).toHaveClass('rr--box rr--on', { exact: true });
	};

	const toHaveInactiveClassName = (childId: string) => {
		const child = screen.getByTestId(childId);
		expect(child).toHaveClass('rr--box rr--off', { exact: true });
	};

	test('If ratingValue equals to n, first n child should have correspondent active className', () => {
		render(<Rating value={3} items={6} onChange={() => {}} />);

		toHaveActiveClassName(CHILD_ID_1);
		toHaveActiveClassName(CHILD_ID_2);
		toHaveActiveClassName(CHILD_ID_3);

		toHaveInactiveClassName(CHILD_ID_4);
		toHaveInactiveClassName(CHILD_ID_5);
	});

	test('If ratingValue equals to n, only n child should have correspondent active className if highlightOnlySelected is enabled', () => {
		render(<Rating value={3} items={6} onChange={() => {}} highlightOnlySelected />);
		toHaveInactiveClassName(CHILD_ID_1);
		toHaveInactiveClassName(CHILD_ID_2);

		toHaveActiveClassName(CHILD_ID_3);

		toHaveInactiveClassName(CHILD_ID_4);
		toHaveInactiveClassName(CHILD_ID_5);
	});

	test('If ratingValue equals to 0, no child should have active className, whether or not highlightOnlySelected is enabled', () => {
		const { rerender } = render(<Rating value={0} items={6} onChange={() => {}} />);

		childArr.forEach((testId) => {
			toHaveInactiveClassName(testId);
		});

		rerender(<Rating value={0} items={6} onChange={() => {}} highlightOnlySelected />);

		childArr.forEach((testId) => {
			toHaveInactiveClassName(testId);
		});
	});
});
