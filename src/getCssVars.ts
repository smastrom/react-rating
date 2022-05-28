import { ItemStylesProp, CSSVariables } from './types';

type PartialItemStyleProps = Partial<ItemStylesProp>;

const getItemCssVars = (targetObj: CSSVariables, key: string, value: string) => {
  if (typeof value !== 'string') {
    return;
  }

  switch (key) {
    case 'activeItemColor':
      targetObj['--rri--active-item-color'] = value;
      break;
    case 'activeItemStrokeColor':
      targetObj['--rri--active-item-stroke-color'] = value;
      break;
    case 'activeBoxColor':
      targetObj['--rri--active-box-color'] = value;
      break;
    case 'activeBoxBorderColor':
      targetObj['--rri--active-box-border-color'] = value;
      break;
    case 'inactiveItemColor':
      targetObj['--rri--inactive-item-color'] = value;
      break;
    case 'inactiveItemStrokeColor':
      targetObj['--rri--inactive-item-stroke-color'] = value;
      break;
    case 'inactiveBoxColor':
      targetObj['--rri--inactive-box-color'] = value;
      break;
    case 'inactiveBoxBorderColor':
      targetObj['--rri--inactive-box-border-color'] = value;
  }
};

const isStrokeSet = (sourceObj: PartialItemStyleProps) =>
  sourceObj.hasOwnProperty('itemStrokeWidth') &&
  typeof sourceObj.itemStrokeWidth === 'number' &&
  sourceObj.itemStrokeWidth > 0;

const getStrokeStyles = (targetObj: CSSVariables, itemStrokeStyle: string) => {
  switch (itemStrokeStyle) {
    case 'sharp':
      targetObj['--rri--item-stroke-linecap'] = 'miter';
      targetObj['--rri--item-stroke-linejoin'] = 'square';
      break;
    default:
      targetObj['--rri--item-stroke-linecap'] = 'round';
      targetObj['--rri--item-stroke-linejoin'] = 'round';
  }
};

const getVarsFromPropStyles = (
  sourceObj: PartialItemStyleProps,
  targetObj: CSSVariables
) => {
  Object.entries(sourceObj).forEach(([key, value]) => {
    getItemCssVars(targetObj, key, value as string);
  });
};

export const getCssObjectVars = (itemStylesProp: ItemStylesProp) => {
  const cssVars: CSSVariables = {};

  const copiedStyle: PartialItemStyleProps = { ...itemStylesProp };
  delete copiedStyle.svgChildNodes;

  if (isStrokeSet(itemStylesProp)) {
    getStrokeStyles(cssVars, copiedStyle.itemStrokeStyle as string);
  }
  delete copiedStyle.itemStrokeWidth;
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

  itemStylesProp.forEach((childNodeStyle, styleIndex) => {
    const cssVars: CSSVariables = {};

    const copiedPrevStyle: PartialItemStyleProps = { ...prevStyles };
    delete copiedPrevStyle.svgChildNodes;

    const copiedStyle: PartialItemStyleProps = { ...childNodeStyle };
    delete copiedStyle.svgChildNodes;

    const styleToPush = styleIndex <= selectedIndex ? copiedPrevStyle : copiedStyle;

    if (isStrokeSet(styleToPush)) {
      getStrokeStyles(cssVars, styleToPush.itemStrokeStyle as string);
    }
    delete styleToPush.itemStrokeWidth;
    delete styleToPush.itemStrokeStyle;

    getVarsFromPropStyles(styleToPush, cssVars);
    cssVarsArray.push(cssVars);
  });

  return cssVarsArray;
};
