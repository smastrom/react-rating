import { TabIndex } from './internalTypes';

export function getTabIndex(items: number, currentSelectedIndex: number): TabIndex[] {
	return Array.from({ length: items }, (_, index) => {
		if (currentSelectedIndex === -1 || currentSelectedIndex === 0) {
			if (index === 0) {
				return 0;
			}
			return -1;
		}
		if (currentSelectedIndex > 0) {
			if (index === currentSelectedIndex) {
				return 0;
			}
			return -1;
		}
	}) as TabIndex[];
}
