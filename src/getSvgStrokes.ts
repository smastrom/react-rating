import { ItemStylesProp } from './types';

const isValidStroke = (strokeWidth: any) =>
  typeof strokeWidth === 'number' && strokeWidth > 0;

export const getSvgStrokes = (
  itemStylesProp: ItemStylesProp | ItemStylesProp[],
  index: number
): number => {
  if (Array.isArray(itemStylesProp)) {
    const strokesArr = itemStylesProp.map(({ itemStrokeWidth }) =>
      isValidStroke(itemStrokeWidth) ? itemStrokeWidth : 0
    );
    return strokesArr[index] as number;
  }
  if (isValidStroke(itemStylesProp.itemStrokeWidth)) {
    return itemStylesProp.itemStrokeWidth as number;
  }
  return 0;
};
