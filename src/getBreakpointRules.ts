import { GlobalStyles } from './getGlobalStyles';
import { toKebabCase } from './utils';

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
      const breakpointSign = Math.sign(Number.parseInt(breakpointValue));
      const isValidBreakpoint = breakpointSign === 1 || breakpointSign === 0;

      if (!isValidBreakpoint) {
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
        const breakpointProperty = `--rri--${toKebabCase(property)}: ${value}px;`;
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
