import { ItemStylesProp, SvgChildNodes } from './types';

import { isPlainObject } from './utils';

export const getSvgNodes = (
  itemStylesProp: ItemStylesProp | ItemStylesProp[],
  index: number
): SvgChildNodes => {
  if (isPlainObject(itemStylesProp) && !Array.isArray(itemStylesProp)) {
    return itemStylesProp.svgChildNodes as SvgChildNodes;
  }
  if (Array.isArray(itemStylesProp)) {
    return itemStylesProp[index].svgChildNodes as SvgChildNodes;
  }
  return null;
};
