import { Breakpoints } from './types';

export const getBreakpointRules = (breakpointsProp: Breakpoints): string => {
  let rulesArray: string[] = [];

  Object.entries(breakpointsProp).forEach(
    ([breakpointValue, styles], breakpointIndex) => {
      const isValidBreakpoint = Number.isInteger(Number.parseInt(breakpointValue));
      if (!isValidBreakpoint) {
        return;
      }

      let variablesValues = '';
      let mediaRule = '';
      const className = '.rri--radio-group {';

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
          case 'containerGap':
            breakpointProperty = `--rri--container-gap: ${value}px;`;
            break;
          case 'boxRadius':
            breakpointProperty = `--rri--box-radius: ${value}px;`;
            break;
          case 'boxBorder':
            breakpointProperty = `--rri--box-border-width: ${value}px;`;
            break;
          case 'boxPadding':
            breakpointProperty = `--rri--box-padding: ${value}px;`;
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
