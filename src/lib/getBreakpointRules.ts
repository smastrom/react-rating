import { BoxStylesBreakpoints } from './types';

export const getBreakpointRules = (
  breakpointsProp: BoxStylesBreakpoints
): string | undefined => {
  let rulesArray: string[] = [];

  Object.entries(breakpointsProp).forEach(([breakpointValue, styles]) => {
    const mediaRule = `@media(min-width: ${breakpointValue}px) { .rri--radio-group {`;
    let variablesValues = '';
    const breakpointProperties = Object.entries(styles);

    breakpointProperties.forEach(([property, value], index) => {
      let breakpointProperty: string = '';
      switch (property) {
        case 'containerGap':
          breakpointProperty = `--rri--container-gap: ${value}px !important;`;
          break;
        case 'boxRadius':
          breakpointProperty = `--rri--box-radius: ${value}px !important;`;
          break;
        case 'boxBorder':
          breakpointProperty = `--rri--box-border-width: ${value}px !important;`;
          break;
        case 'boxPadding':
          breakpointProperty = `--rri--box-padding: ${value}px !important;`;
      }
      variablesValues = variablesValues.concat('', breakpointProperty);
      if (index === breakpointProperties.length - 1) {
        const cssRule = `${mediaRule} ${variablesValues} } }`;
        rulesArray.push(cssRule);
      }
    });
  });
  const rulesAsString = rulesArray.toString().replaceAll(',', '').replaceAll(' ', '');
  return rulesAsString;
};
