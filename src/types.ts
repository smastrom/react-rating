export type ItemStylesProp = {
  svgChildNodes: JSX.Element | JSX.Element[];
  itemStrokeWidth?: number;
  itemStrokeStyle?: 'round' | 'sharp';

  activeFillColor?: string | string[];
  activeStrokeColor?: string | string[];
  inactiveFillColor?: string;
  inactiveStrokeColor?: string;

  activeBoxColor?: string | string[];
  inactiveBoxColor?: string;
};

/** Those styles are considered "global" as they are not supposed to change for each rating item.
 * Their value must be expressed with an integer representing the number of pixels. Those values
 * can also be customized for different breakpoints as well. Please refer to README.md at
 * https://google.com for more infos.
 */
type GlobalStyles = {
  // Rename to boxStyles
  /** Integer representing the number of pixels of the right-side margin between the rating items.*/
  boxMargin?: number;
  /** Integer representing the padding in pixels between the rating item and the box bounds. */
  boxPadding?: number;
  /** Integer representing the border radius of the box in pixels. */
  boxRadius?: number;
};

/** Customize boxMargin, boxPadding, boxRadius and boxBorderWidth for different breakpoints.
 * Refer to README.md at https://google.com for more infos.
 */
export type Breakpoints = {
  [key: number]: GlobalStyles;
};

type SharedProps = {
  ratingValue: number;
  /** Maximum number of rating items to display. Should be an integer between 1 and 10. */
  limit: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  highlightOnlySelected?: boolean;
  orientation: 'horizontal' | 'vertical';
  itemStyles?: ItemStylesProp;
  breakpoints?: Breakpoints;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  /** Wheter to fill with active colors the svg or the box when hovering/selecting. */
  fillMode?: 'svg' | 'box';
};

export type RatingInputProps = GlobalStyles &
  SharedProps & {
    onChange: (currentValue: number) => void | undefined;
    onHoverChange: (hoveredValue: number) => void | undefined;
    enableKeyboard?: boolean;
    labelledBy?: string;
    customAccessibleLabels?: string[];
    transition?: 'colors' | 'zoom' | 'position' | 'none';
  };

export type RatingProps = GlobalStyles &
  SharedProps & {
    halfPrecision: boolean;
    halfPrecisionFillMode: 'svg' | 'box';
    accessibleLabel: 'string';
  };

export type CSSVariables = {
  [key: string]: string;
};
