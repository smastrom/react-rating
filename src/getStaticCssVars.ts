import { setBoxStylesCssVars, setColorCssVars } from './setStaticCssVars';

import { CSSVariables, RatingProps, MergedStyles } from './types';

export const getStaticCssVars = (
  mergedStyles: MergedStyles,
  deservesHalfFill: boolean,
  halfFillModeProp: RatingProps['halfFillMode']
): CSSVariables => {
  const cssVars: CSSVariables = {};

  Object.entries(mergedStyles.boxStyles).forEach(([key, value]) => {
    if (typeof value !== 'number') {
      return;
    }
    setBoxStylesCssVars(cssVars, key, value);
  });

  if (deservesHalfFill) {
    if (halfFillModeProp === 'box') {
      delete mergedStyles.colors.activeFillColor;
    } else {
      delete mergedStyles.colors.activeBoxColor;
    }
  }

  Object.entries(mergedStyles.colors).forEach(([key, value]) => {
    setColorCssVars(cssVars, key, value as string);
  });

  return cssVars;
};
