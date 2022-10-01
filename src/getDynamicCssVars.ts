import { setDyamicCssVars } from './setColorsCssVars';
import { RatingProps } from './exportedTypes';
import { CSSVariables, RequireAtLeastOne, ValidArrayColors } from './internalTypes';

export function getDynamicCssVars(
	arrayColors: RequireAtLeastOne<ValidArrayColors>,
	currentSelectedIndex: number,
	highlightOnlySelected: NonNullable<RatingProps['highlightOnlySelected']>
): CSSVariables[] {
	const copyArrayColors = { ...arrayColors };
	const arrayStylesVars: CSSVariables = {};

	let cssVars: CSSVariables[];

	for (const [key, color] of Object.entries(copyArrayColors)) {
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
