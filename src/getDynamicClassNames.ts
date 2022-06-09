import { roundToHalf } from './utils';

import { CSSClassName } from './internalTypes';
import { RatingProps, ReadOnlyProps, SharedProps } from './exportedTypes';

type RatingValues = RatingProps['value'][];

type AbsoluteHalfFill = NonNullable<ReadOnlyProps['halfFillMode']>;

export const getHalfFillClassNames = (
  ratingValue: RatingProps['value'],
  ratingValues: RatingValues,
  absoluteHalfFillMode: AbsoluteHalfFill
): CSSClassName[] => {
  const intersectionIndex = Math.floor(roundToHalf(ratingValue));

  const classNames = ratingValues.map((_, index) => {
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
    if (index === intersectionIndex) {
      return 'rar--hf-svg-on';
    }
    return 'rar--hf-svg-on';
  });

  return classNames;
};

type HighlightOnlySelectedPropValue = NonNullable<SharedProps['highlightOnlySelected']>;

export const getActiveClassNames = (
  highlightOnlySelectedProp: HighlightOnlySelectedPropValue,
  ratingValues: RatingValues,
  selectedIndex: number
): CSSClassName[] =>
  ratingValues.map((_, index) => {
    if (highlightOnlySelectedProp === false) {
      if (index <= selectedIndex) {
        return 'rar--on';
      }
      return 'rar--off';
    }
    if (index === selectedIndex) {
      return 'rar--on';
    }
    return 'rar--off';
  });
