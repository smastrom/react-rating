import { defaultItemStyles } from './defaultStyles';
import {
  CSS_ACTIVE_ITEM_COLOR,
  CSS_ACTIVE_ITEM_STROKE_COLOR,
  CSS_ACTIVE_BOX_COLOR,
  CSS_ACTIVE_BOX_BORDER_COLOR,
  CSS_INACTIVE_ITEM_COLOR,
  CSS_INACTIVE_ITEM_STROKE_COLOR,
  CSS_INACTIVE_BOX_COLOR,
  CSS_INACTIVE_BOX_BORDER_COLOR,
  STROKE_STYLE_SHARP,
  STROKE_STYLE_ROUND,
  CSS_ITEM_STROKE_LINECAP,
  CSS_ITEM_STROKE_LINEJOIN,
} from './constants';

import { ElementStyles, ElementStyle, SingleStyles } from './types';

const addStrokeStyles = (itemStrokeStyle: string, targetObject: SingleStyles): void => {
  switch (itemStrokeStyle) {
    case STROKE_STYLE_SHARP:
      targetObject[CSS_ITEM_STROKE_LINECAP] = 'miter';
      targetObject[CSS_ITEM_STROKE_LINEJOIN] = 'square';
      break;
    case STROKE_STYLE_ROUND:
      targetObject[CSS_ITEM_STROKE_LINECAP] = 'round';
      targetObject[CSS_ITEM_STROKE_LINEJOIN] = 'round';
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

      singleStyle[CSS_ACTIVE_ITEM_COLOR] = mergedStyle.activeItemColor;
      singleStyle[CSS_ACTIVE_BOX_COLOR] = mergedStyle.activeBoxColor;
      singleStyle[CSS_ACTIVE_BOX_BORDER_COLOR] = mergedStyle.activeBoxBorderColor;

      singleStyle[CSS_INACTIVE_ITEM_COLOR] = mergedStyle.inactiveItemColor;
      singleStyle[CSS_INACTIVE_BOX_COLOR] = mergedStyle.inactiveBoxColor;
      singleStyle[CSS_INACTIVE_BOX_BORDER_COLOR] = mergedStyle.inactiveBoxBorderColor;

      if (
        typeof mergedStyle.itemStrokeWidth === 'number' &&
        mergedStyle.itemStrokeWidth > 0 &&
        typeof mergedStyle.itemStrokeStyle === 'string'
      ) {
        singleStyle[CSS_ACTIVE_ITEM_STROKE_COLOR] = mergedStyle.activeItemStrokeColor;
        singleStyle[CSS_INACTIVE_ITEM_STROKE_COLOR] = mergedStyle.inactiveItemStrokeColor;
        addStrokeStyles(mergedStyle.itemStrokeStyle, singleStyle);
      }

      const cleanedStyle = JSON.parse(JSON.stringify(singleStyle));
      singleStyles.push(cleanedStyle);
    });
    return singleStyles;
  }
  return [];
};
