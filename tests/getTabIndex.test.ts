import { getTabIndex } from '../src/getTabIndex';

const ratingValues = [1, 2, 3, 4, 5];

test('Should return [0, -1, -1, -1, -1 if currentRatingIndex is 0 or -1', () => {
  expect(getTabIndex(ratingValues, -1)).toStrictEqual([0, -1, -1, -1, -1]);
  expect(getTabIndex(ratingValues, 0)).toStrictEqual([0, -1, -1, -1, -1]);
});

test('Should return [-1, 0, -1, -1, -1 if currentRatingIndex is 1 and so on...', () => {
  expect(getTabIndex(ratingValues, 1)).toStrictEqual([-1, 0, -1, -1, -1]);
  expect(getTabIndex(ratingValues, 2)).toStrictEqual([-1, -1, 0, -1, -1]);
  expect(getTabIndex(ratingValues, 3)).toStrictEqual([-1, -1, -1, 0, -1]);
  expect(getTabIndex(ratingValues, 4)).toStrictEqual([-1, -1, -1, -1, 0]);
});
