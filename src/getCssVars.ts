import { toKebabCase } from './utils';

import { ItemStylesProp, CSSVariables } from './types';

const getStrokeStyles = (targetObject: CSSVariables, itemStrokeStyle: string): void => {
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

const getVarsFromPropStyles = (
  sourceObject: ItemStylesProp,
  destinationObject: CSSVariables
) => {
  Object.entries(sourceObject).forEach(([key, value]) => {
    destinationObject[`--rri--${toKebabCase(key)}`] = `${value}`;
  });
};

export const getCssObjectVars = (itemStylesProp: ItemStylesProp) => {
  const cssVars: CSSVariables = {};

  const copiedStyle = { ...itemStylesProp };
  delete copiedStyle.svgChildNodes;

  getStrokeStyles(cssVars, copiedStyle.itemStrokeStyle as string);
  delete copiedStyle.itemStrokeStyle;

  getVarsFromPropStyles(copiedStyle, cssVars);

  return cssVars;
};

export const getCssArrayVars = (
  itemStylesProp: ItemStylesProp[],
  selectedIndex: number
) => {
  const cssVarsArray: CSSVariables[] = [];

  const prevStyles = itemStylesProp[selectedIndex];

  itemStylesProp.forEach((childNodeStyle, index) => {
    const cssVars: CSSVariables = {};

    const copiedPrevStyle = { ...prevStyles };
    delete copiedPrevStyle.svgChildNodes;

    const copiedStyle = { ...childNodeStyle };
    delete copiedStyle.svgChildNodes;

    const styleToPush = index <= selectedIndex ? copiedPrevStyle : copiedStyle;

    getStrokeStyles(cssVars, styleToPush.itemStrokeStyle as string);
    delete styleToPush.itemStrokeStyle;

    getVarsFromPropStyles(styleToPush, cssVars);

    const cleanedStyle = JSON.parse(JSON.stringify(cssVars));
    cssVarsArray.push(cleanedStyle);
  });

  return cssVarsArray;
};