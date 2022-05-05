export type SvgChildNodes = JSX.Element | JSX.Element[] | null;

type StrokeStyle = 'round' | 'sharp';

export type CSSVariables = {
  [key: string]: string;
};

export type ItemStylesProp = {
  /** JSX Element including the inner nodes of the SVG you want to display. */
  svgChildNodes?: SvgChildNodes;
  /** JSX Element including the inner nodes of the SVG you want to display. */
  itemStrokeWidth?: number;
  itemStrokeStyle?: StrokeStyle;
  activeItemColor?: string;
  activeItemStrokeColor?: string;
  activeBoxColor?: string;
  activeBoxBorderColor?: string;
  inactiveItemColor?: string;
  inactiveItemStrokeColor?: string;
  inactiveBoxColor?: string;
  inactiveBoxBorderColor?: string;
};

/** Those styles are considered "global" as they are not supposed to change for each rating item.
 * Their value must be assigned with a number representing the pixels value of each property.*/
type GlobalStyles = {
  /** Side margin between rating items */
  boxPadding?: number;
  /** Side margin between rating items */
  boxMargin?: number;
  /** Side margin between rating items */
  boxRadius?: number;
  /** Side margin between rating items */
  boxBorderWidth?: number;
};

export type Breakpoints = {
  [key: number]: GlobalStyles;
};

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
