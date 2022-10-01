import { roundToHalf } from './utils';
import { CSSClassName } from './internalTypes';
import { ReadOnlyProps } from './exportedTypes';

export function getHalfFillClassNames(
	ratingValue: number,
	items: number,
	absoluteHalfFillMode: NonNullable<ReadOnlyProps['halfFillMode']>
): CSSClassName[] {
	const intersectionIndex = Math.floor(roundToHalf(ratingValue));

	return new Array(items).fill(undefined).map((_, index) => {
		if (absoluteHalfFillMode === 'box') {
			if (index > intersectionIndex) {
				return 'rr--hf-box-off';
			}
			if (index === intersectionIndex) {
				return 'rr--hf-box-int';
			}
			return 'rr--hf-box-on';
		}
		if (index > intersectionIndex) {
			return 'rr--hf-svg-off';
		}
		return 'rr--hf-svg-on';
	});
}
