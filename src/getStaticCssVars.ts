import { setColorCssVars } from './setColorsCssVars';
import { ItemStyles } from './exportedTypes';
import { CSSVariables, StaticColors } from './internalTypes';

export function getStaticCssVars(
	staticColors: StaticColors,
	boxBorderWidth: NonNullable<ItemStyles['boxBorderWidth']>
): CSSVariables {
	const cssVars: CSSVariables = {};

	if (typeof boxBorderWidth === 'number' && boxBorderWidth > 0) {
		cssVars['--rr--border-width'] = `${boxBorderWidth}px`;
	}
	const colorsEntries = Object.entries(staticColors);

	if (colorsEntries.length > 0) {
		for (const [key, value] of colorsEntries) {
			setColorCssVars(cssVars, key, value);
		}
	}

	return cssVars;
}
