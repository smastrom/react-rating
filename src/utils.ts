import { ValidArrayColors } from './types';

export const isPlainObject = (object: any) =>
  !Array.isArray(object) && typeof object === 'object' && object !== null;

export const isObjectWithKeys = (object: any) =>
  isPlainObject(object) && Object.keys(object).length > 0;

export const isValidPositiveNumber = (value: any) => typeof value === 'number' && value > 0;

export const isValidColor = (color: any) =>
  typeof color === 'string' && CSS.supports('color', color);

export const toSecondDecimal = (number: number): number => Math.round(number * 100) / 100;

export const roundToHalf = (number: number) => Math.round(number * 2) / 2;

export const getUniqueId = () => (Math.random() + 1).toString(36).substring(7);

export const cleanupSplitColors = (object: object) => {
  const staticColors = { ...object };
  const arrayColors: ValidArrayColors = {};

  Object.entries(staticColors).forEach(([key, value]) => {
    if (!Array.isArray(value) && !isValidColor(value)) {
      delete staticColors[key as keyof typeof staticColors];
    } else if (Array.isArray(value)) {
      const cleanColors = value.filter((color) => isValidColor(color));
      if (cleanColors.length > 0) {
        arrayColors[key as keyof ValidArrayColors] = cleanColors;
        delete staticColors[key as keyof typeof staticColors];
      } else {
        delete staticColors[key as keyof typeof staticColors];
      }
    }
  });

  return { staticColors, arrayColors };
};

export const getIntersectionIndex = (ratingValues: number[], ratingValue: number) => {
  const roundedHalf = roundToHalf(ratingValue);
  if (Number.isInteger(roundedHalf)) {
    return ratingValues.indexOf(roundedHalf);
  }
  const intersectionIndex = Math.floor(roundedHalf);
  return intersectionIndex;
};

export const isFinalValueFloat = (ratingValue: number) => {
  const roundedHalf = roundToHalf(ratingValue);
  if (Number.isInteger(roundedHalf)) {
    return false;
  }
  return true;
};
