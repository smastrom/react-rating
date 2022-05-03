import { ItemStyle } from './types';
import { isPlainObject } from './utils';

export const getSvgStrokes = (
  ratingValuesNum: number[] | string[],
  itemStylesProp: ItemStyle | ItemStyle[],
  index: number
): number => {
  if (Array.isArray(itemStylesProp)) {
    const strokesArr = itemStylesProp.map(({ itemStrokeWidth }) =>
      typeof itemStrokeWidth === 'number' ? itemStrokeWidth : 0
    );
    return strokesArr[index];
  }
  if (isPlainObject(itemStylesProp)) {
    const strokesArr = ratingValuesNum.map(() => itemStylesProp.itemStrokeWidth);
    return strokesArr[index] as number;
  }
  return 0;
};
