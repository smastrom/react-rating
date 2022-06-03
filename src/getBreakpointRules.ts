import { GlobalStyles } from './getGlobalStylesCssVars';

const setBreakpointProperty = (property: string, value: number) => {
  switch (property) {
    case 'boxMargin':
      return `--rar--box-margin: ${value}px;`;
    case 'boxPadding':
      return `--rar--box-padding: ${value}px;`;
    case 'boxRadius':
      return `--rar--box-radius: ${value}px;`;
    case 'boxBorderWidth':
      return `--rar--box-border-width: ${value}px;`;
    default:
      return '';
  }
};

export const getBreakpointRules = ({
  breakpoints,
  boxMargin,
  boxRadius,
  boxPadding,
  boxBorderWidth,
}: Omit<GlobalStyles, 'orientation'>): string => {
  let rulesArray: string[] = [];

  const fullBreakpoints = { ...breakpoints };

  fullBreakpoints[0] = {
    boxMargin,
    boxRadius,
    boxPadding,
    boxBorderWidth,
  };

  Object.entries(fullBreakpoints).forEach(
    ([breakpointValue, styles], breakpointIndex) => {
      const breakpointNumVal = Number.parseInt(breakpointValue);
      const isInvalidBreakpoint = Number.isNaN(breakpointNumVal) || breakpointNumVal < 0;

      if (isInvalidBreakpoint) {
        return;
      }

      let variablesValues = '',
        mediaRule = '';
      const className = '.rar--group {';

      const isGlobalRule = breakpointIndex === 0;
      if (isGlobalRule) {
        mediaRule = className;
      } else {
        mediaRule = `@media(min-width: ${breakpointValue}px) { ${className}`;
      }

      const breakpointProperties = Object.entries(styles);
      if (breakpointProperties.length > 4) {
        return;
      }

      breakpointProperties.forEach(([property, value], index) => {
        if (typeof value !== 'number' || value < 0) {
          return;
        }

        const breakpointProperty = setBreakpointProperty(property, value);
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
