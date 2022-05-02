import { CSSProperties } from 'react';

type StrokeStyle = 'round' | 'sharp';

export type SvgChildNodes = JSX.Element | JSX.Element[] | null;

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

export type SingleItemStyle = {
  [key: string]: string | number | undefined;
};

type BoxStyles = {
  containerGap?: number;
  boxRadius?: number;
  boxBorderWidth?: number;
  boxPadding?: number;
};

export type BoxStylesBreakpoints = {
  [key: number]: BoxStyles;
};

export type RatingItemProps = BoxStyles & {
  ratingValues: string[];
  ratingValue: string | number | undefined | null;
  customLabels?: string[];
  enableHover?: boolean;
  direction: 'horizontal' | 'vertical';
  highlightOnlySelected?: boolean;
  customEasing?: string;
  enableKeyboard?: boolean;
  enableTransitions?: boolean;

  itemStyles?: ItemStyle[];
  breakpoints?: BoxStylesBreakpoints;

  ref?: HTMLDivElement;
  id?: string;
  style?: CSSProperties;
  className?: string;

  onChange: (currentValue: string) => void | undefined;
};
