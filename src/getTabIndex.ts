import { TabIndex } from './internalTypes';

export const getTabIndex = (items: number, currentSelectedIndex: number) => {
	const tabIndexArray = Array(items)
		.fill(undefined)
		.map((_, index) => {
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
		});
	return tabIndexArray as TabIndex[];
};
