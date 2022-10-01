import React, { forwardRef, useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { RatingItem } from './RatingItem';
import { getDynamicCssVars } from './getDynamicCssVars';
import { getActiveClassNames } from './getActiveClassNames';
import { getHalfFillClassNames } from './getHFClassNames';
import { getStaticCssVars } from './getStaticCssVars';
import { getColors } from './getColors';
import { getTabIndex } from './getTabIndex';
import { getErrors } from './getErrors';
import {
	getGapClassName,
	getPaddingClassName,
	getRadiusClassName,
	getTransitionClassNames,
} from './getStaticClassNames';
import {
	getIntersectionIndex,
	isValidPositiveNumber,
	isGraphicalValueInteger,
	getChildTestIds,
	getSvgChildTestIds,
	devTestId,
} from './utils';
import { defaultItemStyles } from './defaultItemStyles';
import { RatingProps, Rating as RatingComponent } from './exportedTypes';
import {
	StylesState,
	CSSClassName,
	MaybeEmptyCSSClassName,
	RequireAtLeastOne,
	ValidArrayColors,
	TabIndex,
	RatingItemProps,
} from './internalTypes';

/** Thank you for using **React Rating**.
 * Visit https://github.com/smastrom/react-rating to read the full documentation.*/
export const Rating: typeof RatingComponent = forwardRef<HTMLDivElement, RatingProps>(
	(
		{
			value,
			items = 5,
			readOnly = false,
			onChange,
			onHoverChange,
			isDisabled = false,
			highlightOnlySelected = false,
			resetOnSecondClick = false,
			orientation = 'horizontal',
			spaceBetween = 'none',
			spaceInside = 'small',
			radius = 'none',
			transition = 'colors',
			itemStyles = defaultItemStyles,
			isRequired = true,
			halfFillMode = 'svg',
			visibleLabelId,
			visibleItemLabelIds,
			invisibleLabel = readOnly === false ? 'Rating' : `Rated ${value} on ${items}`,
			invisibleItemLabels,
			id,
			className,
			style,
		},
		externalRef
	) => {
		/* Refs */

		const roleRadioDivs = useRef<HTMLDivElement[] | []>([]);

		/* Value helpers */

		const ratingValues = Array.from(Array(items), (_, index) => index + 1);

		const hasPrecision = readOnly && !Number.isInteger(value);
		const isEligibleForHalfFill = hasPrecision && highlightOnlySelected === false;
		const isNotEligibleForHalfFill = hasPrecision && highlightOnlySelected === true;

		/* New in v1.1.0 */
		const isDyanmic = readOnly === false && isDisabled === false;

		const ratingValue = isNotEligibleForHalfFill ? Math.round(value) : value;

		const currentRatingIndex = isEligibleForHalfFill
			? getIntersectionIndex(ratingValues, ratingValue)
			: ratingValues.indexOf(ratingValue);

		const deservesHalfFill = isEligibleForHalfFill && !isGraphicalValueInteger(ratingValue);

		const hasHoverChange = typeof onHoverChange === 'function';

		/* Style helpers */

		const { itemShapes, itemStrokeWidth, boxBorderWidth } = itemStyles;

		const absoluteStrokeWidth = isValidPositiveNumber(itemStrokeWidth)
			? (itemStrokeWidth as number)
			: 0;
		const absoluteBoxBorderWidth = isValidPositiveNumber(boxBorderWidth)
			? (boxBorderWidth as number)
			: 0;
		const absoluteHalfFillMode = halfFillMode === 'box' ? 'box' : 'svg';

		const needsDynamicCssVars = ratingValue >= 0.25;

		/* Colors */

		const { staticColors, arrayColors } = useMemo(() => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { itemShapes, itemStrokeWidth, boxBorderWidth, ...colors } = itemStyles;
			return getColors(colors, deservesHalfFill, absoluteStrokeWidth, absoluteHalfFillMode);
		}, [itemStyles, deservesHalfFill, absoluteStrokeWidth, absoluteHalfFillMode]);

		const hasArrayColors = Object.keys(arrayColors).length > 0;

		/* Callbacks */

		const getDynamicClassNames = useCallback(
			(currentSelectedIndex: number) => {
				if (deservesHalfFill) {
					return getHalfFillClassNames(ratingValue, items, absoluteHalfFillMode);
				}
				return getActiveClassNames(highlightOnlySelected, items, currentSelectedIndex);
			},
			[deservesHalfFill, highlightOnlySelected, ratingValue, items, absoluteHalfFillMode]
		);

		const getDynamicStyles = useCallback(
			(currentSelectedIndex: number, shouldGetCssVars: boolean) => ({
				dynamicClassNames: getDynamicClassNames(currentSelectedIndex),
				dynamicCssVars:
					shouldGetCssVars && hasArrayColors
						? getDynamicCssVars(
								arrayColors as RequireAtLeastOne<ValidArrayColors>,
								currentSelectedIndex,
								highlightOnlySelected
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  )
						: [],
			}),
			[getDynamicClassNames, arrayColors, hasArrayColors, highlightOnlySelected]
		);

		/* State */

		const [styles, setStyles] = useState<StylesState>({
			staticCssVars: getStaticCssVars(staticColors, absoluteBoxBorderWidth),
			...getDynamicStyles(currentRatingIndex, needsDynamicCssVars),
		});

		const [tabIndex, setTabIndex] = useState<TabIndex[]>(() => {
			if (isDyanmic) {
				return getTabIndex(items, currentRatingIndex);
			}
			return [];
		});

		/* Effects */

		useEffect(() => {
			setStyles({
				staticCssVars: getStaticCssVars(staticColors, absoluteBoxBorderWidth),
				...getDynamicStyles(currentRatingIndex, needsDynamicCssVars),
			});
		}, [
			staticColors,
			getDynamicStyles,
			absoluteBoxBorderWidth,
			currentRatingIndex,
			needsDynamicCssVars,
		]);

		useEffect(() => {
			if (isDyanmic) {
				setTabIndex(() => getTabIndex(items, currentRatingIndex));
			}
		}, [isDyanmic, currentRatingIndex, items]);

		/* Prevent rendering */

		const { shouldRender, errorReason } = getErrors(
			items,
			value,
			readOnly,
			onChange,
			itemShapes,
			isDisabled
		);

		if (!shouldRender) {
			console.error(errorReason);
			return null;
		}

		/* Mouse handlers */

		function handleClick(event: React.MouseEvent<HTMLDivElement>, clickedIndex: number) {
			event.stopPropagation();

			if (resetOnSecondClick === true && currentRatingIndex === clickedIndex) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				onChange!(0);
			} else {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				onChange!(ratingValues[clickedIndex]);
			}
		}

		function handleMouseEnter(hoveredIndex: number) {
			if (hasHoverChange) {
				onHoverChange(ratingValues[hoveredIndex]);
			}
			setStyles({ ...styles, ...getDynamicStyles(hoveredIndex, true) });
		}

		function handleMouseLeave() {
			if (hasHoverChange) {
				onHoverChange(0);
			}
			setStyles({ ...styles, ...getDynamicStyles(currentRatingIndex, needsDynamicCssVars) });
		}

		/* Keyboard navigation */

		/** Ignoring handleKeyDown from Jest coverage as it is
		 * tested with Playwright in tests/e2e/keyboardNavigation.test.ts */

		/* istanbul ignore next */
		function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>, childIndex: number) {
			const previousSibling = childIndex - 1;
			const nextSibling = childIndex + 1;
			const lastSibling = ratingValues.length - 1;

			const isEventFiringFromLastItem = lastSibling === childIndex;
			const isEventFiringFromFistItem = childIndex === 0;

			switch (event.code) {
				case 'Shift':
					return true;
				case 'Tab':
					if (currentRatingIndex !== childIndex) {
						setTimeout(() => {
							setTabIndex(getTabIndex(items, currentRatingIndex));
						});
					}
					return true;
				case 'Enter':
				case 'Space': {
					event.preventDefault();
					if (childIndex !== currentRatingIndex) {
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						return onChange!(ratingValues[childIndex]);
					}
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					return onChange!(0);
				}
				case 'ArrowDown':
				case 'ArrowRight':
					{
						const siblingToFocus = isEventFiringFromLastItem ? 0 : nextSibling;
						setTabIndex(getTabIndex(items, siblingToFocus));
						roleRadioDivs.current[siblingToFocus].focus();
					}
					break;
				case 'ArrowUp':
				case 'ArrowLeft':
					{
						const siblingToFocus = isEventFiringFromFistItem ? lastSibling : previousSibling;
						setTabIndex(getTabIndex(items, siblingToFocus));
						roleRadioDivs.current[siblingToFocus].focus();
					}
					break;
			}

			event.preventDefault();
			event.stopPropagation();
		}

		/* Radio group props */

		function getClassNames() {
			/* New in v1.1.0 */
			const disabledClassName: MaybeEmptyCSSClassName =
				readOnly === false && isDisabled === true ? 'rr--disabled' : '';
			/* Edited in v1.1.0 */
			const cursorClassName: MaybeEmptyCSSClassName = isDyanmic ? 'rr--pointer' : '';

			const transitionClassName =
				isDyanmic && transition !== 'none' ? getTransitionClassNames(transition) : '';

			const orientationClassName: CSSClassName = `rr--dir-${
				orientation === 'vertical' ? 'y' : 'x'
			}`;
			const radiusClassName =
				typeof radius === 'string' && radius !== 'none' ? getRadiusClassName(radius) : '';
			const borderClassName: MaybeEmptyCSSClassName =
				absoluteBoxBorderWidth > 0 ? 'rr--has-border' : '';
			const strokeClassName: MaybeEmptyCSSClassName =
				absoluteStrokeWidth > 0 ? 'rr--has-stroke' : '';

			const gapClassName =
				typeof spaceBetween === 'string' && spaceBetween !== 'none'
					? getGapClassName(spaceBetween)
					: '';
			const paddingClassName =
				typeof spaceInside === 'string' && spaceInside !== 'none'
					? getPaddingClassName(spaceInside)
					: '';

			return `rr--group ${orientationClassName} ${strokeClassName} ${borderClassName}
      ${transitionClassName} ${radiusClassName} ${cursorClassName} ${disabledClassName} ${gapClassName}
      ${paddingClassName} ${className || ''}`
				.replace(/  +/g, ' ')
				.trimEnd();
		}

		function getGroupAriaProps() {
			if (readOnly === false) {
				const isAriaRequired = isRequired === true && isDisabled === false;
				const ariaProps: React.HTMLProps<HTMLDivElement> = {
					role: 'radiogroup',
					'aria-required': isAriaRequired,
				};

				/* Edited in v1.1.0 */
				if (isAriaRequired) {
					ariaProps['aria-invalid'] = ratingValue <= 0;
				}

				if (typeof visibleLabelId === 'string' && visibleLabelId.length > 0) {
					ariaProps['aria-labelledby'] = visibleLabelId;
				} else {
					ariaProps['aria-label'] = invisibleLabel;
				}
				return ariaProps;
			}
			return {
				role: 'img',
				'aria-label': invisibleLabel,
			};
		}

		/* Radio props */

		/* New in v1.1.0 */
		function getInteractiveProps(childIndex: number) {
			const events: React.HTMLProps<HTMLDivElement> = {};

			events.onClick = (event) => handleClick(event, childIndex);
			events.onMouseEnter = () => handleMouseEnter(childIndex);
			events.onMouseLeave = handleMouseLeave;
			events.tabIndex = tabIndex[childIndex];
			events.onKeyDown = (event) => handleKeyDown(event, childIndex);

			return events;
		}

		function getRadioProps(childIndex: number): React.HTMLProps<HTMLDivElement> {
			const getRadioLabels = () =>
				Array.isArray(invisibleItemLabels)
					? invisibleItemLabels
					: ratingValues.map((_, index: number) => `Rate ${ratingValues[index]}`);

			const labelProps: React.HTMLProps<HTMLDivElement> = {};

			if (Array.isArray(visibleItemLabelIds)) {
				labelProps['aria-labelledby'] = visibleItemLabelIds[childIndex];
			} else {
				labelProps['aria-label'] = getRadioLabels()?.[childIndex];
			}

			if (readOnly === false && isDisabled === true) {
				labelProps['aria-disabled'] = 'true';
			}

			return {
				'aria-checked': ratingValues[childIndex] === ratingValue,
				role: 'radio',
				ref: (radioChildNode: HTMLDivElement) =>
					(roleRadioDivs.current[childIndex] = radioChildNode),
				...(isDisabled === false ? getInteractiveProps(childIndex) : {}),
				...labelProps,
			};
		}

		/* SVG */

		function getSvgRatingItemProps(childNodeIndex: number): RatingItemProps {
			const sharedProps = {
				...getSvgChildTestIds(childNodeIndex),
				itemShapes: Array.isArray(itemShapes) ? itemShapes[childNodeIndex] : itemShapes,
				itemStrokeWidth: absoluteStrokeWidth,
				hasHalfFill: false,
				orientationProp: orientation,
			};
			if (deservesHalfFill && absoluteHalfFillMode === 'svg') {
				sharedProps.hasHalfFill = childNodeIndex === currentRatingIndex;
			}
			return sharedProps;
		}

		/* Render */

		return (
			<div
				{...devTestId}
				ref={externalRef}
				id={id}
				style={{ ...style, ...styles.staticCssVars }}
				className={getClassNames()}
				{...getGroupAriaProps()}
			>
				{/* */}
				{/* */}
				{/* */}
				{/* */}
				{/* Box */}
				{ratingValues.map((_, childIndex) => (
					<div
						key={`rr_box_${childIndex}`}
						className={`rr--box ${styles.dynamicClassNames[childIndex]}`}
						style={styles?.dynamicCssVars?.[childIndex]}
						{...(readOnly === false ? getRadioProps(childIndex) : {})}
						{...getChildTestIds(childIndex)}
					>
						{/* */}
						{/* */}
						{/* */}
						{/* */}
						{/* SVG */}
						<RatingItem {...getSvgRatingItemProps(childIndex)} />
					</div>
				))}
			</div>
		);
	}
);

Rating.displayName = 'Rating';
