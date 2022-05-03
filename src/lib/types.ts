import { CSSProperties } from 'react';

type StrokeStyle = 'round' | 'sharp';

export type SvgChildNodes = JSX.Element | JSX.Element[] | null;

export type SingleItemStyle = {
  [key: string]: string | number | undefined;
};

export type ItemStyle = {
  svgChildNodes?: SvgChildNodes;
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

type GlobalStyles = {
  containerGap?: number;
  boxRadius?: number;
  boxBorderWidth?: number;
  boxPadding?: number;
};

export type Breakpoints = {
  [key: number]: GlobalStyles;
};

export type RatingInputProps = GlobalStyles & {
  onChange: (currentValue: string) => void | undefined;

  ratingValues: string[] | number[];
  ratingValue: string | number | undefined | null;
  customAccessibleLabels?: string[];
  direction: 'horizontal' | 'vertical';

  highlightOnlySelected?: boolean;
  enableKeyboard?: boolean;

  itemStyles?: ItemStyle | ItemStyle[];
  breakpoints?: Breakpoints;

  ref?: HTMLDivElement;
  id?: string;
  style?: CSSProperties;
  className?: string;
  ariaLabelledBy?: string;

  readOnly?: boolean;
  readOnlyLabel?: string;
  readOnlyPrecision?: 1 | 0.5;
  readOnlyPrecisionFillMode?: 'box' | 'svg';
  readOnlyLimit?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
};
