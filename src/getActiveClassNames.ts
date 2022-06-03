import { SharedProps } from './types';

type HighlightOnlySelectedPropValue = NonNullable<SharedProps['highlightOnlySelected']>;

export const getActiveClassNames = (
  highlightOnlySelectedProp: HighlightOnlySelectedPropValue,
  ratingValues: number[],
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
