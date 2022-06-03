export type SvgChildNodes = JSX.Element | JSX.Element[];

export type ItemStylesProp = {
  svgChildNodes: SvgChildNodes;
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

/** Their value must be expressed with an integer representing the number of pixels. Those values
 * can also be customized for different breakpoints as well. Please refer to README.md at
 * https://google.com for more infos.
 */
export type BoxStyles = {
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

export type KeyAndValueStrings = {
  [key: string]: string;
};

/** Those props are always injected whether readOnly equals to false or not. */
export type SharedProps = {
  value: number;
  readOnly: boolean;
  /** An integer between 1 and 10 representing the number of rating items to display. */
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
export type ReadOnlyProps = {
  halfFillMode?: 'svg' | 'box';
  accessibleLabel?: string;
};

/** Those props are injected only if readOnly equals to false. */
export type InputProps = {
  onChange: (value: number) => void | undefined;
  onHoverChange: (value: number) => void | undefined;
  enableKeyboard?: boolean;
  labelledBy?: string;
  accessibleLabels?: string[];
  transition?: 'colors' | 'zoom' | 'position' | 'opacity' | 'none';
  customEasing?: string;
};

export type RatingProps = SharedProps & ReadOnlyProps & BoxStyles & InputProps;

export type ItemStylesForCss = Omit<ItemStylesProp, 'svgChildNodes'>;
