import { ItemStyle } from './types';
import { toKebabCase } from './utils';

export const getCssVars = (itemStylesProp: ItemStyle[], selectedIndex: number) => {
  if (Array.isArray(itemStylesProp)) {
    const stylesArray = [];
    const styleToFillPrev = itemStylesProp[selectedIndex];

    itemStylesProp.forEach((childNodeStyle, index) => {
      const newStyles = {};
      const styleToPush = index <= selectedIndex ? styleToFillPrev : childNodeStyle;
      Object.entries(styleToPush).forEach(([key, value]) => {
        newStyles[`--rri--${toKebabCase(key)}`] = value;
      });
      stylesArray.push(newStyles);
    });
    return stylesArray;
  }
};
