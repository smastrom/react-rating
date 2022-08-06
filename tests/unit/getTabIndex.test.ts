import { getTabIndex } from '../../src/getTabIndex';

describe('getTabIndex returns the updated tabIndex array based on currentRatingIndex', () => {
	const items = 5;

	test('Should return [0, -1, -1, -1, -1 if currentRatingIndex is 0 or -1', () => {
		expect(getTabIndex(items, -1)).toStrictEqual([0, -1, -1, -1, -1]);
		expect(getTabIndex(items, 0)).toStrictEqual([0, -1, -1, -1, -1]);
	});

	test('Should return [-1, 0, -1, -1, -1 if currentRatingIndex is 1 and so on...', () => {
		expect(getTabIndex(items, 1)).toStrictEqual([-1, 0, -1, -1, -1]);
		expect(getTabIndex(items, 2)).toStrictEqual([-1, -1, 0, -1, -1]);
		expect(getTabIndex(items, 3)).toStrictEqual([-1, -1, -1, 0, -1]);
		expect(getTabIndex(items, 4)).toStrictEqual([-1, -1, -1, -1, 0]);
	});
});
