export const getActiveClassNames = (
  isExclusive: boolean,
  ratingValues: string[] | number[],
  selectedIndex: number
) =>
  ratingValues.map((_, index) => {
    if (isExclusive === false) {
      if (index <= selectedIndex) {
        return 'rri--active';
      }
      return 'rri--inactive';
    }
    if (isExclusive === true) {
      if (index === selectedIndex) {
        return 'rri--active';
      }
      return 'rri--inactive';
    }
  });
