export type ItemStylesProp = {
  svgChildNodes: JSX.Element | JSX.Element[];
  itemStrokeWidth?: number;
  itemStrokeStyle?: 'round' | 'sharp';

  activeFillColor?: string | string[];
  activeStrokeColor?: string | string[];
  activeBoxColor?: string | string[];
  activeBoxBorderColor?: string | string[];

  inactiveFillColor?: string;
  inactiveStrokeColor?: string;
  inactiveBoxColor?: string;
  inactiveBoxBorderColor?: string;
};

/** Those styles are considered "global" as they are not supposed to change for each rating item.
 * Their value must be expressed with an integer representing the number of pixels. Those values
 * can also be customized for different breakpoints as well. Please refer to README.md at
 * https://google.com for more infos.
 */
type BoxStyles = {
  // Rename to boxStyles
  /** Integer representing the number of pixels of the right-side margin between the rating items.*/
  boxMargin?: number;
  /** Integer representing the padding in pixels between the rating item and the box bounds. */
  boxPadding?: number;
  /** Integer representing the border radius of the box in pixels. */
  boxRadius?: number;
  /** Integer representing the border radius of the box in pixels. */
  boxBorderWidth?: number;
};

/** Customize boxMargin, boxPadding, boxRadius and boxBorderWidth for different breakpoints.
 * Refer to README.md at https://google.com for more infos.
 */
export type Breakpoints = {
  [key: number]: BoxStyles;
};

export type CSSVariables = {
  [key: string]: string;
};

/** Those props are always injected wheter readOnly equals to false or not. */
type SharedProps = {
  ratingValue: number;
  readOnly: boolean;
  /** Maximum number of rating items to display. Should be an integer between 1 and 10. */
  limit: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  highlightOnlySelected?: boolean;
  orientation: 'horizontal' | 'vertical';
  itemStyles?: ItemStylesProp;
  breakpoints?: Breakpoints;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
};

/** Those props are injected only if readOnly equals to true. */
type ReadOnlyProps = {
  halfPrecisionFillMode: 'svg' | 'box';
  accessibleLabel: string;
};

/** Those props are injected only if readOnly equals to false. */
type InputProps = {
  onChange: (value: number) => void | undefined;
  onHoverChange: (value: number) => void | undefined;
  enableKeyboard?: boolean;
  labelledBy?: string;
  customAccessibleLabels?: string[];
  transition?: 'colors' | 'zoom' | 'position' | 'none';
  customEasing?: string;
};

export type RatingProps = SharedProps & ReadOnlyProps & BoxStyles & InputProps;
