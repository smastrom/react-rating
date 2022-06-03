import { InputProps } from './types';

export const getTransitionClassNames = (
  transitionProp: NonNullable<InputProps['transition']>
): string => {
  switch (transitionProp) {
    case 'zoom':
      return 'rar--transition-zoom rar--transition-colors';
    case 'position':
      return 'rar--transition-position rar--transition-colors';
    case 'opacity':
      return 'rar--transition-opacity rar--transition-colors';
    case 'colors':
      return 'rar--transition-colors';
    default:
      return '';
  }
};
