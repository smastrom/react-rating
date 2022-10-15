import { Colors } from './exportedTypes';
import { StaticColors, ValidArrayColors } from './internalTypes';
import { ActiveColorProps } from './constants';

const validArrayColorKeys: (keyof ValidArrayColors)[] = [
	ActiveColorProps.FILL,
	ActiveColorProps.BOX,
	ActiveColorProps.STROKE,
	ActiveColorProps.BORDER,
];

export function getColors(colorsObj: Colors | object) {
	const allColors = { ...colorsObj };
	const arrayColors: ValidArrayColors = {};

	const colorsEntries = Object.entries(allColors);

	if (colorsEntries.length > 0) {
		for (const [key, value] of colorsEntries) {
			if (!Array.isArray(value) && typeof value !== 'string') {
				delete allColors[key as keyof typeof allColors];
			} else if (Array.isArray(value)) {
				for (const validKey of validArrayColorKeys) {
					if (validKey === key) {
						const cleanedArrayColors = value.filter((color) => typeof color === 'string');
						if (cleanedArrayColors.length > 0) {
							arrayColors[key] = cleanedArrayColors;
							delete allColors[key];
						}
					} else {
						delete allColors[key as keyof typeof allColors];
					}
				}
			}
		}
	}

	return { arrayColors, staticColors: allColors as StaticColors };
}
