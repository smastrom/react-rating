import { setDyamicCssVars } from './setColorCssVars';
import {
	NonNullProp,
	CSSVariables,
	RequireAtLeastOne,
	ValidArrayColors,
} from './internalTypes';

export function getDynamicCssVars(
	arrayColors: RequireAtLeastOne<ValidArrayColors>,
	currentSelectedIndex: number,
	highlightOnlySelected: NonNullProp<'highlightOnlySelected'>
): CSSVariables[] {
	const arrayStylesVars: CSSVariables = {};
	let cssVars: CSSVariables[];

	for (const [key, color] of Object.entries(arrayColors)) {
		setDyamicCssVars(arrayStylesVars, key, color[currentSelectedIndex]);
	}

	if (highlightOnlySelected === true) {
		cssVars = Array(currentSelectedIndex).fill({});
		cssVars.push(arrayStylesVars);
	} else {
		cssVars = Array(currentSelectedIndex + 1).fill(arrayStylesVars);
	}

	return cssVars;
}
