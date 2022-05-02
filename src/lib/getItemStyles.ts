import { defaultItemStyles } from './DefaultStyles';

import { ElementStyles, ElementStyle, SingleStyles } from './types';

const addStrokeStyles = (itemStrokeStyle: string, targetObject: SingleStyles): void => {
  switch (itemStrokeStyle) {
    case 'sharp':
      targetObject['--rri--item-stroke-linecap'] = 'miter';
      targetObject['--rri--item-stroke-linejoin'] = 'square';
      break;
    case 'round':
      targetObject['--rri--item-stroke-linecap'] = 'round';
      targetObject['--rri--item-stroke-linejoin'] = 'round';
      break;
  }
};

export const getItemStyles = (itemStylesProp: ElementStyles): SingleStyles[] | [] => {
  const singleStyles: SingleStyles[] = [];
  if (Array.isArray(itemStylesProp)) {
    itemStylesProp.forEach((userStyle) => {
      const mergedStyle: ElementStyle = {
        ...defaultItemStyles,
        ...userStyle,
      };
      const singleStyle: SingleStyles = {};

      singleStyle['--rri--item-color'] = mergedStyle.activeItemColor;
      singleStyle['--rri--box-color'] = mergedStyle.activeBoxColor;
      singleStyle['--rri--box-border-color'] = mergedStyle.activeBoxBorderColor;

      singleStyle['--rri--inactive-item-color'] = mergedStyle.inactiveItemColor;
      singleStyle['--rri--inactive-box-color'] = mergedStyle.inactiveBoxColor;
      singleStyle['--rri--inactive-box-border-color'] =
        mergedStyle.inactiveBoxBorderColor;

      if (
        typeof mergedStyle.itemStrokeWidth === 'number' &&
        mergedStyle.itemStrokeWidth > 0 &&
        typeof mergedStyle.itemStrokeStyle === 'string'
      ) {
        singleStyle['--rri--active-item-stroke-color'] =
          mergedStyle.activeItemStrokeColor;
        singleStyle['--rri--inactive-item-stroke-color'] =
          mergedStyle.inactiveItemStrokeColor;
        addStrokeStyles(mergedStyle.itemStrokeStyle, singleStyle);
      }

      const cleanedStyle = JSON.parse(JSON.stringify(singleStyle));
      singleStyles.push(cleanedStyle);
    });
    return singleStyles;
  }
  return [];
};
