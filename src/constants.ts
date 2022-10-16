import { CSSClassName, CSSVariable } from './internalTypes';
import {
	Orientation,
	HF,
	Sizes as SizesT,
	Transitions,
	MaybeArrayColors,
	NonArrayColors,
} from './exportedTypes';

/* ClassNames */

type Classes = {
	[key: string]: CSSClassName;
};

export const RatingClasses: Classes = {
	GROUP: 'rr--group',
	BOX: 'rr--box',
	SVG: 'rr--svg',
	RESET: 'rr--reset',
	DEF_50: 'rr--svg-stop-1',
	DEF_100: 'rr--svg-stop-2',
};

export const ActiveClassNames: Classes = {
	ON: 'rr--on',
	OFF: 'rr--off',
};

export const TransitionClasses: Classes = {
	ZOOM: 'rr--fx-zoom',
	POSITION: 'rr--fx-position',
	OPACITY: 'rr--fx-opacity',
	COLORS: 'rr--fx-colors',
};

export const RadiusClasses: Classes = {
	SMALL: 'rr--rx-sm',
	MEDIUM: 'rr--rx-md',
	LARGE: 'rr--rx-lg',
	FULL: 'rr--rx-full',
};

export const GapClasses: Classes = {
	SMALL: 'rr--gap-sm',
	MEDIUM: 'rr--gap-md',
	LARGE: 'rr--gap-lg',
};

export const PaddingClasses: Classes = {
	SMALL: 'rr--space-sm',
	MEDIUM: 'rr--space-md',
	LARGE: 'rr--space-lg',
};

export const CursorClasses: Classes = {
	POINTER: 'rr--pointer',
	DISABLED: 'rr--disabled',
};

export const OrientationClasses: Classes = {
	VERTICAL: 'rr--dir-y',
	HORIZONTAL: 'rr--dir-x',
};

export const HasClasses: Classes = {
	STROKE: 'rr--has-stroke',
	BORDER: 'rr--has-border',
};

export const HFClasses: Classes = {
	BOX_ON: 'rr--hf-box-on',
	BOX_INT: 'rr--hf-box-int',
	BOX_OFF: 'rr--hf-box-off',
	SVG_ON: 'rr--hf-svg-on',
	SVG_OFF: 'rr--hf-svg-off',
};

/* Variables */

type Variables = {
	[key: string]: CSSVariable;
};

export const ActiveVars: Variables = {
	FILL: '--rr--fill-on-color',
	BOX: '--rr--box-on-color',
	BORDER: '--rr--border-on-color',
	STROKE: '--rr--stroke-on-color',
};

export const InactiveVars: Variables = {
	FILL: '--rr--fill-off-color',
	BOX: '--rr--box-off-color',
	BORDER: '--rr--border-off-color',
	STROKE: '--rr--stroke-off-color',
};

export const ItemVars: Variables = {
	BORDER_WIDTH: '--rr--border-width',
};

/* Props */

type ValuesFromUnion<T> = {
	[key: string]: T;
};

export const OrientationProps: ValuesFromUnion<Orientation> = {
	HORIZONTAL: 'horizontal',
	VERTICAL: 'vertical',
};

export const HFProps: ValuesFromUnion<HF> = {
	SVG: 'svg',
	BOX: 'box',
};

export const Sizes: ValuesFromUnion<SizesT> = {
	NONE: 'none',
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large',
	FULL: 'full',
};

export const TransitionProps: ValuesFromUnion<Transitions> = {
	NONE: 'none',
	ZOOM: 'zoom',
	POSITION: 'position',
	OPACITY: 'opacity',
	COLORS: 'colors',
};

/* Color Props */

type ValuesFromKeys<T> = {
	[key: string]: keyof T;
};

export const ActiveColorProps: ValuesFromKeys<MaybeArrayColors> = {
	FILL: 'activeFillColor',
	BOX: 'activeBoxColor',
	BORDER: 'activeBoxBorderColor',
	STROKE: 'activeStrokeColor',
};

export const InactiveColorProps: ValuesFromKeys<NonArrayColors> = {
	FILL: 'inactiveFillColor',
	BOX: 'inactiveBoxColor',
	BORDER: 'inactiveBoxBorderColor',
	STROKE: 'inactiveStrokeColor',
};
