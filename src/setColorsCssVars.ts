import { CSSVariables } from './internalTypes';

const ACTIVE_FILL_COLOR_VAR = '--rr--fill-on-color';
const ACTIVE_BOX_COLOR_VAR = '--rr--box-on-color';
const ACTIVE_BORDER_COLOR_VAR = '--rr--border-on-color';
const ACTIVE_STROKE_COLOR_VAR = '--rr--stroke-on-color';

/* istanbul ignore next */
export function setDyamicCssVars(targetObj: CSSVariables, key: string, value: string) {
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
}

/* istanbul ignore next */
export function setColorCssVars(targetObj: CSSVariables, key: string, value: string) {
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
			targetObj['--rr--fill-off-color'] = value;
			break;
		case 'inactiveBoxColor':
			targetObj['--rr--box-off-color'] = value;
			break;
		case 'inactiveBoxBorderColor':
			targetObj['--rr--border-off-color'] = value;
			break;
		case 'inactiveStrokeColor':
			targetObj['--rr--stroke-off-color'] = value;
			break;
	}
}
