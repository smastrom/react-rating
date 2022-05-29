import { ItemStylesProp } from './types';

export const getSvgNodes = (
  itemStylesProp: ItemStylesProp | ItemStylesProp[],
  index: number
): JSX.Element => {
  if (Array.isArray(itemStylesProp)) {
    return itemStylesProp[index].svgChildNodes as JSX.Element;
  }
  return itemStylesProp.svgChildNodes as JSX.Element;
};
