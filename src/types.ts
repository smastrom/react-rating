type StrokeStyle = 'round' | 'sharp';

export type CSSVariables = {
  [key: string]: string;
};

export type ItemStylesProp = {
  /** JSX Element including the inner nodes of the SVG you want to display. */
  svgChildNodes: JSX.Element;
  /** JSX Element including the inner nodes of the SVG you want to display. */
  itemStrokeWidth?: number;
  itemStrokeStyle?: StrokeStyle;

  activeItemColor: string;
  activeItemStrokeColor?: string;
  activeBoxColor?: string;
  activeBoxBorderColor?: string;

  inactiveItemColor: string;
  inactiveItemStrokeColor?: string;
  inactiveBoxColor?: string;
  inactiveBoxBorderColor?: string;
};

/** Those styles are considered "global" as they are not supposed to change for each rating item.
 * Their value must be expressed with an integer representing the number of pixels. Those values
 * can also be customized for different breakpoints as well. Please refer to README.md at
 * https://google.com for more infos.
 */
type GlobalStyles = {
  /** Integer representing the number of pixels of the right-side margin between the rating items.*/
  boxMargin?: number;
  /** Integer representing the padding in pixels between the rating item and the box bounds. */
  boxPadding?: number;
  /** Integer representing the border radius of the box in pixels. */
  boxRadius?: number;
  /** Integer representing the box border width in pixels. */
  boxBorderWidth?: number;
};

/** Customize boxMargin, boxPadding, boxRadius and boxBorderWidth for different breakpoints.
 * Refer to README.md at https://google.com for more infos.
 */
export type Breakpoints = {
  [key: number]: GlobalStyles;
};

/** Maximum number of rating items to display. Should be an integer from 1 to 10. */
type Limit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type RatingInputProps = GlobalStyles & {
  /** Maximum number of rating items to display. Should be an integer between 1 and 10. */
  onChange: (currentValue: number) => void | undefined;
  /** Maximum number of rating items to display. Should be an integer between 1 and 10. */
  limit: Limit;
  ratingValue: number | null;
  customAccessibleLabels?: string[];
  orientation: 'horizontal' | 'vertical';

  highlightOnlySelected?: boolean;
  enableKeyboard?: boolean;

  itemStyles?: ItemStylesProp | ItemStylesProp[];
  breakpoints?: Breakpoints;

  ref?: HTMLDivElement;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  ariaLabelledBy?: string;
};

export type RatingProps = Pick<
  RatingInputProps,
  'limit' | 'ratingValue' | 'ref' | 'id' | 'className' | 'style'
>;
