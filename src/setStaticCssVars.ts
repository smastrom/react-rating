import { CSSVariables } from './types';

// To do: add fallbacks values to vars in stylesheet, in stylesheet
export const setBoxStylesCssVars = (
  targetObj: CSSVariables,
  key: string,
  value: number
): void => {
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

export const setDyamicCssVars = (
  targetObj: CSSVariables,
  key: string,
  value: string
): void => {
  switch (key) {
    case 'activeFillColor':
      targetObj['--rar--fill-on-color'] = value;
      break;
    case 'activeBoxColor':
      targetObj['--rar--box-on-color'] = value;
      break;
    case 'activeBoxBorderColor':
      targetObj['--rar--border-on-color'] = value;
      break;
    case 'activeStrokeColor':
      targetObj['--rar--stroke-on-color'] = value;
  }
};

export const setColorCssVars = (targetObj: CSSVariables, key: string, value: string): void => {
  switch (key) {
    case 'activeFillColor':
      targetObj['--rar--fill-on-color'] = value;
      break;
    case 'activeBoxColor':
      targetObj['--rar--box-on-color'] = value;
      break;
    case 'activeBoxBorderColor':
      targetObj['--rar--border-on-color'] = value;
      break;
    case 'activeStrokeColor':
      targetObj['--rar--stroke-on-color'] = value;
      break;
    case 'inactiveFillColor':
      targetObj['--rar--fill-off-color'] = value;
      break;
    case 'inactiveBoxColor':
      targetObj['--rar--box-off-color'] = value;
      break;
    case 'inactiveBoxBorderColor':
      targetObj['--rar--border-off-color'] = value;
      break;
    case 'inactiveStrokeColor':
      targetObj['--rar--stroke-off-color'] = value;
  }
};
