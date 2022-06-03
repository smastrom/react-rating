import { roundToHalf } from './utils';

import { RatingProps, ReadOnlyProps, SharedProps, CSSClassName } from './types';

type RatingValues = RatingProps['value'][];

type AbsoluteHalfFill = NonNullable<ReadOnlyProps['halfFillMode']>;

const boxShared: CSSClassName = 'rar--hf-svg-fill';
const svgShared: CSSClassName = 'rar--hf-svg-box-bg';

export const getHalfFillClassNames = (
  ratingValue: RatingProps['value'],
  ratingValues: RatingProps['value'][],
  absoluteHalfFillMode: AbsoluteHalfFill
) => {
  const intersectionIndex = Math.floor(roundToHalf(ratingValue));

  const classNames: string[] = ratingValues.map((_, index) => {
    if (absoluteHalfFillMode === 'box') {
      if (index > intersectionIndex) {
        return `rar--hf-box-off ${boxShared}`;
      }
      if (index === intersectionIndex) {
        return `rar--hf-box-int ${boxShared}`;
      }
      return `rar--hf-box-on ${boxShared}`;
    }
    if (index > intersectionIndex) {
      return `rar--hf-svg-off ${svgShared}`;
    }
    if (index === intersectionIndex) {
      return `rar--hf-svg-int ${svgShared}`;
    }
    return `rar--hf-svg-on ${svgShared}`;
  });

  return classNames;
};

type HighlightOnlySelectedPropValue = NonNullable<SharedProps['highlightOnlySelected']>;

export const getActiveClassNames = (
  highlightOnlySelectedProp: HighlightOnlySelectedPropValue,
  ratingValues: RatingValues,
  selectedIndex: number
) =>
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
