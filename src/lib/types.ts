import { CSSProperties } from 'react';

import {
  STROKE_STYLE_ROUND,
  STROKE_STYLE_SHARP,
  DIRECTION_X,
  DIRECTION_Y,
  LABEL_POSITION_TOP,
  LABEL_POSITION_BOTTOM,
  LABEL_POSITION_LEFT,
  LABEL_POSITION_RIGHT,
} from './constants';

export interface SingleStyles {
  [key: string]: string | number | undefined;
}

export type StrokeStyle = typeof STROKE_STYLE_ROUND | typeof STROKE_STYLE_SHARP;

type SvgChildNodes = JSX.Element | JSX.Element[] | null;

export interface ElementStyle {
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
}

export type ElementStyles = ElementStyle[];

interface BoxStyles {
  boxRadius?: number;
  boxBorder?: number;
  boxPadding?: number;
  boxGap?: number;
}

export interface BoxStylesBreakpoints {
  [key: number]: BoxStyles;
}

type Direction = typeof DIRECTION_X | typeof DIRECTION_Y;

type LabelPosition =
  | typeof LABEL_POSITION_TOP
  | typeof LABEL_POSITION_BOTTOM
  | typeof LABEL_POSITION_LEFT
  | typeof LABEL_POSITION_RIGHT;

export interface InputGroupProps extends BoxStyles {
  // Component
  ratingValues: string[];
  ratingValue: string | undefined | null;
  customLabels?: string[];
  hoverEffects?: boolean;
  highlightOnlySelected?: boolean;
  displayLabel?: boolean;
  labelPosition?: LabelPosition;
  direction?: Direction;
  customEasing?: string;
  // Item Styles
  itemStyles?: ElementStyles;
  breakpoints?: BoxStylesBreakpoints;
  // HTML
  ref?: HTMLDivElement;
  id?: string;
  style?: CSSProperties;
  className?: string;
  // Callbacks
  onChange: (value: string) => void;
  onClick?: Function;
}

export type TabIndexValues = 0 | -1;

// RatingItem Component

export interface ItemProps {
  svgChildNodes?: SvgChildNodes;
  svgItemLabel?: string;
  strokeWidth?: number;
}

export interface SVGAtrributes {
  [key: string]: number | string;
}
