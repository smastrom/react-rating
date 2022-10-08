import { NonNullProp, CSSClassName } from './internalTypes';
import { ActiveClassNames } from './constants';

export function getActiveClassNames(
	highlightOnlySelectedProp: NonNullProp<'highlightOnlySelected'>,
	items: NonNullProp<'items'>,
	selectedIndex: number
): CSSClassName[] {
	return new Array(items).fill(undefined).map((_, index) => {
		if (highlightOnlySelectedProp === false) {
			if (index <= selectedIndex) {
				return ActiveClassNames.ON;
			}
			return ActiveClassNames.OFF;
		}
		if (index === selectedIndex) {
			return ActiveClassNames.ON;
		}
		return ActiveClassNames.OFF;
	});
}
