import { setColorCssVars } from './setColorsCssVars';

import { ItemStylesProp } from './exportedTypes';
import { CSSVariables, StaticColors } from './internalTypes';

export const getStaticCssVars = (
  staticColors: StaticColors,
  boxBorderWidth: NonNullable<ItemStylesProp['boxBorderWidth']>
): CSSVariables => {
  const cssVars: CSSVariables = {};

  if (typeof boxBorderWidth === 'number' && boxBorderWidth > 0) {
    cssVars['--rar--border-width'] = `${boxBorderWidth}px`;
  }

  const colorsEntries = Object.entries(staticColors);

  colorsEntries.length > 0 &&
    colorsEntries.forEach(([key, value]) => {
      setColorCssVars(cssVars, key, value as string);
    });

  return cssVars;
};
