export const isPlainObject = (object: any) =>
  Array.isArray(object) === false && typeof object === 'object' && object !== null;

export const toKebabCase = (str: string): string =>
  str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase());
