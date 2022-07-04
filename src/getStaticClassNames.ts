import { CSSClassName, MaybeEmptyCSSClassName } from './internalTypes';

const BASE_TRANSITION: CSSClassName = 'rar--fx-colors';

/* istanbul ignore next */
export const getTransitionClassNames = (transitionProp: string): MaybeEmptyCSSClassName => {
  switch (transitionProp) {
    case 'zoom':
      return `rar--fx-zoom ${BASE_TRANSITION}`;
    case 'position':
      return `rar--fx-position ${BASE_TRANSITION}`;
    case 'opacity':
      return `rar--fx-opacity ${BASE_TRANSITION}`;
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
      return 'rar--rx-sm';
    case 'medium':
      return 'rar--rx-md';
    case 'large':
      return 'rar--rx-lg';
    case 'full':
      return 'rar--rx-full';
    default:
      return '';
  }
};

/* istanbul ignore next */
export const getGapClassName = (gapProp: string): MaybeEmptyCSSClassName => {
  switch (gapProp) {
    case 'small':
      return 'rar--gap-sm';
    case 'medium':
      return 'rar--gap-md';
    case 'large':
      return 'rar--gap-lg';
    default:
      return '';
  }
};

/* istanbul ignore next */
export const getPaddingClassName = (paddingProp: string): MaybeEmptyCSSClassName => {
  switch (paddingProp) {
    case 'small':
      return 'rar--space-sm';
    case 'medium':
      return 'rar--space-md';
    case 'large':
      return 'rar--space-lg';
    default:
      return '';
  }
};
