import { isSSR } from './utils';

import { ValidArrayColors } from './internalTypes';

const isValidColor = (color: any) => typeof color === 'string' && CSS.supports('color', color);

const isValidColorSSR = (color: any) =>
  isSSR ? typeof color === 'string' : isValidColor(color);

export const splitColors = (object: object) => {
  const staticColors = { ...object };
  const arrayColors: ValidArrayColors = {};

  Object.entries(staticColors).forEach(([key, value]) => {
    if (!Array.isArray(value) && !isValidColorSSR(value)) {
      delete staticColors[key as keyof typeof staticColors];
    } else if (Array.isArray(value)) {
      const cleanedArrayColors = value.filter((color) => isValidColorSSR(color));
      if (cleanedArrayColors.length > 0) {
        arrayColors[key as keyof ValidArrayColors] = cleanedArrayColors;
        delete staticColors[key as keyof typeof staticColors];
      } else {
        delete staticColors[key as keyof typeof staticColors];
      }
    }
  });

  return { staticColors, arrayColors };
};
