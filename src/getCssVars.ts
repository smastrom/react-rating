import { ItemStylesProp, CSSVariables } from './types';

type ItemStylesForCss = Omit<ItemStylesProp, 'svgChildNodes'>;

type AnyUserProvidedStyle = {
  [key: string]: any;
};

const getItemCssVars = (targetObj: CSSVariables, key: string, value: string) => {
  switch (key) {
    case 'activeFillColor':
      targetObj['--rri--active-item-color'] = value;
      break;
    case 'activeStrokeColor':
      targetObj['--rri--active-item-stroke-color'] = value;
      break;
    case 'activeBoxColor':
      targetObj['--rri--active-box-color'] = value;
      break;
    case 'inactiveFillColor':
      targetObj['--rri--inactive-item-color'] = value;
      break;
    case 'inactiveStrokeColor':
      targetObj['--rri--inactive-item-stroke-color'] = value;
      break;
    case 'inactiveBoxColor':
      targetObj['--rri--inactive-box-color'] = value;
  }
};

const isStrokeSet = (sourceObj: ItemStylesForCss) =>
  sourceObj.hasOwnProperty('itemStrokeWidth') &&
  typeof sourceObj.itemStrokeStyle === 'string' &&
  (sourceObj.itemStrokeWidth as number) > 0;

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

type ItemStylesStrings = CSSVariables;

export const getObjectCssVars = (itemStylesProp: AnyUserProvidedStyle) => {
  const {
    svgChildNodes,
    activeFillColor,
    activeStrokeColor,
    activeBoxColor,
    ...nonArrayStyles
  } = itemStylesProp;

  const maybeArrayStyles: AnyUserProvidedStyle = {
    activeFillColor,
    activeStrokeColor,
    activeBoxColor,
  };

  let objectStyles: ItemStylesForCss = {};
  const objectStylesToKeep: ItemStylesStrings = {};
  const objectCssVars: CSSVariables = {};

  /* Delete any user-provided invalid style */
  Object.keys(nonArrayStyles).forEach((key: string) => {
    if (key === 'itemStrokeWidth') {
      if (typeof nonArrayStyles[key] !== 'number') {
        delete nonArrayStyles[key];
      }
    } else if (typeof nonArrayStyles[key] !== 'string') {
      delete nonArrayStyles[key];
    }
  });

  /* Delete any user-provided array and keep only valid string values*/
  Object.entries(maybeArrayStyles).forEach(([key, value]) => {
    if (!Array.isArray(value)) {
      if (typeof value !== 'string') {
        return;
      }
      objectStylesToKeep[key] = value;
    }
  });

  /* Merge any eventual style which could have been provided as an array */
  if (Object.keys(objectStylesToKeep).length > 0) {
    objectStyles = { ...nonArrayStyles, ...(objectStylesToKeep as ItemStylesStrings) };
  } else {
    objectStyles = { ...nonArrayStyles }; // Tell TS that nonArrayStyles should not be AnyUserProvidedStyle type anymore
  }

  if (isStrokeSet(objectStyles)) {
    getStrokeStyles(objectCssVars, objectStyles.itemStrokeStyle as string);
  }
  delete objectStyles.itemStrokeStyle, objectStyles.itemStrokeWidth;

  Object.entries(objectStyles).forEach(([key, value]) => {
    if (typeof value === 'string') {
      getItemCssVars(objectCssVars, key, value);
    }
  });

  return objectCssVars;
};

export const getArrayCssVars = (
  itemStylesProp: AnyUserProvidedStyle,
  currentSelectedIndex: number,
  highlightOnlySelected: boolean
) => {
  const { activeFillColor, activeStrokeColor, activeBoxColor } = itemStylesProp;

  const arrayStyles: AnyUserProvidedStyle = {
    activeFillColor,
    activeStrokeColor,
    activeBoxColor,
  };

  /* Delete any user-provided non-array style */
  Object.keys(arrayStyles).forEach((key) => {
    if (!Array.isArray(arrayStyles[key])) {
      delete arrayStyles[key];
    }
  });

  /* If no array styles have been set by the user, return. */
  if (Object.keys(arrayStyles).length === 0) {
    return;
  }

  const arrayStylesVars: CSSVariables = {};

  /* Get the value of any style at the same index as the current selected rating */
  Object.entries(arrayStyles).forEach(([key, value]) => {
    if (typeof value?.[currentSelectedIndex] === 'string') {
      getItemCssVars(arrayStylesVars, key, value[currentSelectedIndex]);
    }
  });

  let cssVars: CSSVariables[];

  if (highlightOnlySelected) {
    cssVars = new Array(currentSelectedIndex).fill({});
    cssVars.push(arrayStylesVars);
  } else {
    cssVars = new Array(currentSelectedIndex + 1).fill(arrayStylesVars);
  }

  return cssVars;
};
