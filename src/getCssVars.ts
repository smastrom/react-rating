import {
  setItemStylesCssVars,
  getColorsCssVars,
  getEasingVar,
} from './setItemStylesCssVars';
import { setStrokeStyles, setStrokeStylesX } from './setStrokeStyles';
import { isValidPositiveNumber as isValidStroke } from './utils';

import { ItemStylesForCss, KeyAndValueStrings, RatingProps } from './types';

type AnyUserProvidedStyle = {
  [key: string]: any;
};

export const getObjectCssVars = (
  itemStylesProp: AnyUserProvidedStyle,
  halfFillModeProp?: RatingProps['halfFillMode'],
  deservesHalfFill?: boolean
) => {
  const {
    svgChildNodes,
    activeFillColor,
    activeStrokeColor,
    activeBoxColor,
    activeBoxBorderColor,
    ...nonArrayStyles
  } = itemStylesProp;

  const maybeArrayStyles: AnyUserProvidedStyle = {
    activeFillColor,
    activeStrokeColor,
    activeBoxColor,
    activeBoxBorderColor,
  };

  let objectStyles: ItemStylesForCss = {};
  const objectStylesToKeep: KeyAndValueStrings = {};
  const objectCssVars: KeyAndValueStrings = {};

  /* Delete any unnecessary style if final rating will be half-filled */
  if (deservesHalfFill) {
    if (halfFillModeProp === 'box') {
      delete maybeArrayStyles.activeFillColor;
    } else {
      delete maybeArrayStyles.activeBoxColor;
    }
  }

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

  /* Delete any user-provided array and keep only string values*/
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
    objectStyles = { ...nonArrayStyles, ...(objectStylesToKeep as KeyAndValueStrings) };
  } else {
    objectStyles = { ...nonArrayStyles }; // To do: Tell TS that nonArrayStyles should not be AnyUserProvidedStyle type anymore
  }

  let className = '.rar--group {';

  // Easing ok
  if (objectStyles.easingValue) {
    const easingX = getEasingVar(objectStyles.easingValue);
    className = className.concat('', easingX);
    delete objectStyles.easingValue;
  }

  // Stroke ok
  if (objectStyles.itemStrokeWidth && isValidStroke(objectStyles.itemStrokeWidth)) {
    const strokeStyleX = setStrokeStylesX(objectStyles.itemStrokeStyle);
    className = className.concat('', strokeStyleX);

    setStrokeStyles(objectCssVars, objectStyles.itemStrokeStyle);
  } else {
    delete objectStyles.activeStrokeColor, objectStyles.inactiveStrokeColor;
  }
  delete objectStyles.itemStrokeStyle, objectStyles.itemStrokeWidth;

  Object.entries(objectStyles).forEach(([key, value], index) => {
    const cssVar = getColorsCssVars(key, value);
    className = className.concat('', cssVar);

    if (index === Object.entries(objectStyles).length - 1) {
      className = className.concat('', '}');
    }
  });

  console.log(className);

  Object.entries(objectStyles).forEach(([key, value]) => {
    if (typeof value === 'string') {
      setItemStylesCssVars(objectCssVars, key, value);
    }
  });

  return objectCssVars;
};

export const getArrayCssVars = (
  itemStylesProp: AnyUserProvidedStyle,
  currentSelectedIndex: number,
  highlightOnlySelected: RatingProps['highlightOnlySelected'],
  halfFillModeProp?: RatingProps['halfFillMode'],
  deservesHalfFill?: boolean
) => {
  const {
    activeFillColor,
    activeStrokeColor,
    activeBoxColor,
    activeBoxBorderColor,
    itemStrokeWidth,
  } = itemStylesProp;

  const arrayStyles: AnyUserProvidedStyle = {
    activeFillColor,
    activeStrokeColor,
    activeBoxColor,
    activeBoxBorderColor,
  };

  /* Delete unnecessary styles if final rating will be half-filled */
  if (deservesHalfFill) {
    if (halfFillModeProp === 'box') {
      delete arrayStyles.activeFillColor;
    } else {
      delete arrayStyles.activeBoxColor;
    }
  }

  /* Delete activeStroke color if unnecessary */
  if (isValidStroke(itemStrokeWidth)) {
    delete arrayStyles.activeStrokeColor;
  }

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

  const arrayStylesVars: KeyAndValueStrings = {};

  /* Get the value of any style at the same index as the current selected rating */
  Object.entries(arrayStyles).forEach(([key, value]) => {
    if (typeof value?.[currentSelectedIndex] === 'string') {
      setItemStylesCssVars(arrayStylesVars, key, value[currentSelectedIndex]);
    }
  });

  let cssVars: KeyAndValueStrings[];

  if (highlightOnlySelected) {
    cssVars = Array(currentSelectedIndex).fill({});
    cssVars.push(arrayStylesVars);
  } else {
    cssVars = Array(currentSelectedIndex + 1).fill(arrayStylesVars);
  }

  return cssVars;
};
