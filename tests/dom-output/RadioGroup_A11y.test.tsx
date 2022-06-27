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
} from './testUtils';

import { Rating } from '../../src/Rating';

beforeEach();
afterEach();

/* A11y - Parent */

test('Should have all default aria-attributes', () => {
  render(<Rating value={2} onChange={() => {}} />);
  const item = screen.queryByTestId(ID);
  expect(item).toHaveAccessibleName('Rating');
  expect(item).toHaveAttribute('role', 'radiogroup');
  expect(item).toHaveAttribute('aria-required', 'true');
  expect(item).toHaveAttribute('aria-invalid', 'false');
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

test('Should not have aria-label attribute if aria-labelledby has been set', () => {
  render(<Rating value={3} limit={3} onChange={() => {}} labelledBy="any_dom_id" />);
  const item = screen.queryByTestId(ID);
  expect(item).toHaveAttribute('aria-labelledby', 'any_dom_id');
  expect(item).not.toHaveAttribute('aria-label');
});

/* A11y - Child */

test('Each child should have accessible attributes', () => {
  render(<Rating value={2} limit={3} onChange={() => {}} />);

  const expectAccessibleAttributes = (child: HTMLElement) => {
    expect(child).toHaveAttribute('tabindex');
    expect(child).toHaveAttribute('aria-labelledby');
    expect(child).toHaveAttribute('role', 'radio');
  };

  const child1 = screen.getByTestId(CHILD_ID_1);
  expectAccessibleAttributes(child1);

  const child2 = screen.getByTestId(CHILD_ID_2);
  expectAccessibleAttributes(child2);

  const child3 = screen.getByTestId(CHILD_ID_3);
  expectAccessibleAttributes(child3);
});

test('Only the selected child should be checked', () => {
  render(<Rating value={2} limit={3} onChange={() => {}} />);

  const child1 = screen.getByTestId(CHILD_ID_1);
  expect(child1).not.toBeChecked();

  const child2 = screen.getByTestId(CHILD_ID_2);
  expect(child2).toBeChecked();

  const child3 = screen.getByTestId(CHILD_ID_3);
  expect(child3).not.toBeChecked();
});

test('Only the selected child should be focusable on initial render', () => {
  render(<Rating value={2} limit={3} onChange={() => {}} />);

  const child1 = screen.getByTestId(CHILD_ID_1);
  expect(child1).toHaveAttribute('tabindex', '-1');

  const child2 = screen.getByTestId(CHILD_ID_2);
  expect(child2).toHaveAttribute('tabindex', '0');

  const child3 = screen.getByTestId(CHILD_ID_3);
  expect(child3).toHaveAttribute('tabindex', '-1');
});

test('If keyboard is disabled should not be focusable via tabindex', () => {
  render(<Rating value={2} limit={3} onChange={() => {}} enableKeyboard={false} />);

  const child1 = screen.getByTestId(CHILD_ID_1);
  expect(child1).not.toHaveAttribute('tabindex');

  const child2 = screen.getByTestId(CHILD_ID_2);
  expect(child2).not.toHaveAttribute('tabindex');

  const child3 = screen.getByTestId(CHILD_ID_3);
  expect(child3).not.toHaveAttribute('tabindex');
});

test('If keyboard is disabled should have aria-checked in any case', () => {
  render(<Rating value={2} limit={3} onChange={() => {}} enableKeyboard={false} />);

  const child1 = screen.getByTestId(CHILD_ID_1);
  expect(child1).not.toBeChecked();

  const child2 = screen.getByTestId(CHILD_ID_2);
  expect(child2).toBeChecked();

  const child3 = screen.getByTestId(CHILD_ID_3);
  expect(child3).not.toBeChecked();
});
