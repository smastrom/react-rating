import React, {
	forwardRef,
	useMemo,
	useCallback,
	useRef,
	useState,
	useEffect,
	Fragment,
} from 'react';
import { RatingItem } from './RatingItem';
import { getDynamicCssVars } from './getDynamicCssVars';
import { getGroupClassNames } from './getGroupClassNames';
import { getActiveClassNames } from './getActiveClassNames';
import { getHFClassNames } from './getHFClassNames';
import { getStaticCssVars } from './getStaticCssVars';
import { getColors } from './getColors';
import { getTabIndex } from './getTabIndex';
import { getErrors } from './getErrors';
import {
	getIntersectionIndex,
	getNumber,
	isGraphicalValueInteger,
	getRadioTestIds,
	getSvgTestIds,
	devTestId,
	isRTL as isRight,
	useIsomorphicLayoutEffect,
} from './utils';
import { Sizes, OrientationProps, TransitionProps, HFProps, RatingClasses } from './constants';
import { defaultItemStyles } from './defaultItemStyles';
import { RatingProps, Rating as RatingComponent } from './exportedTypes';
import {
	StylesState,
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
			orientation = OrientationProps.HORIZONTAL,
			spaceBetween = Sizes.NONE,
			spaceInside = Sizes.SMALL,
			radius = Sizes.NONE,
			transition = TransitionProps.COLORS,
			itemStyles = defaultItemStyles,
			isRequired = true,
			halfFillMode = HFProps.SVG,
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
		/* Helpers */

		const incrementIndex = (index: number) => (isRequired ? index : index + 1);

		const tabIndexItems = incrementIndex(items);
		const ratingValues = Array.from(Array(items), (_, index) => index + 1);
		const hasPrecision = readOnly && !Number.isInteger(value);
		const isEligibleForHF = hasPrecision && highlightOnlySelected === false;
		const isNotEligibleForHF = hasPrecision && highlightOnlySelected === true;
		const ratingValue = isNotEligibleForHF ? Math.round(value) : value;
		const isDynamic = readOnly === false && isDisabled === false;
		const hasHoverChange = typeof onHoverChange === 'function';
		const needsDynamicCssVars = ratingValue >= 0.25;
		const userClassNames = typeof className === 'string' ? className : '';
		const absoluteHFMode = halfFillMode === HFProps.BOX ? HFProps.BOX : HFProps.SVG;
		const deservesHF = isEligibleForHF && !isGraphicalValueInteger(ratingValue);
		const currentRatingIndex = isEligibleForHF
			? getIntersectionIndex(ratingValues, ratingValue)
			: ratingValues.indexOf(ratingValue);

		/* Deps/Callbacks */

		const {
			staticColors,
			arrayColors,
			itemShapes,
			absoluteStrokeWidth,
			absoluteBoxBorderWidth,
		} = useMemo(() => {
			const { itemShapes, itemStrokeWidth, boxBorderWidth, ...colors } = itemStyles;
			const absoluteStrokeWidth = getNumber(itemStrokeWidth);
			const absoluteBoxBorderWidth = getNumber(boxBorderWidth);
			const userColors = getColors(colors);
			return {
				itemShapes,
				absoluteStrokeWidth,
				absoluteBoxBorderWidth,
				...userColors,
			};
		}, [itemStyles]);

		const hasArrayColors = Object.keys(arrayColors).length > 0;

		const getDynamicStyles = useCallback(
			(currentSelectedIndex: number, shouldGetCssVars: boolean) => ({
				dynamicClassNames: deservesHF
					? getHFClassNames(ratingValue, items, absoluteHFMode)
					: getActiveClassNames(highlightOnlySelected, items, currentSelectedIndex),
				dynamicCssVars:
					shouldGetCssVars && hasArrayColors
						? getDynamicCssVars(
								arrayColors as RequireAtLeastOne<ValidArrayColors>,
								currentSelectedIndex,
								highlightOnlySelected
						  )
						: [],
			}),
			[
				arrayColors,
				hasArrayColors,
				highlightOnlySelected,
				absoluteHFMode,
				deservesHF,
				items,
				ratingValue,
			]
		);

		/* Refs */

		const skipStylesMount = useRef(true);
		const skipTabMount = useRef(true);
		const radioRefs = useRef<HTMLDivElement[]>([]);
		const isRTL = useRef(false);

		/* State */

		const [styles, setStyles] = useState<StylesState>({
			staticCssVars: getStaticCssVars(staticColors, absoluteBoxBorderWidth),
			...getDynamicStyles(currentRatingIndex, needsDynamicCssVars),
		});

		const [tabIndex, setTabIndex] = useState<TabIndex[]>(() => {
			if (isDynamic) {
				return getTabIndex(tabIndexItems, currentRatingIndex);
			}
			return [];
		});

		/* Effects */

		useIsomorphicLayoutEffect(() => {
			if (isDynamic) {
				isRTL.current = isRight(radioRefs?.current[0]);
			}
		}, [isDynamic]);

		useEffect(() => {
			if (!skipStylesMount.current) {
				return setStyles({
					staticCssVars: getStaticCssVars(staticColors, absoluteBoxBorderWidth),
					...getDynamicStyles(currentRatingIndex, needsDynamicCssVars),
				});
			}
			skipStylesMount.current = false;
		}, [
			staticColors,
			getDynamicStyles,
			absoluteBoxBorderWidth,
			currentRatingIndex,
			needsDynamicCssVars,
		]);

		useEffect(() => {
			if (!skipTabMount.current && isDynamic) {
				return setTabIndex(getTabIndex(tabIndexItems, currentRatingIndex));
			}
			skipTabMount.current = false;
		}, [isDynamic, currentRatingIndex, tabIndexItems]);

		/* Log critical errors, prevent rendering */

		const { shouldRender, reason } = getErrors({
			items,
			value,
			readOnly,
			onChange,
			itemShapes,
			isDisabled,
		});

		if (!shouldRender) {
			console.error(reason);
			return null;
		}

		/* Mouse */

		function handleClick(event: React.MouseEvent<HTMLDivElement>, clickedIndex: number) {
			event.stopPropagation();

			if (!isRequired && currentRatingIndex === clickedIndex) {
				onChange?.(0);
			} else {
				onChange?.(ratingValues[clickedIndex]);
			}
		}

		function handleMouseEnter(hoveredIndex: number) {
			if (hasHoverChange) {
				onHoverChange(ratingValues[hoveredIndex]);
			}
			setStyles({ ...styles, ...getDynamicStyles(hoveredIndex, true) });
		}

		function handleMouseLeave(event: React.MouseEvent<HTMLDivElement>) {
			if (hasHoverChange) {
				const hasTargetedRadio = radioRefs.current.some(
					(radioDiv) => radioDiv === event.relatedTarget
				);
				if (!hasTargetedRadio) {
					onHoverChange(0);
				}
			}
			setStyles({ ...styles, ...getDynamicStyles(currentRatingIndex, needsDynamicCssVars) });
		}

		/* Keyboard */

		/** Ignoring handleKeyDown from Jest coverage as it has been
		 * tested with Playwright in tests/e2e/keyboardNavigation.test.ts */

		/* istanbul ignore next */

		function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>, childIndex: number) {
			const prevSibling = childIndex - 1;
			const nextSibling = childIndex + 1;

			const lastSibling = isRequired ? ratingValues.length - 1 : ratingValues.length;

			const isFiringFromLast = lastSibling === childIndex;
			const isFiringFromFirst = childIndex === 0;

			const prevToFocus = isFiringFromFirst ? lastSibling : prevSibling;
			const nextToFocus = isFiringFromLast ? 0 : nextSibling;

			let siblingToFocus = 0;

			switch (event.code) {
				case 'Shift':
					return true;
				case 'Tab':
					if (currentRatingIndex !== childIndex) {
						setTimeout(() => {
							setTabIndex(getTabIndex(tabIndexItems, currentRatingIndex));
						});
					}
					return true;
				case 'Enter':
				case 'Space': {
					event.preventDefault();
					if (!isRequired) {
						if (isFiringFromFirst) {
							onChange?.(0);
						} else {
							onChange?.(ratingValues[childIndex - 1]);
						}
					} else {
						onChange?.(ratingValues[childIndex]);
					}
					break;
				}
				case 'ArrowDown':
				case 'ArrowRight':
					{
						siblingToFocus = !isRTL.current ? nextToFocus : prevToFocus;
						setTabIndex(getTabIndex(tabIndexItems, siblingToFocus));
						radioRefs.current[siblingToFocus].focus();
					}
					break;
				case 'ArrowUp':
				case 'ArrowLeft':
					{
						siblingToFocus = !isRTL.current ? prevToFocus : nextToFocus;
						setTabIndex(getTabIndex(tabIndexItems, siblingToFocus));
						radioRefs.current[siblingToFocus].focus();
					}
					break;
			}

			event.preventDefault();
			event.stopPropagation();
		}

		/* Group props */

		const groupClassNames = getGroupClassNames({
			className: userClassNames,
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
		});

		function getGroupAriaProps() {
			if (readOnly === false) {
				const isAriaRequired = isRequired === true && isDisabled === false;
				const ariaProps: React.HTMLProps<HTMLDivElement> = {
					role: 'radiogroup',
					'data-rating-value': `${ratingValue}`,
					'aria-required': isAriaRequired,
				};

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

		function getMouseProps(childIndex: number): React.HTMLProps<HTMLDivElement> {
			return {
				onClick: (event) => handleClick(event, childIndex),
				onMouseEnter: () => handleMouseEnter(childIndex),
				onMouseLeave: handleMouseLeave,
			};
		}

		function getKeyboardProps(childIndex: number): React.HTMLProps<HTMLDivElement> {
			return {
				tabIndex: tabIndex[childIndex],
				onKeyDown: /* istanbul ignore next */ (event) => handleKeyDown(event, childIndex),
			};
		}

		function getRadioProps(childIndex: number): React.HTMLProps<HTMLDivElement> {
			const labelProps: React.HTMLProps<HTMLDivElement> = {};
			const radioLabels = Array.isArray(invisibleItemLabels)
				? invisibleItemLabels
				: ratingValues.map((_, index: number) => `Rate ${ratingValues[index]}`);

			if (Array.isArray(visibleItemLabelIds)) {
				labelProps['aria-labelledby'] = visibleItemLabelIds[childIndex];
			} else {
				labelProps['aria-label'] = radioLabels?.[childIndex];
			}

			if (isDisabled === true) {
				labelProps['aria-disabled'] = 'true';
			}

			return {
				role: 'radio',
				'aria-checked': ratingValues[childIndex] === ratingValue,
				...(isDisabled === false ? getMouseProps(childIndex) : {}),
				...labelProps,
			};
		}

		function getRefsFn(childIndex: number) {
			return {
				ref: (childNode: HTMLDivElement) => (radioRefs.current[childIndex] = childNode),
			};
		}

		/* SVG props */

		function getRatingItemProps(childNodeIndex: number): RatingItemProps {
			const sharedProps = {
				itemShapes: Array.isArray(itemShapes) ? itemShapes[childNodeIndex] : itemShapes,
				itemStrokeWidth: absoluteStrokeWidth,
				orientation,
				hasHF: false,
				testId: getSvgTestIds(childNodeIndex),
			};
			if (deservesHF && absoluteHFMode === HFProps.SVG) {
				sharedProps.hasHF = childNodeIndex === currentRatingIndex;
			}
			return sharedProps;
		}

		/* Render */

		return (
			<div
				ref={externalRef}
				id={id}
				className={groupClassNames}
				style={{ ...style, ...styles.staticCssVars }}
				{...getGroupAriaProps()}
				{...devTestId}
			>
				{ratingValues.map((_, starIndex) => (
					<Fragment key={`rr_key_${starIndex}`}>
						{!isRequired && starIndex === 0 && (
							<div
								className="rr--reset"
								aria-label="No rating"
								role="radio"
								{...(!readOnly ? getRefsFn(0) : {})}
								{...(!readOnly ? getKeyboardProps(0) : {})}
							/>
						)}
						<div
							className={`${RatingClasses.BOX} ${styles.dynamicClassNames[starIndex]}`}
							style={styles?.dynamicCssVars?.[starIndex]}
							{...(!readOnly ? getRadioProps(starIndex) : {})}
							{...(isDynamic ? getKeyboardProps(incrementIndex(starIndex)) : {})}
							{...(isDynamic ? getRefsFn(incrementIndex(starIndex)) : {})}
							{...getRadioTestIds(starIndex)}
						>
							<RatingItem {...getRatingItemProps(starIndex)} />
						</div>
					</Fragment>
				))}
			</div>
		);
	}
);

Rating.displayName = 'Rating';
