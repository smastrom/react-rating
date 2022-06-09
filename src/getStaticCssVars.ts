import { setColorCssVars } from './setColorsCssVars';

import { RatingProps, ItemStylesProp } from './exportedTypes';
import { CSSVariables, StaticColors } from './internalTypes';

export const getStaticCssVars = (
  staticColors: StaticColors,
  boxBorderWidth: NonNullable<ItemStylesProp['boxBorderWidth']>,
  itemStrokeWidth: NonNullable<ItemStylesProp['itemStrokeWidth']>,
  deservesHalfFill: boolean,
  halfFillModeProp: RatingProps['halfFillMode']
): CSSVariables => {
  const cssVars: CSSVariables = {};

  if (typeof boxBorderWidth === 'number' && boxBorderWidth > 0) {
    cssVars['--rar--border-width'] = `${boxBorderWidth}px`;
  }

  if (deservesHalfFill) {
    if (halfFillModeProp === 'box') {
      delete staticColors.activeFillColor;
    } else {
      delete staticColors.activeBoxColor;
    }
  }

  if (itemStrokeWidth === 0) {
    delete staticColors.activeStrokeColor;
    delete staticColors.inactiveStrokeColor;
  }

  Object.entries(staticColors).forEach(([key, value]) => {
    setColorCssVars(cssVars, key, value as string);
  });

  return cssVars;
};
