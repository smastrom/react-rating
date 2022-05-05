export const toSecondDecimal = (number: number): number => Math.round(number * 100) / 100;

export const isPlainObject = (object: any) =>
  Array.isArray(object) === false && typeof object === 'object' && object !== null;

export const toKebabCase = (string: string): string =>
  string.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? '-' : '') + $.toLowerCase()
  );

export const isInvalidArray = (array: string[] | number[]) =>
  array.some((item, index) => {
    if (index === 0) {
      return false;
    }
    return item === array[0];
  });

export const isValidInitialValue = (array: number[], value: number | null) =>
  array.indexOf(value as number) >= 0 || value === null;
