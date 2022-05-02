import { CSSProperties } from 'react';

type StrokeStyle = 'round' | 'sharp';

type SvgChildNodes = JSX.Element | JSX.Element[] | null;

export type ElementStyles = ElementStyle[];

export type SingleStyles = {
  [key: string]: string | number | undefined;
};

export type ElementStyle = {
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

type BoxStyles = {
  boxRadius?: number;
  boxBorder?: number;
  boxPadding?: number;
  boxGap?: number;
};

export type BoxStylesBreakpoints = {
  [key: number]: BoxStyles;
};

export type InputGroupProps = BoxStyles & {
  // Component
  ratingValues: string[];
  ratingValue: string | undefined | null;
  customLabels?: string[];
  enableHover?: boolean;
  direction: 'horizontal' | 'vertical';
  highlightOnlySelected?: boolean;
  customEasing?: string;
  enableKeyboard?: boolean;
  enableTransitions?: boolean;
  // Item Styles
  itemStyles?: ElementStyles;
  breakpoints?: BoxStylesBreakpoints;
  // HTML
  ref?: HTMLDivElement;
  id?: string;
  style?: CSSProperties;
  className?: string;
  // Callbacks
  onChange: (currentValue: string) => void | undefined;
};

// RatingItem Component

export type ItemProps = {
  svgChildNodes?: SvgChildNodes;
  svgItemLabel?: string;
  strokeWidth?: number;
};

export type SVGAtrributes = {
  [key: string]: string;
};
