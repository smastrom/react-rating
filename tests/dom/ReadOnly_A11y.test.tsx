import React from 'react';
import { describe, test } from 'vitest';
import {
	render,
	screen,
	GROUP_ID,
	CHILD_ID_1,
	CHILD_ID_2,
	CHILD_ID_3,
	CHILD_ID_4,
} from './testUtils';
import { Rating } from '../../src/Rating';

describe('readOnly parent component displays proper a11y attributes', () => {
	function toHaveReadOnlyAttrs(item: HTMLElement | null) {
		expect(item).toBeInTheDocument();
		expect(item).toHaveAttribute('role', 'img');
		expect(item).toHaveAccessibleName('Rated 2 on 5');
		expect(item).toHaveClass('rr--group');
	}

	test('Should have readOnly attributes', () => {
		render(<Rating readOnly value={2} />);
		const group = screen.getByTestId(GROUP_ID);
		toHaveReadOnlyAttrs(group);
	});

	test('Should not be focusable and have radio-group specific attributes and classes', () => {
		render(<Rating readOnly value={2} />);
		const group = screen.getByTestId(GROUP_ID);
		expect(group).not.toHaveFocus();
		expect(group).not.toHaveAttribute('aria-required');
		expect(group).not.toHaveAttribute('aria-invalid');
		expect(group).not.toHaveClass('rr--cursor');
		expect(group).not.toHaveClass('rr--fx-colors');
	});

	/* New in v1.1.0 */
	test('readOnly should always take precedence over isDisabled', async () => {
		render(<Rating readOnly isDisabled value={2} onChange={() => null} />);

		const group = screen.queryByTestId(GROUP_ID);
		toHaveReadOnlyAttrs(group);
	});

	test('User should be able to customize aria-label', () => {
		const CUSTOM_LABEL = 'Rated two';

		render(<Rating readOnly value={2} invisibleLabel={CUSTOM_LABEL} />);
		const group = screen.getByTestId(GROUP_ID);
		expect(group).toHaveAccessibleName(CUSTOM_LABEL);
	});

	test('If a custom visible label id is set, it should take precedence over invisible label', () => {
		const CUSTOM_LABEL = 'Rated two';

		render(<Rating readOnly value={2} invisibleLabel={CUSTOM_LABEL} />);
		const group = screen.getByTestId(GROUP_ID);
		expect(group).toHaveAccessibleName(CUSTOM_LABEL);
	});
});

describe('readOnly child components display proper a11y attributes', () => {
	test('Should contain only n child as per items', () => {
		render(<Rating readOnly value={2} items={3} />);
		const group = screen.getByTestId(GROUP_ID);

		const child1 = screen.getByTestId(CHILD_ID_1);
		expect(group).toContainElement(child1);

		const child2 = screen.getByTestId(CHILD_ID_2);
		expect(group).toContainElement(child2);

		const child3 = screen.getByTestId(CHILD_ID_3);
		expect(group).toContainElement(child3);

		const child4 = screen.queryByTestId(CHILD_ID_4);
		expect(group).not.toContainElement(child4);
	});

	test('No child should contain accessible attributes', () => {
		render(<Rating readOnly value={2} items={3} />);

		const expectToNotHaveAccesibleAttributes = (child: HTMLElement) => {
			expect(child).not.toHaveAttribute('tabindex');
			expect(child).not.toHaveAttribute('aria-labelledby');
			expect(child).not.toHaveAttribute('role', 'radio');
		};

		[CHILD_ID_1, CHILD_ID_2, CHILD_ID_3].forEach((testId) => {
			const child = screen.getByTestId(testId);
			expectToNotHaveAccesibleAttributes(child);
		});
	});
});
