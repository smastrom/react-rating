// @ts-nocheck

import { toKebabCase } from './utils';

import { ItemStyle, SingleItemStyle } from './types';

const getStrokeStyles = (
  targetObject: SingleItemStyle,
  itemStrokeStyle: string
): void => {
  switch (itemStrokeStyle) {
    case 'sharp':
      targetObject['--rri--item-stroke-linecap'] = 'miter';
      targetObject['--rri--item-stroke-linejoin'] = 'square';
      break;
    case 'round':
      targetObject['--rri--item-stroke-linecap'] = 'round';
      targetObject['--rri--item-stroke-linejoin'] = 'round';
  }
};

export const getCssVars = (itemStylesProp: ItemStyle[], selectedIndex: number) => {
  // Add behavior for object prop

  if (Array.isArray(itemStylesProp)) {
    const stylesArray = [];

    const styleToFillPrev = itemStylesProp[selectedIndex];

    itemStylesProp.forEach((childNodeStyle, index) => {
      const newStyles = {};
      const copiedPrevStyle = { ...styleToFillPrev };
      const copiedStyle = { ...childNodeStyle };

      delete copiedStyle.svgChildNodes;
      delete copiedPrevStyle.svgChildNodes;

      const styleToPush = index <= selectedIndex ? copiedPrevStyle : copiedStyle;
      getStrokeStyles(newStyles, styleToPush.itemStrokeStyle);
      delete styleToPush.itemStrokeStyle;

      Object.entries(styleToPush).forEach(([key, value]) => {
        newStyles[`--rri--${toKebabCase(key)}`] = value;
      });

      const cleanedStyle = JSON.parse(JSON.stringify(newStyles));
      stylesArray.push(cleanedStyle);
    });
    console.log(stylesArray);
    return stylesArray;
  }
};
