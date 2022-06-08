import React, { CSSProperties } from 'react';

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

export type ItemStylesProp = NonArrayColors &
  MaybeArrayColors & {
    svgChildNodes: JSX.Element | JSX.Element[];
    itemStrokeWidth?: number;
    boxBorderWidth?: number;
  };

type StyleOptions = 'none' | 'small' | 'medium' | 'large';

/** Props always injected whether readOnly equals to false or not. */
export type SharedProps = {
  value: number;
  /**  Wheter or not */
  readOnly?: boolean;
  limit?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
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

/** Props injected only if readOnly equals to true. */
export type ReadOnlyProps = {
  halfFillMode?: 'svg' | 'box';
  accessibleLabel?: string;
};

/** Props injected only if readOnly equals to false. */
export type InputProps = {
  onChange: (value: number) => void | undefined;
  onHoverChange: (value: number) => void | undefined;
  enableKeyboard?: boolean;
  labelledBy?: string;
  accessibleLabels?: string[];
  transition?: 'colors' | 'zoom' | 'position' | 'opacity' | 'none';
};

export type RatingProps = SharedProps & ReadOnlyProps & InputProps;

/** Props injected only if readOnly equals to false. */
export declare const Rating: React.ForwardRefExoticComponent<
  SharedProps & ReadOnlyProps & InputProps & React.RefAttributes<HTMLDivElement>
>;
