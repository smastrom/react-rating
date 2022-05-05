import { toKebabCase } from './utils';

import { CSSVariables, RatingInputProps } from './types';

export type GlobalStyles = Pick<
  RatingInputProps,
  | 'breakpoints'
  | 'boxRadius'
  | 'boxMargin'
  | 'boxPadding'
  | 'boxBorderWidth'
  | 'orientation'
>;

export const getGlobalStyles = (globalStyles: GlobalStyles) => {
  const globalInlineStyles: CSSVariables = {};

  if (typeof globalStyles.breakpoints === 'undefined') {
    delete globalStyles.breakpoints;
    Object.entries(globalStyles).forEach(([key, value]) => {
      if (key === 'orientation') {
        globalInlineStyles['--rri--orientation'] =
          value === 'vertical' ? 'column' : 'row';
      } else {
        globalInlineStyles[`--rri--${toKebabCase(key)}`] = `${value}px`;
      }
    });

    return globalInlineStyles;
  }

  globalInlineStyles['--rri--orientation'] =
    globalStyles.orientation === 'vertical' ? 'column' : 'row';

  return globalInlineStyles;
};
