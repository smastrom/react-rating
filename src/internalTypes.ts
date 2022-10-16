import { ItemStyles, MaybeArrayColors, NonArrayColors, RatingProps } from './exportedTypes';

type CSSPrefix = 'rr';

declare module 'react' {
	interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
		'data-value'?: string;
	}
}

export type CSSVariable = `--${CSSPrefix}--${string}`;

export type CSSVariables = {
	[key: CSSVariable]: string;
};

export type CSSClassName = `${CSSPrefix}--${string}`;

export type TagID = `${CSSPrefix}_${string}`;

export type MaybeEmptyClassName = CSSClassName | '';

type Colors<T> = {
	[key in keyof MaybeArrayColors]: T;
};

export type ActiveColorsStrings = Colors<string>;

export type ValidArrayColors = Colors<string[]>;

export type StaticColors = NonArrayColors & ActiveColorsStrings;

export type RequireAtLeastOne<T> = {
	[K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type TabIndex = -1 | 0;

export type RatingItemProps = NonNullable<Pick<ItemStyles, 'itemShapes'>> & {
	itemStrokeWidth: NonNullable<ItemStyles['itemStrokeWidth']>;
	orientation: NonNullProp<'orientation'>;
	hasHF: boolean;
	testId?: object;
};

export type StylesState = {
	staticCssVars: CSSVariables;
	dynamicCssVars: CSSVariables[];
	dynamicClassNames: CSSClassName[];
};

export type SvgData = {
	viewBox: string;
	translateData: string;
};

export type NonNullProp<K extends keyof RatingProps> = NonNullable<RatingProps[`${K}`]>;

export type HTMLProps = React.HTMLProps<HTMLDivElement>;
export type MouseEvent = React.MouseEvent<HTMLDivElement>;
export type FocusEvent = React.FocusEvent<HTMLDivElement>;
export type MutableRef = React.MutableRefObject<HTMLDivElement | null>;
