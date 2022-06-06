import { MaybeInvalidBreakPoints } from './types';

export const getCssVarString = (key: string, value: number) => {
  if (typeof value !== 'number' || value < 0) {
    return '';
  }
  switch (key) {
    case 'boxMargin':
      return `--rar--box-margin: ${value}px !important;`;
    case 'boxPadding':
      return `--rar--box-padding: ${value}px !important;`;
    case 'boxRadius':
      return `--rar--box-radius: ${value}px !important;`;
    case 'boxBorderWidth':
      return `--rar--box-border-width: ${value}px !important;`;
    default:
      return '';
  }
};

export const getBreakpointRules = (
  uniqueId: string = '',
  breakpoints: MaybeInvalidBreakPoints
): string => {
  let mediaRules: string[] = [];

  Object.entries(breakpoints).forEach(([breakpointValue, styles]) => {
    const breakpointNumericValue = Number.parseInt(breakpointValue);
    const breakpointSign = Math.sign(breakpointNumericValue);
    if (breakpointSign !== 1) {
      return;
    }

    let variablesValues = '';
    const mediaRule = `@media (min-width: ${breakpointValue}px) { .rar--${uniqueId} {`;

    const boxStylesProperties = Object.entries(styles);
    boxStylesProperties.forEach(([property, value], index) => {
      if (typeof value !== 'number') {
        return;
      }

      const breakpointProperty = getCssVarString(property, value);
      variablesValues = variablesValues.concat('', breakpointProperty);

      if (index === boxStylesProperties.length - 1) {
        const cssRule = `${mediaRule} ${variablesValues} } }`;
        mediaRules.push(cssRule);
      }
    });
  });

  const rulesAsString = mediaRules.toString().replaceAll(',', '').replaceAll(' ', '');
  return rulesAsString;
};
