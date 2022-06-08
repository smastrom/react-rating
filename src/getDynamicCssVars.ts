import { setDyamicCssVars } from './setColorsCssVars';

import { ItemStylesProp, MaybeArrayColors, RatingProps } from './exportedTypes';
import { CSSVariables, RequireAtLeastOne } from './internalTypes';

type ValidArrayColors = {
  [key in keyof MaybeArrayColors]: string[];
};

type AbsoluteHalfFill = NonNullable<RatingProps['halfFillMode']>;

export const getDynamicCssVars = (
  arrayColors: RequireAtLeastOne<ValidArrayColors>,
  itemStrokeWidth: NonNullable<ItemStylesProp['itemStrokeWidth']>,
  currentSelectedIndex: number,
  highlightOnlySelected: NonNullable<RatingProps['highlightOnlySelected']>,
  halfFillModeProp?: RatingProps['halfFillMode'],
  deservesHalfFill?: boolean
): CSSVariables[] => {
  if (deservesHalfFill) {
    if ((halfFillModeProp as AbsoluteHalfFill) === 'box') {
      delete arrayColors.activeFillColor;
    } else {
      delete arrayColors.activeBoxColor;
    }
  }

  if (Object.keys(arrayColors).length === 0) {
    return [];
  }

  if (itemStrokeWidth >= 0) {
    delete arrayColors.activeStrokeColor;
  }

  if (Object.keys(arrayColors).length === 0) {
    return [];
  }

  const arrayStylesVars: CSSVariables = {};

  Object.entries(arrayColors).forEach(([key, color]) =>
    setDyamicCssVars(arrayStylesVars, key, color[currentSelectedIndex])
  );

  let cssVars: CSSVariables[];

  if (highlightOnlySelected) {
    cssVars = Array(currentSelectedIndex).fill({});
    cssVars.push(arrayStylesVars);
  } else {
    cssVars = Array(currentSelectedIndex + 1).fill(arrayStylesVars);
  }

  return cssVars;
};
