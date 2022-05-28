import { ItemStylesProp, SvgChildNodes } from './types';

export const getSvgNodes = (
  itemStylesProp: ItemStylesProp | ItemStylesProp[],
  index: number
): SvgChildNodes => {
  if (Array.isArray(itemStylesProp)) {
    return itemStylesProp[index].svgChildNodes as SvgChildNodes;
  }
  return itemStylesProp.svgChildNodes as SvgChildNodes;
};
