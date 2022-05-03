export const getActiveClassNames = (
  ratingValues: string[] | number[],
  selectedIndex: number
) =>
  ratingValues.map((_, index) => {
    if (index <= selectedIndex) {
      return 'rri--active';
    }
    return 'rri--inactive';
  });
