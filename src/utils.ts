export const toSecondDecimal = (number: number): number => Math.round(number * 100) / 100;

export const isPlainObject = (object: any) =>
  Array.isArray(object) === false && typeof object === 'object' && object !== null;

export const isValidInitialValue = (array: number[], value: number | null) =>
  array.indexOf(value as number) >= 0 || value === null;
