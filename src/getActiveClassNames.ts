import { NonNullProp, CSSClassName } from './internalTypes';
import { ActiveClassNames } from './constants';

export function getActiveClassNames(
	highlightOnlySelectedProp: NonNullProp<'highlightOnlySelected'>,
	items: NonNullProp<'items'>,
	selectedIndex: number
): CSSClassName[] {
	return Array.from({ length: items }, (_, index) => {
		if (!highlightOnlySelectedProp) {
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
