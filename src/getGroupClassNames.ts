import { RatingProps } from './exportedTypes';
import {
	getGapClassName,
	getPaddingClassName,
	getRadiusClassName,
	getTransitionClassNames,
} from './getStaticClassNames';
import { CSSClassName, MaybeEmptyClassName } from './internalTypes';
import {
	CursorClasses,
	OrientationClasses,
	HasClasses,
	RatingClasses,
	OrientationProps,
	TransitionProps,
} from './constants';

type ParamObj = Required<
	Pick<
		RatingProps,
		| 'className'
		| 'radius'
		| 'readOnly'
		| 'isDisabled'
		| 'transition'
		| 'orientation'
		| 'spaceBetween'
		| 'spaceInside'
	>
> & {
	isDynamic: boolean;
	absoluteBoxBorderWidth: number;
	absoluteStrokeWidth: number;
};

export function getGroupClassNames({
	className,
	radius,
	readOnly,
	isDisabled,
	isDynamic,
	transition,
	orientation,
	absoluteBoxBorderWidth,
	absoluteStrokeWidth,
	spaceBetween,
	spaceInside,
}: ParamObj) {
	const cursorClassName: MaybeEmptyClassName = isDynamic ? CursorClasses.POINTER : '';
	const gapClassName = getGapClassName(spaceBetween);
	const paddingClassName = getPaddingClassName(spaceInside);
	const disabledClassName: MaybeEmptyClassName =
		readOnly === false && isDisabled === true ? CursorClasses.DISABLED : '';
	const transitionClassName =
		isDynamic && transition !== TransitionProps.NONE
			? getTransitionClassNames(transition)
			: '';
	const orientationClassName: CSSClassName =
		orientation === OrientationProps.VERTICAL
			? OrientationClasses.VERTICAL
			: OrientationClasses.HORIZONTAL;
	const radiusClassName = getRadiusClassName(radius);
	const borderClassName: MaybeEmptyClassName =
		absoluteBoxBorderWidth > 0 ? HasClasses.BORDER : '';
	const strokeClassName: MaybeEmptyClassName =
		absoluteStrokeWidth > 0 ? HasClasses.STROKE : '';

	return `${RatingClasses.GROUP} ${orientationClassName} ${strokeClassName} ${borderClassName}
${transitionClassName} ${radiusClassName} ${cursorClassName} ${disabledClassName} ${gapClassName}
${paddingClassName} ${className}`
		.replace(/  +/g, ' ')
		.trimEnd();
}
