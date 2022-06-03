import { BoxStyles, KeyAndValueStrings, RatingProps } from './types';

export type GlobalStyles = BoxStyles & Pick<RatingProps, 'breakpoints' | 'orientation'>;

const setGlobalStylesCssVars = (
  targetObj: KeyAndValueStrings,
  key: string,
  value: number
) => {
  if (typeof value !== 'number' || value < 0) {
    return;
  }
  switch (key) {
    case 'boxMargin':
      targetObj['--rar--box-margin'] = `${value}px`;
      break;
    case 'boxPadding':
      targetObj['--rar--box-padding'] = `${value}px`;
      break;
    case 'boxRadius':
      targetObj['--rar--box-radius'] = `${value}px`;
      break;
    case 'boxBorderWidth':
      targetObj['--rar--box-border-width'] = `${value}px`;
  }
};

// To do: get orientationVar e getBoxStyles

export const getGlobalStylesCssVars = (globalStyles: GlobalStyles) => {
  const globalInlineStyles: KeyAndValueStrings = {};

  if (typeof globalStyles.breakpoints === 'undefined') {
    delete globalStyles.breakpoints;
    Object.entries(globalStyles).forEach(([key, value]) => {
      if (key === 'orientation') {
        globalInlineStyles['--rar--orientation'] =
          value === 'vertical' ? 'column' : 'row';
        return;
      }
      setGlobalStylesCssVars(globalInlineStyles, key, value as number);
    });

    return globalInlineStyles;
  }

  globalInlineStyles['--rar--orientation'] =
    globalStyles.orientation === 'vertical' ? 'column' : 'row';

  return globalInlineStyles;
};
