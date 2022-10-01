import { CSSClassName } from './internalTypes';
import { SharedProps } from './exportedTypes';

export function getActiveClassNames(
	highlightOnlySelectedProp: NonNullable<SharedProps['highlightOnlySelected']>,
	items: number,
	selectedIndex: number
): CSSClassName[] {
	return new Array(items).fill(undefined).map((_, index) => {
		if (highlightOnlySelectedProp === false) {
			if (index <= selectedIndex) {
				return 'rr--on';
			}
			return 'rr--off';
		}
		if (index === selectedIndex) {
			return 'rr--on';
		}
		return 'rr--off';
	});
}
