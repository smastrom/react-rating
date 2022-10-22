import { TabIndex } from './internalTypes';

export function getTabIndex(items: number, selectedIndex: number): TabIndex[] {
	return Array.from({ length: items }, (_, index) => {
		if (selectedIndex === -1 || selectedIndex === 0) {
			if (index === 0) {
				return 0;
			}
			return -1;
		}
		if (selectedIndex > 0) {
			if (index === selectedIndex) {
				return 0;
			}
			return -1;
		}
	}) as TabIndex[];
}
