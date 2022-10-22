import { CSSVariables } from './internalTypes';
import { ActiveColorProps, InactiveColorProps, ActiveVars, InactiveVars } from './constants';

/* c8 ignore next */
export function setDyamicCssVars(targetObj: CSSVariables, key: string, value: string) {
	switch (key) {
		case ActiveColorProps.FILL:
			targetObj[ActiveVars.FILL] = value;
			return true;
		case ActiveColorProps.BOX:
			targetObj[ActiveVars.BOX] = value;
			return true;
		case ActiveColorProps.BORDER:
			targetObj[ActiveVars.BORDER] = value;
			return true;
		case ActiveColorProps.STROKE:
			targetObj[ActiveVars.STROKE] = value;
			return true;
	}
	return false;
}

/* c8 ignore next */
export function setColorCssVars(targetObj: CSSVariables, key: string, value: string) {
	const isActive = setDyamicCssVars(targetObj, key, value);
	if (!isActive) {
		switch (key) {
			case InactiveColorProps.FILL:
				targetObj[InactiveVars.FILL] = value;
				break;
			case InactiveColorProps.BOX:
				targetObj[InactiveVars.BOX] = value;
				break;
			case InactiveColorProps.BORDER:
				targetObj[InactiveVars.BORDER] = value;
				break;
			case InactiveColorProps.STROKE:
				targetObj[InactiveVars.STROKE] = value;
				break;
		}
	}
}
