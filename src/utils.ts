export const toSecondDecimal = (number: number): number => Math.round(number * 100) / 100;

export const roundToHalf = (number: number) => Math.round(number * 2) / 2;

export const isPlainObject = (object: any) =>
  !Array.isArray(object) && typeof object === 'object' && object !== null;

export const isEmptyObject = (object: object) =>
  isPlainObject(object) && Object.keys(object).length === 0;

export const isValidPositiveNumber = (value: any) => {
  if (typeof value === 'number' && value > 0) {
    return true;
  }
  return false;
};

export const isValidColor = (colorString: string) => CSS.supports('color', colorString);

export const isValidTransition = (transitionProp: string) =>
  CSS.supports('transition', `color ${transitionProp}`);

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
