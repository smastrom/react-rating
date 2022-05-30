export const getTransitionClasses = (transitionProp: string): string => {
  switch (transitionProp) {
    case 'zoom':
      return 'rri--transition-zoom rri--transition-colors';
    case 'position':
      return 'rri--transition-position rri--transition-colors';
    case 'opacity':
      return 'rri--transition-opacity rri--transition-colors';
    case 'colors':
      return 'rri--transition-colors';
    default:
      return '';
  }
};
