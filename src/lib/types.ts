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

export type RatingItemProps = GlobalStyles & {
  onChange: (currentValue: string) => void | undefined;

  ratingValues: string[];
  ratingValue: string | number | undefined | null;
  customLabels?: string[];
  enableHover?: boolean;
  direction: 'horizontal' | 'vertical';
  highlightOnlySelected?: boolean;
  readOnly?: boolean;
  customEasing?: string;
  enableKeyboard?: boolean;
  enableTransitions?: boolean;

  itemStyles?: ItemStyle | ItemStyle[];
  breakpoints?: Breakpoints;

  ref?: HTMLDivElement;
  id?: string;
  style?: CSSProperties;
  className?: string;

  ariaLabelledBy?: string;
  readOnlyLabel?: string;
};
