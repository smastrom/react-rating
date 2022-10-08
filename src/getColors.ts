import { ItemStyles, Colors } from './exportedTypes';
import { NonNullProp, StaticColors, ValidArrayColors } from './internalTypes';
import { ActiveColorProps, HFProps } from './constants';

const validArrayColorKeys: (keyof ValidArrayColors)[] = [
	ActiveColorProps.FILL,
	ActiveColorProps.BOX,
	ActiveColorProps.STROKE,
	ActiveColorProps.BORDER,
];

export function getColors(
	colorsObj: Colors | object,
	deservesHF: boolean,
	itemStrokeWidth: NonNullable<ItemStyles['itemStrokeWidth']>,
	absoluteHF: NonNullProp<'halfFillMode'>
) {
	const allColors = { ...colorsObj };
	const arrayColors: ValidArrayColors = {};

	if (deservesHF) {
		if (absoluteHF === HFProps.BOX) {
			delete allColors.activeFillColor;
		} else {
			delete allColors.activeBoxColor;
		}
	}

	if (itemStrokeWidth === 0) {
		delete allColors.activeStrokeColor;
		delete allColors.inactiveStrokeColor;
	}

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
