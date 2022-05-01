import { BoxStylesBreakpoints } from './types';

export const getBreakpointRules = (
  breakpointsProp: BoxStylesBreakpoints
): string | undefined => {
  let rulesArray: string[] = [];

  Object.entries(breakpointsProp).forEach(([breakpointValue, styles]) => {
    const mediaRule = `@media(min-width: ${breakpointValue}px) { .react-rating-input-radio-group {`;
    let variablesValues = '';
    const breakpointProperties = Object.entries(styles);

    breakpointProperties.forEach(([property, value], index) => {
      let breakpointProperty: string = '';
      switch (property) {
        case 'boxRadius':
          breakpointProperty = `--react-rating-input-box-radius: ${value}px !important;`;
          break;
        case 'boxBorder':
          breakpointProperty = `--react-rating-input-box-border-width: ${value}px !important;`;
          break;
        case 'boxPadding':
          breakpointProperty = `--react-rating-input-box-padding: ${value}px !important;`;
          break;
        case 'boxGap':
          breakpointProperty = `--react-rating-input-box-gap: ${value}px !important;`;
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
