import { getActiveClassNames } from '../../src/getActiveClassNames';

import { CSSClassName } from '../../src/internalTypes';

const ratingValues = [1, 2, 3, 4, 5];

const X: CSSClassName = 'rar--on';
const _: CSSClassName = 'rar--off';

const Test1 = `If highlightOnlySelected is true, it should return an array
with the length equal to the rating items, containing the active class only
at the current selected index`;

test(Test1, () => {
  expect(getActiveClassNames(true, ratingValues, 0)).toStrictEqual([X, _, _, _, _]);
  expect(getActiveClassNames(true, ratingValues, 1)).toStrictEqual([_, X, _, _, _]);
  expect(getActiveClassNames(true, ratingValues, 2)).toStrictEqual([_, _, X, _, _]);
  expect(getActiveClassNames(true, ratingValues, 3)).toStrictEqual([_, _, _, X, _]);
  expect(getActiveClassNames(true, ratingValues, 4)).toStrictEqual([_, _, _, _, X]);
});

const Test2 = `If highlightOnlySelected is false, it should return an array
with the length equal to the rating items, containing the active class
at the current selected index and any previous index`;

test(Test2, () => {
  expect(getActiveClassNames(false, ratingValues, 0)).toStrictEqual([X, _, _, _, _]);
  expect(getActiveClassNames(false, ratingValues, 1)).toStrictEqual([X, X, _, _, _]);
  expect(getActiveClassNames(false, ratingValues, 2)).toStrictEqual([X, X, X, _, _]);
  expect(getActiveClassNames(false, ratingValues, 3)).toStrictEqual([X, X, X, X, _]);
  expect(getActiveClassNames(false, ratingValues, 4)).toStrictEqual([X, X, X, X, X]);
});
