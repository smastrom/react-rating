import { roundToHalf } from './utils';

import { CSSClassName } from './internalTypes';
import { ReadOnlyProps } from './exportedTypes';

export const getHalfFillClassNames = (
  ratingValue: number,
  items: number,
  absoluteHalfFillMode: NonNullable<ReadOnlyProps['halfFillMode']>
): CSSClassName[] => {
  const intersectionIndex = Math.floor(roundToHalf(ratingValue));

  const classNames = Array(items)
    .fill(undefined)
    .map((_, index) => {
      if (absoluteHalfFillMode === 'box') {
        if (index > intersectionIndex) {
          return 'rar--hf-box-off';
        }
        if (index === intersectionIndex) {
          return 'rar--hf-box-int';
        }
        return 'rar--hf-box-on';
      }
      if (index > intersectionIndex) {
        return 'rar--hf-svg-off';
      }
      return 'rar--hf-svg-on';
    });

  return classNames;
};
