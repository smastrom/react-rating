import {
  LABEL_POSITION_BOTTOM,
  LABEL_POSITION_LEFT,
  LABEL_POSITION_RIGHT,
  LABEL_POSITION_TOP,
} from './constants';

export const toSecondDecimal = (number: number): number => Math.round(number * 100) / 100;

export const getLabelDirectionValue = (isActive: boolean, propValue: string) => {
  if (isActive) {
    switch (propValue) {
      case LABEL_POSITION_TOP:
        return 'column-reverse';
      case LABEL_POSITION_BOTTOM:
        return 'column';
      case LABEL_POSITION_LEFT:
        return 'row-reverse';
      case LABEL_POSITION_RIGHT:
        return 'row';
    }
  }
};
