import { CSSClassName, MaybeEmptyCSSClassName } from './internalTypes';

const BASE_TRANSITION: CSSClassName = 'rr--fx-colors';

/* istanbul ignore next */
export const getTransitionClassNames = (transitionProp: string): MaybeEmptyCSSClassName => {
	switch (transitionProp) {
		case 'zoom':
			return `rr--fx-zoom ${BASE_TRANSITION}`;
		case 'position':
			return `rr--fx-position ${BASE_TRANSITION}`;
		case 'opacity':
			return `rr--fx-opacity ${BASE_TRANSITION}`;
		case 'colors':
			return BASE_TRANSITION;
		default:
			return '';
	}
};

/* istanbul ignore next */
export const getRadiusClassName = (radiusProp: string): MaybeEmptyCSSClassName => {
	switch (radiusProp) {
		case 'small':
			return 'rr--rx-sm';
		case 'medium':
			return 'rr--rx-md';
		case 'large':
			return 'rr--rx-lg';
		case 'full':
			return 'rr--rx-full';
		default:
			return '';
	}
};

/* istanbul ignore next */
export const getGapClassName = (gapProp: string): MaybeEmptyCSSClassName => {
	switch (gapProp) {
		case 'small':
			return 'rr--gap-sm';
		case 'medium':
			return 'rr--gap-md';
		case 'large':
			return 'rr--gap-lg';
		default:
			return '';
	}
};

/* istanbul ignore next */
export const getPaddingClassName = (paddingProp: string): MaybeEmptyCSSClassName => {
	switch (paddingProp) {
		case 'small':
			return 'rr--space-sm';
		case 'medium':
			return 'rr--space-md';
		case 'large':
			return 'rr--space-lg';
		default:
			return '';
	}
};
