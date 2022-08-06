import { getIntersectionIndex } from '../../src/utils';

const ratingValues = [1, 2, 3, 4, 5];

const Test = `We try to round the value to the nearest half-integer.
If the result is an integer (not enough for half-fill),
it should return the index of the (rounded) rating value. If the final
result is an half-integer, it should return the next integer index.`;

test(Test, () => {
	expect(getIntersectionIndex(ratingValues, 1.23)).toBe(0);
	expect(getIntersectionIndex(ratingValues, 1.5)).toBe(1);
	expect(getIntersectionIndex(ratingValues, 2.23)).toBe(1);
	expect(getIntersectionIndex(ratingValues, 2.55)).toBe(2);
	expect(getIntersectionIndex(ratingValues, 3)).toBe(2);
	expect(getIntersectionIndex(ratingValues, 3.5)).toBe(3);
});
