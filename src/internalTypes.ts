import { ItemStyles, MaybeArrayColors, NonArrayColors, SharedProps } from './exportedTypes';

type CSSPrefix = 'rr';

export type CSSVariables = {
	[key: `--${CSSPrefix}--${string}`]: string;
};

export type CSSClassName = `${CSSPrefix}--${string}`;

export type TagID = `${CSSPrefix}_${string}`;

export type MaybeEmptyCSSClassName = CSSClassName | '';

export type ActiveColorsStrings = {
	[key in keyof MaybeArrayColors]: string;
};

export type ValidArrayColors = {
	[key in keyof MaybeArrayColors]: string[];
};

export type StaticColors = NonArrayColors & ActiveColorsStrings;

export type RequireAtLeastOne<T> = {
	[K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type KeyAndValueStrings = {
	[key: string]: string;
};

export type TabIndex = -1 | 0;

export type RatingItemProps = NonNullable<
	Pick<ItemStyles, 'itemShapes' | 'itemStrokeWidth'>
> & {
	hasHalfFill: boolean;
	testId?: string;
	orientationProp?: SharedProps['orientation'];
};

export type StylesState = {
	staticCssVars: CSSVariables;
	dynamicCssVars: CSSVariables[] | [];
	dynamicClassNames: CSSClassName[];
};
