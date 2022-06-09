import { CSSVariables } from './internalTypes';

const ACTIVE_FILL_COLOR_VAR = '--rar--fill-on-color';
const ACTIVE_BOX_COLOR_VAR = '--rar--box-on-color';
const ACTIVE_BORDER_COLOR_VAR = '--rar--border-on-color';
const ACTIVE_STROKE_COLOR_VAR = '--rar--stroke-on-color';

export const setDyamicCssVars = (
  targetObj: CSSVariables,
  key: string,
  value: string
): void => {
  switch (key) {
    case 'activeFillColor':
      targetObj[ACTIVE_FILL_COLOR_VAR] = value;
      break;
    case 'activeBoxColor':
      targetObj[ACTIVE_BOX_COLOR_VAR] = value;
      break;
    case 'activeBoxBorderColor':
      targetObj[ACTIVE_BORDER_COLOR_VAR] = value;
      break;
    case 'activeStrokeColor':
      targetObj[ACTIVE_STROKE_COLOR_VAR] = value;
      break;
  }
};

export const setColorCssVars = (targetObj: CSSVariables, key: string, value: string): void => {
  switch (key) {
    case 'activeFillColor':
      targetObj[ACTIVE_FILL_COLOR_VAR] = value;
      break;
    case 'activeBoxColor':
      targetObj[ACTIVE_BOX_COLOR_VAR] = value;
      break;
    case 'activeBoxBorderColor':
      targetObj[ACTIVE_BORDER_COLOR_VAR] = value;
      break;
    case 'activeStrokeColor':
      targetObj[ACTIVE_STROKE_COLOR_VAR] = value;
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
      break;
  }
};
