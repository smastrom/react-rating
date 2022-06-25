import React from 'react';

import { render, screen } from '@testing-library/react';
import { beforeEach, afterEach, ID } from './domSetup';

import { Rating } from '../../src/Rating';
import { StrangeFace } from '../../dev/Shapes';

beforeEach();
afterEach();

/* A11y - Parent */

test('Should have readOnly attributes', () => {
  render(<Rating readOnly value={2} />);
  const item = screen.getByTestId(ID);
  expect(item).toBeInTheDocument();
  expect(item).toHaveAttribute('role', 'img');
  expect(item).toHaveAccessibleName('Rated 2 on 5');
  expect(item).toHaveClass('rar--group');
});

test('Should not be focusable and have radio-group specific attributes and classes', () => {
  render(<Rating readOnly value={2} />);
  const item = screen.getByTestId(ID);
  expect(item).not.toHaveFocus();
  expect(item).not.toHaveAttribute('aria-required');
  expect(item).not.toHaveAttribute('aria-invalid');
  expect(item).not.toHaveClass('rar--cursor');
  expect(item).not.toHaveClass('rar--fx-colors');
});

test('User should be able to customize aria-label', () => {
  const CUSTOM_LABEL = 'Rated two';

  render(<Rating readOnly value={2} accessibleLabel={CUSTOM_LABEL} />);
  const item = screen.getByTestId(ID);
  expect(item).toHaveAccessibleName(CUSTOM_LABEL);
});

const itemStyles = {
  svgChildNodes: StrangeFace,
};

test('If styles are deactivated/unset, no classNames should be added', () => {
  const defaultClasses = 'rar--group rar--dir-x';

  render(
    <Rating
      readOnly
      value={2}
      itemStyles={itemStyles}
      spaceBetween="none"
      spaceInside="none"
    />
  );
  const item = screen.getByTestId(ID);
  expect(item).toHaveClass(defaultClasses, { exact: true });
});

test('If only one color is defined, should have exactly one CSS var defined in style', () => {
  render(
    <Rating
      readOnly
      value={2}
      itemStyles={{ ...itemStyles, activeFillColor: 'red' }}
      spaceBetween="none"
      spaceInside="none"
    />
  );
  const item = screen.getByTestId(ID);
  expect(item).toHaveAttribute('style', '--rar--fill-on-color: red;');
});

test('If no colors are defined, the style attribute should not be defined', () => {
  render(
    <Rating
      readOnly
      value={2}
      itemStyles={itemStyles}
      spaceBetween="none"
      spaceInside="none"
    />
  );
  const item = screen.getByTestId(ID);
  expect(item).not.toHaveAttribute('style');
});

const CHILD_ID_1 = 'rating-child-1';
const CHILD_ID_2 = 'rating-child-2';
const CHILD_ID_3 = 'rating-child-3';
const CHILD_ID_4 = 'rating-child-4';

test('Should contain only n child as per limit', () => {
  render(<Rating readOnly value={2} limit={3} />);
  const item = screen.getByTestId(ID);

  const child1 = screen.getByTestId(CHILD_ID_1);
  expect(item).toContainElement(child1);

  const child2 = screen.getByTestId(CHILD_ID_2);
  expect(item).toContainElement(child2);

  const child3 = screen.getByTestId(CHILD_ID_3);
  expect(item).toContainElement(child3);

  const child4 = screen.queryByTestId(CHILD_ID_4);
  expect(item).not.toContainElement(child4);
});

test('No child should contain accessible attributes', () => {
  render(<Rating readOnly value={2} limit={3} />);

  const expectToNotHaveAccesibleAttributes = (child: HTMLElement) => {
    expect(child).not.toHaveAttribute('tabindex');
    expect(child).not.toHaveAttribute('aria-labelledby');
    expect(child).not.toHaveAttribute('role', 'radio');
  };

  const child1 = screen.getByTestId(CHILD_ID_1);
  expectToNotHaveAccesibleAttributes(child1);

  const child2 = screen.getByTestId(CHILD_ID_2);
  expectToNotHaveAccesibleAttributes(child2);

  const child3 = screen.getByTestId(CHILD_ID_3);
  expectToNotHaveAccesibleAttributes(child3);
});

const boxOnClasses = 'rar--box rar--on';
const boxOffClasses = 'rar--box rar--off';

test('Should have active classNames added properly', () => {
  render(<Rating readOnly value={2} limit={3} />);

  const child1 = screen.getByTestId(CHILD_ID_1);
  expect(child1).toHaveClass(boxOnClasses, { exact: true });

  const child2 = screen.getByTestId(CHILD_ID_2);
  expect(child2).toHaveClass(boxOnClasses, { exact: true });

  const child3 = screen.getByTestId(CHILD_ID_3);
  expect(child3).toHaveClass(boxOffClasses, { exact: true });
});

/* Half fill */

test("If user passes a float but doesn't deserve half-fill, should have classes added as usual", () => {
  render(<Rating readOnly value={2.12} limit={3} />);

  const child1 = screen.getByTestId(CHILD_ID_1);
  expect(child1).toHaveClass(boxOnClasses, { exact: true });

  const child2 = screen.getByTestId(CHILD_ID_2);
  expect(child2).toHaveClass(boxOnClasses, { exact: true });

  const child3 = screen.getByTestId(CHILD_ID_3);
  expect(child3).toHaveClass(boxOffClasses, { exact: true });
});

test('Wheter or not deserves half-fill, aria-label value should display the original value in any case', () => {
  const floatValue = 2.12;
  const items = 3;
  const { rerender } = render(<Rating readOnly value={floatValue} limit={items} />);
  const item = screen.getByTestId(ID);
  expect(item).toHaveAccessibleName(`Rated ${floatValue} on ${items}`);

  const floatValueHF = 2.44;
  rerender(<Rating readOnly value={floatValueHF} limit={items} />);
  expect(item).toHaveAccessibleName(`Rated ${floatValueHF} on ${items}`);
});

test('If user passes a float, deserves half-fill but highlightOnlySelected is enabled, should have default on/off classNames', () => {
  render(<Rating readOnly value={2.42} limit={4} halfFillMode="box" highlightOnlySelected />);

  const child1 = screen.getByTestId(CHILD_ID_1);
  expect(child1).toHaveClass(boxOffClasses, { exact: true });

  const child2 = screen.getByTestId(CHILD_ID_2);
  expect(child2).toHaveClass(boxOnClasses, { exact: true });

  const child3 = screen.getByTestId(CHILD_ID_3);
  expect(child3).toHaveClass(boxOffClasses, { exact: true });

  const child4 = screen.getByTestId(CHILD_ID_4);
  expect(child4).toHaveClass(boxOffClasses, { exact: true });
});

test('If user passes a float and deserves half-fill, should have proper classes if halfFillMode is set to "box"', () => {
  render(<Rating readOnly value={2.42} limit={4} halfFillMode="box" />);

  const onClasses = 'rar--box rar--hf-box-on';

  const child1 = screen.getByTestId(CHILD_ID_1);
  expect(child1).toHaveClass(onClasses, { exact: true });

  const child2 = screen.getByTestId(CHILD_ID_2);
  expect(child2).toHaveClass(onClasses, { exact: true });

  const child3 = screen.getByTestId(CHILD_ID_3);
  expect(child3).toHaveClass('rar--box rar--hf-box-int', { exact: true });

  const child4 = screen.getByTestId(CHILD_ID_4);
  expect(child4).toHaveClass('rar--box rar--hf-box-off', { exact: true });
});

test('If user passes a float and deserves half-fill, should have proper classes if halfFillMode is set to "svg"', () => {
  render(<Rating readOnly value={2.42} limit={4} />);

  const onClasses = 'rar--box rar--hf-svg-on';

  const child1 = screen.getByTestId(CHILD_ID_1);
  expect(child1).toHaveClass(onClasses, { exact: true });

  const child2 = screen.getByTestId(CHILD_ID_2);
  expect(child2).toHaveClass(onClasses, { exact: true });

  const child3 = screen.getByTestId(CHILD_ID_3);
  expect(child3).toHaveClass(onClasses, { exact: true });

  const child4 = screen.getByTestId(CHILD_ID_4);
  expect(child4).toHaveClass('rar--box rar--hf-svg-off', { exact: true });
});
