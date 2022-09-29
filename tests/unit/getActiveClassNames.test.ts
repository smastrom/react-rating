import { getActiveClassNames } from '../../src/getActiveClassNames';
import { CSSClassName } from '../../src/internalTypes';

describe('getActiveClassNames returns proper array of active classes', () => {
	const items = 5;
	const X: CSSClassName = 'rr--on';
	const _: CSSClassName = 'rr--off';

	const Test1 = `If highlightOnlySelected is true, it should return an array
with the length equal to the rating items, containing the active class only
at the current selected index`;

	test(Test1, () => {
		expect(getActiveClassNames(true, items, 0)).toStrictEqual([X, _, _, _, _]);
		expect(getActiveClassNames(true, items, 1)).toStrictEqual([_, X, _, _, _]);
		expect(getActiveClassNames(true, items, 2)).toStrictEqual([_, _, X, _, _]);
		expect(getActiveClassNames(true, items, 3)).toStrictEqual([_, _, _, X, _]);
		expect(getActiveClassNames(true, items, 4)).toStrictEqual([_, _, _, _, X]);
	});

	const Test2 = `If highlightOnlySelected is false, it should return an array
with the length equal to the rating items, containing the active class
at the current selected index and any previous index`;

	test(Test2, () => {
		expect(getActiveClassNames(false, items, 0)).toStrictEqual([X, _, _, _, _]);
		expect(getActiveClassNames(false, items, 1)).toStrictEqual([X, X, _, _, _]);
		expect(getActiveClassNames(false, items, 2)).toStrictEqual([X, X, X, _, _]);
		expect(getActiveClassNames(false, items, 3)).toStrictEqual([X, X, X, X, _]);
		expect(getActiveClassNames(false, items, 4)).toStrictEqual([X, X, X, X, X]);
	});
});
