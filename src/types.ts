export type SvgChildNodes = JSX.Element | JSX.Element[];

export type MaybeArrayColors = {
  activeFillColor?: string | string[];
  activeStrokeColor?: string | string[];
  activeBoxColor?: string | string[];
  activeBoxBorderColor?: string | string[];
};

export type ItemStylesProp = MaybeArrayColors & {
  svgChildNodes: SvgChildNodes;
  itemStrokeWidth?: number;
  itemStrokeStyle?: 'round' | 'sharp';

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

export type MaybeInvalidBreakPoints = {
  [key: string | number]: {
    [key: string | number]: any;
  };
};

/** Those props are always injected whether readOnly equals to false or not. */
export type SharedProps = {
  value: number;
  readOnly?: boolean;
  /** An integer between 1 and 10 representing the number of rating items to display. */
  limit?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
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
};

export type RatingProps = SharedProps & ReadOnlyProps & BoxStyles & InputProps;

/* Internal */

export type RatingItemProps = Pick<ItemStylesProp, 'svgChildNodes' | 'itemStrokeWidth'> & {
  hasHalfFill: boolean;
};

type CSSPrefix = 'rar';

export type CSSVariables = {
  [key: `--${CSSPrefix}--${string}`]: string;
};

export type CSSClassName = `${CSSPrefix}--${string}`;

export type TagID = `${CSSPrefix}_${string}`;

export type MaybeEmptyCSSClassName = CSSClassName | '';

// Maybe create a new type for repetetions of classNames

export type NonArrayColors = Pick<
  ItemStylesProp,
  'inactiveBoxColor' | 'inactiveFillColor' | 'inactiveBoxBorderColor' | 'inactiveStrokeColor'
>;

type ActiveColorsStrings = {
  [key in keyof MaybeArrayColors]: string;
};

export type MergedStyles = {
  boxStyles: BoxStyles;
  colors: NonArrayColors & ActiveColorsStrings;
};

export type ValidArrayColors = {
  [key in keyof MaybeArrayColors]: string[];
};

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];
