import { GlobalStyles } from './getGlobalStyles';

export const getBreakpointRules = ({
  breakpoints,
  boxMargin,
  boxRadius,
  boxBorderWidth,
  boxPadding,
}: Omit<GlobalStyles, 'orientation'>): string => {
  let rulesArray: string[] = [];

  const fullBreakpoints = { ...breakpoints };

  fullBreakpoints[0] = {
    boxMargin,
    boxRadius,
    boxBorderWidth,
    boxPadding,
  };

  Object.entries(fullBreakpoints).forEach(
    ([breakpointValue, styles], breakpointIndex) => {
      const breakpointNumVal = Number.parseInt(breakpointValue);
      const isInvalidBreakpoint = Number.isNaN(breakpointNumVal) || breakpointNumVal < 0;

      if (isInvalidBreakpoint) {
        return;
      }

      let variablesValues = '';
      let mediaRule = '';
      const className = '.rri--group {';

      const isGlobalRule = breakpointIndex === 0;
      if (isGlobalRule) {
        mediaRule = className;
      } else {
        mediaRule = `@media(min-width: ${breakpointValue}px) { ${className}`;
      }

      const breakpointProperties = Object.entries(styles);
      breakpointProperties.forEach(([property, value], index) => {
        if (typeof value !== 'number') {
          return;
        }

        let breakpointProperty: string = '';

        switch (property) {
          case 'boxMargin':
            breakpointProperty = `--rri--box-margin: ${value}px;`;
            break;
          case 'boxPadding':
            breakpointProperty = `--rri--box-padding: ${value}px;`;
            break;
          case 'boxRadius':
            breakpointProperty = `--rri--box-radius: ${value}px;`;
            break;
          case 'boxBorderWidth':
            breakpointProperty = `--rri--box-border-width: ${value}px;`;
        }

        variablesValues = variablesValues.concat('', breakpointProperty);
        if (index === breakpointProperties.length - 1) {
          const closingBracket = isGlobalRule ? '' : '}';
          const cssRule = `${mediaRule} ${variablesValues} } ${closingBracket}`;
          rulesArray.push(cssRule);
        }
      });
    }
  );
  const rulesAsString = rulesArray.toString().replaceAll(',', '').replaceAll(' ', '');
  return rulesAsString;
};
