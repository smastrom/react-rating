import { setDyamicCssVars } from './setColorCssVars';
import {
	NonNullProp,
	CSSVariables,
	RequireAtLeastOne,
	ValidArrayColors,
} from './internalTypes';

export function getDynamicCssVars(
	arrayColors: RequireAtLeastOne<ValidArrayColors>,
	starIndex: number,
	highlightOnlySelected: NonNullProp<'highlightOnlySelected'>
): CSSVariables[] {
	const arrayStylesVars: CSSVariables = {};
	let cssVars: CSSVariables[];

	for (const [key, color] of Object.entries(arrayColors)) {
		setDyamicCssVars(arrayStylesVars, key, color[starIndex]);
	}

	if (highlightOnlySelected === true) {
		cssVars = Array(starIndex).fill({});
		cssVars.push(arrayStylesVars);
	} else {
		cssVars = Array(starIndex + 1).fill(arrayStylesVars);
	}

	return cssVars;
}
