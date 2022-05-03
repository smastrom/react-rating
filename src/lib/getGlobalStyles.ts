import { RatingInputProps } from './types';
import { toKebabCase } from './utils';

export type GlobalStyles = Pick<
  RatingInputProps,
  | 'breakpoints'
  | 'boxRadius'
  | 'containerGap'
  | 'boxPadding'
  | 'boxBorderWidth'
  | 'direction'
>;

export const getGlobalStyles = (globalStyles: GlobalStyles) => {
  const globalInlineStyles = {};
  if (typeof globalStyles.breakpoints === 'undefined') {
    delete globalStyles.breakpoints;
    Object.entries(globalStyles).forEach(([key, value]) => {
      globalInlineStyles[`--rri--${toKebabCase(key)}`] = `${value}px`;
    });
    console.log(globalInlineStyles);
    return globalInlineStyles;
  }
  globalInlineStyles[`--rri--direction`] = globalStyles.direction;
  return globalInlineStyles;
};
