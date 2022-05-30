import { ItemStylesProp } from './types';

export const getSvgNodes = (
  itemStylesProp: ItemStylesProp,
  index: number
): JSX.Element => {
  if (Array.isArray(itemStylesProp.svgChildNodes)) {
    return itemStylesProp.svgChildNodes[index];
  }
  return itemStylesProp.svgChildNodes;
};
