import { ItemStylesProp } from './types';

export const getSvgStroke = (itemStylesProp: ItemStylesProp): number => {
  if (
    typeof itemStylesProp.itemStrokeWidth === 'number' &&
    itemStylesProp.itemStrokeWidth > 0
  ) {
    return itemStylesProp.itemStrokeWidth;
  }
  return 0;
};
