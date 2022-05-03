import { ItemStyle, SvgChildNodes } from './types';

import { isPlainObject } from './utils';

export const getSvgNodes = (
  itemStylesProp: ItemStyle | ItemStyle[],
  index: number
): SvgChildNodes => {
  if (isPlainObject(itemStylesProp)) {
    return itemStylesProp.svgChildNodes;
  }
  if (Array.isArray(itemStylesProp)) {
    return itemStylesProp[index].svgChildNodes as SvgChildNodes;
  }
  return null;
};
