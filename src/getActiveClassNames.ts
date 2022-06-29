import { CSSClassName } from './internalTypes';
import { SharedProps } from './exportedTypes';

export const getActiveClassNames = (
  highlightOnlySelectedProp: NonNullable<SharedProps['highlightOnlySelected']>,
  items: number,
  selectedIndex: number
): CSSClassName[] =>
  Array(items)
    .fill(undefined)
    .map((_, index) => {
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
