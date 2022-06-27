import React from 'react';

import { render, screen } from '@testing-library/react';
import { beforeEach, afterEach, ID } from './domSetup';
import '@testing-library/jest-dom';

import { Rating } from '../../src/Rating';
import { StrangeFace } from '../../dev/Shapes';

beforeEach();
afterEach();

/* A11y - Parent */

test('Should have all default aria-attributes', () => {
  render(<Rating value={3} onChange={() => {}} />);
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

const CHILD_ID_1 = 'rating-child-1';
const CHILD_ID_2 = 'rating-child-2';
const CHILD_ID_3 = 'rating-child-3';
const CHILD_ID_4 = 'rating-child-4';
const CHILD_ID_5 = 'rating-child-5';

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

/* Styles - Parent */

test('Should have default classNames applied', () => {
  const defaultClasses =
    'rar--group rar--dir-x rar--fx-colors rar--pointer rar--has-stroke rar--gap-sm rar--space-sm';

  render(<Rating value={2} limit={3} onChange={() => {}} />);

  const item = screen.queryByTestId(ID);
  expect(item).toHaveClass(defaultClasses, { exact: true });
});

test('Should not have classNames if styling props are disabled', () => {
  const defaultClasses = 'rar--group rar--dir-x rar--pointer rar--has-stroke';

  render(
    <Rating
      value={2}
      limit={3}
      onChange={() => {}}
      transition="none"
      spaceBetween="none"
      spaceInside="none"
    />
  );

  const item = screen.queryByTestId(ID);
  expect(item).toHaveClass(defaultClasses, { exact: true });
});

const itemStyles = {
  svgChildNodes: StrangeFace,
};

test('Should have no stroke nor border classNames and no CSS inline vars if not included in itemStyles', () => {
  const defaultClasses = 'rar--group rar--dir-x rar--pointer';

  render(
    <Rating
      value={2}
      limit={3}
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
  const classNames = 'rar--group rar--dir-x rar--pointer rar--has-stroke rar--has-border';

  render(
    <Rating
      value={2}
      limit={3}
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

/* Styles - Child */

const toHaveActiveClassName = (childId: string) => {
  const child = screen.getByTestId(childId);
  expect(child).toHaveClass('rar--box rar--on', { exact: true });
};

const toHaveInactiveClassName = (childId: string) => {
  const child = screen.getByTestId(childId);
  expect(child).toHaveClass('rar--box rar--off', { exact: true });
};

test('If ratingValue equals to n, first n child should have correspondent active className', () => {
  render(<Rating value={3} limit={6} onChange={() => {}} />);

  toHaveActiveClassName(CHILD_ID_1);
  toHaveActiveClassName(CHILD_ID_2);
  toHaveActiveClassName(CHILD_ID_3);

  toHaveInactiveClassName(CHILD_ID_4);
  toHaveInactiveClassName(CHILD_ID_5);
});

test('If ratingValue equals to n, only n child should have correspondent active className if highlightOnlySelected is enabled', () => {
  render(<Rating value={3} limit={6} onChange={() => {}} highlightOnlySelected />);
  toHaveInactiveClassName(CHILD_ID_1);
  toHaveInactiveClassName(CHILD_ID_2);

  toHaveActiveClassName(CHILD_ID_3);

  toHaveInactiveClassName(CHILD_ID_4);
  toHaveInactiveClassName(CHILD_ID_5);
});

test('If ratingValue equals to 0, no child should have active className, wheter or not highlightOnlySelected is enabled', () => {
  const { rerender } = render(<Rating value={0} limit={6} onChange={() => {}} />);

  const toNotHaveActiveClassNames = () => {
    toHaveInactiveClassName(CHILD_ID_1);
    toHaveInactiveClassName(CHILD_ID_2);
    toHaveInactiveClassName(CHILD_ID_3);
    toHaveInactiveClassName(CHILD_ID_4);
    toHaveInactiveClassName(CHILD_ID_5);
  };

  toNotHaveActiveClassNames();

  rerender(<Rating value={0} limit={6} onChange={() => {}} highlightOnlySelected />);

  toNotHaveActiveClassNames();
});
