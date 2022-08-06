import { getDynamicCssVars } from '../../src/getDynamicCssVars';

import { CSSVariables, RequireAtLeastOne, ValidArrayColors } from '../../src/internalTypes';

describe('getDynamicCssVars returns only CSS vars that user actually needs', () => {
	const Test1 = `If highlightOnlySelected is true and the current rating is 3,
it should return an array of the same length containing active colors only at
the current rating index`;

	const activeColors1 = ['#c41400', '#d05e00', '#cca300', '#498d00', '#00724c'];
	const activeColors2 = ['#da1600', '#db711a', '#dcb000', '#61bb00', '#009664'];

	const sourceObject: RequireAtLeastOne<ValidArrayColors> = {
		activeFillColor: activeColors1,
		activeStrokeColor: activeColors2,
		activeBoxColor: activeColors1,
		activeBoxBorderColor: activeColors2,
	};

	const expectedColors: CSSVariables = {
		'--rr--fill-on-color': '#cca300',
		'--rr--stroke-on-color': '#dcb000',
		'--rr--box-on-color': '#cca300',
		'--rr--border-on-color': '#dcb000',
	};

	const expectedArray1: CSSVariables[] = [
		{},
		{},
		{
			...expectedColors,
		},
	];

	test(Test1, () => {
		expect(getDynamicCssVars(sourceObject, 2, true)).toStrictEqual(expectedArray1);
	});

	const Test2 = `If highlightOnlySelected is false, it should always return an array of
the same length filled with the colors of the current selected rating index`;

	const expectedArray2: CSSVariables[] = [
		{
			...expectedColors,
		},
		{
			...expectedColors,
		},
		{
			...expectedColors,
		},
	];

	test(Test2, () => {
		expect(getDynamicCssVars(sourceObject, 2, false)).toStrictEqual(expectedArray2);
	});
});
