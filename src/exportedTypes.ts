import { ForwardRefExoticComponent, CSSProperties } from 'react';

export type MaybeArrayColors = {
  activeFillColor?: string | string[];
  activeStrokeColor?: string | string[];
  activeBoxColor?: string | string[];
  activeBoxBorderColor?: string | string[];
};

export type NonArrayColors = {
  inactiveFillColor?: string;
  inactiveStrokeColor?: string;
  inactiveBoxColor?: string;
  inactiveBoxBorderColor?: string;
};

export type Colors = MaybeArrayColors & NonArrayColors;

export type ItemStylesProp = Colors & {
  itemShapes: JSX.Element | JSX.Element[];
  itemStrokeWidth?: number;
  boxBorderWidth?: number;
};

export type StyleOptions = 'none' | 'small' | 'medium' | 'large';

export type SharedProps = {
  value: number;
  readOnly?: boolean;
  items?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  highlightOnlySelected?: boolean;
  orientation?: 'horizontal' | 'vertical';
  itemStyles?: ItemStylesProp;
  style?: CSSProperties;
  spaceInside?: StyleOptions;
  spaceBetween?: StyleOptions;
  radius?: StyleOptions | 'full';
  id?: string;
  className?: string;
};

export type ReadOnlyProps = {
  halfFillMode?: 'svg' | 'box';
  invisibleLabel?: string;
};

export type InputProps = {
  onChange?: (value: number) => void | Promise<void>;
  onHoverChange?: (value: number) => void;
  resetOnSecondClick?: boolean;
  enableKeyboard?: boolean;
  invisibleLabel?: string;
  invisibleItemLabels?: string[];
  visibleLabelId?: string;
  visibleItemLabelIds?: string[];
  transition?: 'colors' | 'zoom' | 'position' | 'opacity' | 'none';
  isRequired?: boolean;
};

export type RatingProps = SharedProps & ReadOnlyProps & InputProps;

export declare const Rating: ForwardRefExoticComponent<
  SharedProps & ReadOnlyProps & InputProps & React.RefAttributes<HTMLDivElement>
>;
