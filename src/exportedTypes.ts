import React from 'react';

export type MaybeArrayColors = {
	/** Active fill color of the SVG, it can be an array of colors in ascending order. */
	activeFillColor?: string | string[];
	/** Active stroke color of the SVG, it can be an array of colors in ascending order. */
	activeStrokeColor?: string | string[];
	/** Active background color of the SVG bounding box, it can be an array of colors in ascending order. */
	activeBoxColor?: string | string[];
	/** Active border color of the SVG bounding box, it can be an array of colors in ascending order. */
	activeBoxBorderColor?: string | string[];
};

export type NonArrayColors = {
	/** Inactive fill color of the SVG. */
	inactiveFillColor?: string;
	/** Inactive stroke color of the SVG. */
	inactiveStrokeColor?: string;
	/** Inactive background color of the SVG bounding box. */
	inactiveBoxColor?: string;
	/** Inactive border color of the SVG bounding box. */
	inactiveBoxBorderColor?: string;
};

export type Colors = MaybeArrayColors & NonArrayColors;

/** Custom shapes and colors, visit https://github.com/smastrom/react-rating for more info. */
export type ItemStyles = Colors & {
	/** JSX element to render the inner shapes of the SVG.
	 * Visit https://github.com/smastrom/react-rating#how-to-create-itemshapes-elements for more info. */
	itemShapes: JSX.Element | JSX.Element[];
	/** Stroke width of the SVG, expressed in viewBox user coordinate's unit size. */
	itemStrokeWidth?: number;
	/** Border width of the SVG bounding box, expressed with an integer representing the pixels. */
	boxBorderWidth?: number;
};

export type Orientation = 'horizontal' | 'vertical';
export type Sizes = 'none' | 'small' | 'medium' | 'large' | 'full';
export type Spacings = Omit<Sizes, 'full'>;
export type HF = 'svg' | 'box';
export type Transitions = 'none' | 'zoom' | 'position' | 'opacity' | 'colors';

export type SharedProps = {
	/** An integer from 0 to items. It can be a float if readOnly is true. */
	value: number;
	/** Number of rating items to display. */
	items?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
	/** Whether or not to render an accessible image element. */
	readOnly?: boolean;
	/** Whether or not to highlight only the selected rating item. */
	highlightOnlySelected?: boolean;
	/** Orientation of the rating items. */
	orientation?: Orientation;
	/** Responsive padding of each rating item. */
	spaceInside?: Spacings;
	/** Responsive gap between rating items. */
	spaceBetween?: Spacings;
	/** Radius of each rating item */
	radius?: Sizes;
	/** Custom shapes and colors, visit https://github.com/smastrom/react-rating for more info. */
	itemStyles?: ItemStyles;
	id?: string;
	className?: string;
	style?: React.CSSProperties;
};

export type ReadOnlyProps = {
	/** Whether to half-fill the SVG or the box. */
	halfFillMode?: HF;
};

export type RatingChange =
	| React.Dispatch<React.SetStateAction<number>>
	| ((selectedValue: number) => void | Promise<void>);

export type HoverChange = (hoveredValue: number) => void | (() => void);
type FocusEvent = (event?: FocusEvent) => void;

export type InputProps = {
	/** Setter or custom callback to update the rating. */
	onChange?: RatingChange;
	/** Callback to execute when entering/leaving the rating items. */
	onHoverChange?: HoverChange;
	onBlur?: FocusEvent;
	onFocus?: FocusEvent;
	/** Whether or not to disable the radio group. */
	isDisabled?: boolean;
	/**
	 * @deprecated Since version 1.2.0, please use isRequired prop instead.
	 */
	resetOnSecondClick?: boolean;
	/** Transition to apply when hovering/selecting. */
	transition?: Transitions;
	/** Whether or not to tell assistive technologies that rating is required. */
	isRequired?: boolean;
	/** Accessible label of the rating group / image. */
	invisibleLabel?: string;
	/** Accessible labels of each each rating item. */
	invisibleItemLabels?: string[];
	/** Id of the element used as rating group label. Takes precedence over invisibleLabel. */
	visibleLabelId?: string;
	/** Ids of the elements used as labels for each rating item. Takes precedence over invisibleItemLabels. */
	visibleItemLabelIds?: string[];
	/** Accessible label for the invisible reset radio. Effective if `isRequired` is set to **false**. */
	resetLabel?: string;
};

export type RatingProps = SharedProps & ReadOnlyProps & InputProps;

export declare const Rating: React.ForwardRefExoticComponent<
	RatingProps & React.RefAttributes<HTMLDivElement>
>;
