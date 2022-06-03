import { ItemStylesProp, KeyAndValueStrings } from './types';
import { isValidColor, isValidTransition } from './utils';

export const setItemStylesCssVars = (
  targetObj: KeyAndValueStrings,
  key: string,
  value: string
): void => {
  if (key === 'customEasing') {
    if (isValidTransition(value)) {
      targetObj['--rar--easing'] = value;
      return;
    }
    targetObj['--rar--easing'] = '150ms ease-out';
    return;
  }
  if (!isValidColor(value)) {
    return;
  }
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

export const getEasingVar = (easingProp: string) => {
  if (isValidTransition(easingProp)) {
    return `--rar--easing: ${easingProp};`;
  }
  return `--rar--easing: 150ms ease-out;`;
};

export const getColorsCssVars = (key: string, value: string): string => {
  if (!isValidColor(value)) {
    return '';
  }
  switch (key) {
    case 'activeFillColor':
      return `--rar--fill-on-color: ${value};`;
    case 'activeBoxColor':
      return `--rar--box-on-color: ${value};`;
    case 'activeBoxBorderColor':
      return `--rar--border-on-color: ${value};`;
    case 'activeStrokeColor':
      return `--rar--stroke-on-color: ${value};`;
    case 'inactiveFillColor':
      return `--rar--fill-off-color: ${value};`;
    case 'inactiveBoxColor':
      return `--rar--box-off-color: ${value};`;
    case 'inactiveBoxBorderColor':
      return `--rar--border-off-color: ${value};`;
    case 'inactiveStrokeColor':
      return `--rar--stroke-off-color: ${value};`;
    default:
      return '';
  }
};
