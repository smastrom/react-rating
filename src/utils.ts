export const toSecondDecimal = (number: number): number => Math.round(number * 100) / 100;

export const isPlainObject = (object: any) =>
  Array.isArray(object) === false && typeof object === 'object' && object !== null;
