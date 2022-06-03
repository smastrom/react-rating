import { roundToHalf } from './utils';

import { ReadOnlyProps } from './types';

type HalfFillPropValue = NonNullable<ReadOnlyProps['halfFillMode']>;

export const getHalfFillClassNames = (
  ratingValue: number,
  ratingValues: number[],
  halfFillProp: HalfFillPropValue
): string[] => {
  const intersectionIndex = Math.floor(roundToHalf(ratingValue));

  const classNames = ratingValues.map((_, index) => {
    if (halfFillProp === 'box') {
      if (index > intersectionIndex) {
        return 'rar--hf-box-off rar--hf-svg-fill';
      }
      if (index === intersectionIndex) {
        return 'rar--hf-box-int rar--hf-svg-fill';
      }
      return 'rar--hf-box-on rar--hf-svg-fill';
    }
    if (index > intersectionIndex) {
      return 'rar--hf-svg-off rar--hf-svg-box-bg';
    }
    if (index === intersectionIndex) {
      return 'rar--hf-svg-int rar--hf-svg-box-bg';
    }
    return 'rar--hf-svg-on rar--hf-svg-box-bg';
  });

  return classNames;
};
