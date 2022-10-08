import { getHFClassNames } from '../../src/getHFClassNames';
import { CSSClassName } from '../../src/internalTypes';

describe('getHFClassNames returns classNames for box and svg', () => {
	const items = 5;
	const Test1 = `It should return an array, whose value at the intersectionIndex
has a special className if halfFillMode equals to "box"`;

	const X: CSSClassName = 'rr--hf-box-int';
	const I: CSSClassName = 'rr--hf-box-on';
	const O: CSSClassName = 'rr--hf-box-off';

	test(Test1, () => {
		expect(getHFClassNames(0.4, items, 'box')).toStrictEqual([X, O, O, O, O]);
		expect(getHFClassNames(1.5, items, 'box')).toStrictEqual([I, X, O, O, O]);
		expect(getHFClassNames(2.33, items, 'box')).toStrictEqual([I, I, X, O, O]);
		expect(getHFClassNames(3.33, items, 'box')).toStrictEqual([I, I, I, X, O]);
		expect(getHFClassNames(4.33, items, 'box')).toStrictEqual([I, I, I, I, X]);
	});

	const Test2 = `It should return an array, whose value at the intersectionIndex and
all values before have an active className if halfFillMode equals to "svg"`;

	const ON: CSSClassName = 'rr--hf-svg-on';
	const _: CSSClassName = 'rr--hf-svg-off';

	test(Test2, () => {
		expect(getHFClassNames(0.41, items, 'svg')).toStrictEqual([ON, _, _, _, _]);
		expect(getHFClassNames(1.51, items, 'svg')).toStrictEqual([ON, ON, _, _, _]);
		expect(getHFClassNames(2.33, items, 'svg')).toStrictEqual([ON, ON, ON, _, _]);
		expect(getHFClassNames(3.33, items, 'svg')).toStrictEqual([ON, ON, ON, ON, _]);
		expect(getHFClassNames(4.33, items, 'svg')).toStrictEqual([ON, ON, ON, ON, ON]);
	});
});
