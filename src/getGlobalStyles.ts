import { CSSVariables, RatingProps } from './types';

export type GlobalStyles = Pick<
  RatingProps,
  | 'boxRadius'
  | 'boxMargin'
  | 'boxPadding'
  | 'boxBorderWidth'
  | 'breakpoints'
  | 'orientation'
>;

const getGlobalStylesVars = (targetObj: CSSVariables, key: string, value: number) => {
  if (typeof value !== 'number') {
    return;
  }
  switch (key) {
    case 'boxMargin':
      targetObj['--rri--box-margin'] = `${value}px`;
      break;
    case 'boxPadding':
      targetObj['--rri--box-padding'] = `${value}px`;
      break;
    case 'boxRadius':
      targetObj['--rri--box-radius'] = `${value}px`;
      break;
    case 'boxBorderWidth':
      targetObj['--rri--box-border-width'] = `${value}px`;
  }
};

export const getGlobalStyles = (globalStyles: GlobalStyles) => {
  const globalInlineStyles: CSSVariables = {};

  if (typeof globalStyles.breakpoints === 'undefined') {
    delete globalStyles.breakpoints;
    Object.entries(globalStyles).forEach(([key, value]) => {
      if (key === 'orientation') {
        globalInlineStyles['--rri--orientation'] =
          value === 'vertical' ? 'column' : 'row';
        return;
      }
      getGlobalStylesVars(globalInlineStyles, key, value as number);
    });

    return globalInlineStyles;
  }

  globalInlineStyles['--rri--orientation'] =
    globalStyles.orientation === 'vertical' ? 'column' : 'row';

  return globalInlineStyles;
};
