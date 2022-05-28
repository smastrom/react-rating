export const getActiveClassNames = (
  highlightOnlySelectedProp: boolean,
  ratingValues: number[],
  selectedIndex: number
) =>
  ratingValues.map((_, index) => {
    if (highlightOnlySelectedProp === false) {
      if (index <= selectedIndex) {
        return 'rri--active';
      }
      return 'rri--inactive';
    }
    if (index === selectedIndex) {
      return 'rri--active';
    }
    return 'rri--inactive';
  });
