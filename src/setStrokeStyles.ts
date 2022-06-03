import { ItemStylesProp, KeyAndValueStrings } from './types';

export const setStrokeStyles = (
  targetObj: KeyAndValueStrings,
  itemStrokeStyle: ItemStylesProp['itemStrokeStyle']
) => {
  switch (itemStrokeStyle) {
    case 'sharp':
      targetObj['--rar--stroke-linecap'] = 'miter';
      targetObj['--rar--stroke-linejoin'] = 'square';
      break;
    default:
      targetObj['--rar--stroke-linecap'] = 'round';
      targetObj['--rar--stroke-linejoin'] = 'round';
  }
};

export const setStrokeStylesX = (itemStrokeStyle: ItemStylesProp['itemStrokeStyle']) => {
  switch (itemStrokeStyle) {
    case 'sharp':
      return '--rar--stroke-linecap: miter; --rar--stroke-linejoin: square;';
    default:
      return '--rar--stroke-linecap: round; --rar--stroke-linejoin: round;';
  }
};
