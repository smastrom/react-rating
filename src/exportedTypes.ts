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
	/** Active fill color of the SVG. */
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

export type StyleOptions = 'none' | 'small' | 'medium' | 'large';

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
	orientation?: 'horizontal' | 'vertical';
	/** Responsive padding of each rating item. */
	spaceInside?: StyleOptions;
	/** Responsive gap between rating items. */
	spaceBetween?: StyleOptions;
	/** Radius of each rating item */
	radius?: StyleOptions | 'full';
	/** Custom shapes and colors, visit https://github.com/smastrom/react-rating for more info. */
	itemStyles?: ItemStyles;
	id?: string;
	className?: string;
	style?: React.CSSProperties;
};

export type ReadOnlyProps = {
	/** Whether to half-fill the SVG or the box. */
	halfFillMode?: 'svg' | 'box';
};

type RatingChange =
	| React.Dispatch<React.SetStateAction<number>>
	| ((ratingValue: number) => void | Promise<void>);

export type InputProps = {
	/** Setter or custom callback to update the rating. */
	onChange?: RatingChange;
	/** Callback to execute when entering/leaving the rating items. */
	onHoverChange?: (ratingValue: number) => void | (() => void);
	/** Whether or not to disable the radio group. */
	isDisabled?: boolean;
	/** Whether or not to reset the rating value if clicking again on the current rating. */
	resetOnSecondClick?: boolean;
	/** Transition to apply when hovering/selecting. */
	transition?: 'colors' | 'zoom' | 'position' | 'opacity' | 'none';
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
};

export type RatingProps = SharedProps & ReadOnlyProps & InputProps;

export declare const Rating: React.ForwardRefExoticComponent<
	SharedProps & ReadOnlyProps & InputProps & React.RefAttributes<HTMLDivElement>
>;
