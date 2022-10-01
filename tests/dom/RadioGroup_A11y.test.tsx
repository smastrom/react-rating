import React from 'react';
import {
	render,
	screen,
	beforeEach,
	afterEach,
	ID,
	CHILD_ID_1,
	CHILD_ID_2,
	CHILD_ID_3,
	childArr,
} from './testUtils';
import { Rating } from '../../src/Rating';

beforeEach();
afterEach();

describe('Accessibility DOM Output Test - Parent', () => {
	test('Should have all default aria-attributes and if switching to read-only should not have such attrs anymore', () => {
		const { rerender } = render(<Rating value={2} onChange={() => {}} />);
		const item = screen.queryByTestId(ID);
		expect(item).toHaveAccessibleName('Rating');
		expect(item).toHaveAttribute('role', 'radiogroup');
		expect(item).toHaveAttribute('aria-required', 'true');
		expect(item).toHaveAttribute('aria-invalid', 'false');
		expect(item).not.toHaveAttribute('aria-labelledby');

		rerender(<Rating readOnly value={2} />);

		expect(item).toHaveAttribute('role', 'img');
		expect(item).toHaveAccessibleName('Rated 2 on 5');

		expect(item).not.toHaveAccessibleName('Rating');
		expect(item).not.toHaveAttribute('role', 'radiogroup');
		expect(item).not.toHaveAttribute('aria-required', 'true');
		expect(item).not.toHaveAttribute('aria-invalid', 'false');
		expect(item).not.toHaveAttribute('aria-labelledby');
	});

	test('Should not have aria-invalid attribute if isRequired equals to false', () => {
		render(<Rating value={3} onChange={() => {}} isRequired={false} />);
		const item = screen.queryByTestId(ID);
		expect(item).toHaveAttribute('aria-required', 'false');
		expect(item).not.toHaveAttribute('aria-invalid');
	});

	test('Should be invalid if no value is set and isRequired equals to true (default)', () => {
		const { rerender } = render(<Rating value={0} onChange={() => {}} />);
		const item = screen.queryByTestId(ID);
		expect(item).toBeInvalid();
		expect(item).toHaveAttribute('aria-invalid', 'true');

		rerender(<Rating value={1} onChange={() => {}} />);
		expect(item).toBeValid();
		expect(item).toHaveAttribute('aria-invalid', 'false');
	});

	test('If both invisible label and visible label ids are set, visible labels should take precedence', () => {
		render(
			<>
				<h2 id="id_1">Hello</h2>
				<Rating
					value={3}
					items={3}
					onChange={() => {}}
					invisibleLabel="Ciao"
					visibleLabelId="id_1"
				/>
			</>
		);
		const item = screen.queryByTestId(ID);
		expect(item).toHaveAccessibleName('Hello');
		expect(item).not.toHaveAttribute('aria-label', 'Ciao');
	});
});

/* A11y - Child */
describe('Accessibility DOM Output Test - Child', () => {
	test('Each child should have default accessible attributes', () => {
		render(<Rating value={2} items={3} onChange={() => {}} />);

		const expectAccessibleAttributes = (child: HTMLElement) => {
			expect(child).toHaveAttribute('tabindex');
			expect(child).toHaveAttribute('aria-label');
			expect(child).toHaveAttribute('role', 'radio');
		};

		[CHILD_ID_1, CHILD_ID_2, CHILD_ID_3].forEach((testId) => {
			const child = screen.getByTestId(testId);
			expectAccessibleAttributes(child);
		});
	});

	test('If both invisible label and visible label ids are set, visible labels should take precedence', () => {
		render(
			<>
				<div id="id_a">Ciao1</div>
				<div id="id_b">Ciao2</div>
				<div id="id_c">Ciao3</div>
				<Rating
					value={2}
					items={3}
					onChange={() => {}}
					invisibleItemLabels={['a', 'b', 'c']}
					visibleItemLabelIds={['id_a', 'id_b', 'id_c']}
				/>
			</>
		);

		const child1 = screen.getByTestId(CHILD_ID_1);
		expect(child1).toHaveAccessibleName('Ciao1');
		expect(child1).not.toHaveAttribute('aria-label', 'a');

		const child2 = screen.getByTestId(CHILD_ID_2);
		expect(child2).toHaveAccessibleName('Ciao2');
		expect(child2).not.toHaveAttribute('aria-label', 'b');

		const child3 = screen.getByTestId(CHILD_ID_3);
		expect(child3).toHaveAccessibleName('Ciao3');
		expect(child3).not.toHaveAttribute('aria-label', 'b');
	});

	test('Only the selected child should be checked', () => {
		render(<Rating value={2} items={3} onChange={() => {}} />);

		const child1 = screen.getByTestId(CHILD_ID_1);
		expect(child1).not.toBeChecked();

		const child2 = screen.getByTestId(CHILD_ID_2);
		expect(child2).toBeChecked();

		const child3 = screen.getByTestId(CHILD_ID_3);
		expect(child3).not.toBeChecked();
	});

	test('Only the selected child should be focusable on initial render', () => {
		render(<Rating value={2} items={3} onChange={() => {}} />);

		const child1 = screen.getByTestId(CHILD_ID_1);
		expect(child1).toHaveAttribute('tabindex', '-1');

		const child2 = screen.getByTestId(CHILD_ID_2);
		expect(child2).toHaveAttribute('tabindex', '0');

		const child3 = screen.getByTestId(CHILD_ID_3);
		expect(child3).toHaveAttribute('tabindex', '-1');
	});

	/* New in v1.1.0 */
	test('If isDisabled, rating should never be required', async () => {
		const { rerender } = render(
			<Rating isRequired isDisabled value={3} onChange={() => {}} />
		);

		const item = screen.queryByTestId(ID);
		expect(item).not.toBeRequired();

		rerender(<Rating isDisabled value={3} onChange={() => {}} />);

		expect(item).not.toBeRequired();
	});

	test('If isDisabled, all radios should be disabled', async () => {
		render(<Rating isDisabled value={3} onChange={() => {}} />);

		/* Can't be tested with toBeDisabled() https://github.com/testing-library/jest-dom/issues/144 */

		childArr.forEach((testID) => {
			const item = screen.queryByTestId(testID);
			expect(item).toHaveAttribute('aria-disabled', 'true');
		});
	});

	test('If isDisabled, all radios should not have focus', async () => {
		render(<Rating isDisabled value={3} onChange={() => {}} />);

		childArr.forEach((testID) => {
			const item = screen.queryByTestId(testID);
			expect(item).not.toHaveFocus();
		});
	});

	test('If isDisabled, current rating should always be set', async () => {
		render(<Rating isDisabled value={3} onChange={() => {}} />);

		const item = screen.queryByTestId(CHILD_ID_3);
		expect(item).toBeChecked();
	});
});
