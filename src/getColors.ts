import { RatingProps, ItemStyles, Colors } from './exportedTypes';
import { StaticColors, ValidArrayColors } from './internalTypes';

const validArrayColorKeys: Array<keyof ValidArrayColors> = [
	'activeFillColor',
	'activeStrokeColor',
	'activeBoxColor',
	'activeBoxBorderColor',
];

export const getColors = (
	colorsObj: Colors | object,
	deservesHalfFill: boolean,
	absoluteStrokeWidth: NonNullable<ItemStyles['itemStrokeWidth']>,
	absoluteHalfFill: NonNullable<RatingProps['halfFillMode']>
) => {
	const allColors = { ...colorsObj };

	const arrayColors: ValidArrayColors = {};

	if (deservesHalfFill) {
		if (absoluteHalfFill === 'box') {
			delete allColors.activeFillColor;
		} else {
			delete allColors.activeBoxColor;
		}
	}

	if (absoluteStrokeWidth === 0) {
		delete allColors.activeStrokeColor;
		delete allColors.inactiveStrokeColor;
	}

	const colorsEntries = Object.entries(allColors);

	colorsEntries.length > 0 &&
		colorsEntries.forEach(([key, value]) => {
			if (!Array.isArray(value) && typeof value !== 'string') {
				delete allColors[key as keyof typeof allColors];
			} else if (Array.isArray(value)) {
				validArrayColorKeys.forEach((validKey) => {
					if (validKey === key) {
						const cleanedArrayColors = value.filter((color) => typeof color === 'string');
						if (cleanedArrayColors.length > 0) {
							arrayColors[key as keyof ValidArrayColors] = cleanedArrayColors;
							delete allColors[key as keyof typeof allColors];
						} else {
							delete allColors[key as keyof typeof allColors];
						}
					} else {
						delete allColors[key as keyof typeof allColors];
					}
				});
			}
		});

	return { arrayColors, staticColors: allColors as StaticColors };
};
