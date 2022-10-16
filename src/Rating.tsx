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
	isRTL as isRTLDir,
	useIsomorphicLayoutEffect,
} from './utils';
import { Sizes, OrientationProps, TransitionProps, HFProps, RatingClasses } from './constants';
import { defaultItemStyles } from './defaultItemStyles';
import {
	RatingProps,
	Rating as RatingComponent,
	RatingChange,
	HoverChange,
} from './exportedTypes';
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

		const adjustIndex = (index: number) => (isRequired ? index : index + 1);

		const ratingValues = Array.from({ length: items }, (_, index) => index + 1);
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

		const tabIndexItems = adjustIndex(items);
		const currentStarIndex = isEligibleForHF
			? getIntersectionIndex(ratingValues, ratingValue)
			: ratingValues.indexOf(ratingValue);
		const currentRatingIndex = adjustIndex(currentStarIndex);

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

		const saveTabIndex = useCallback(
			() => setTabIndex(getTabIndex(tabIndexItems, currentRatingIndex)),
			[currentRatingIndex, tabIndexItems]
		);

		/* Refs */

		const skipStylesMount = useRef(true);
		const skipTabMount = useRef(true);
		const radioRefs = useRef<HTMLDivElement[]>([]);
		const isRTL = useRef(false);

		/* State */

		const [styles, setStyles] = useState<StylesState>({
			staticCssVars: getStaticCssVars(staticColors, absoluteBoxBorderWidth),
			...getDynamicStyles(currentStarIndex, needsDynamicCssVars),
		});

		const [tabIndex, setTabIndex] = useState<TabIndex[]>(() => {
			if (isDynamic) {
				return getTabIndex(tabIndexItems, currentRatingIndex);
			}
			return [];
		});

		/* Effects */

		useIsomorphicLayoutEffect(() => {
			if (isDynamic && radioRefs?.current) {
				isRTL.current = isRTLDir(radioRefs.current[0]);
			}
		}, [isDynamic]);

		useEffect(() => {
			if (!skipStylesMount.current) {
				return setStyles({
					staticCssVars: getStaticCssVars(staticColors, absoluteBoxBorderWidth),
					...getDynamicStyles(currentStarIndex, needsDynamicCssVars),
				});
			}
			skipStylesMount.current = false;
		}, [
			staticColors,
			getDynamicStyles,
			absoluteBoxBorderWidth,
			currentStarIndex,
			needsDynamicCssVars,
		]);

		useEffect(() => {
			if (!skipTabMount.current && isDynamic) {
				return saveTabIndex();
			}
			skipTabMount.current = false;
		}, [isDynamic, currentRatingIndex, tabIndexItems, saveTabIndex]);

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

		/* Event Handlers */

		function handleWhenNeeded(
			event: React.FocusEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
			relatedCallback: () => void,
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			unrelatedCallback: () => void = () => {}
		) {
			const isStarRelated = radioRefs.current.some((radio) => radio === event.relatedTarget);
			if (!isStarRelated) {
				relatedCallback();
			} else {
				unrelatedCallback();
			}
		}

		function handleClick(event: React.MouseEvent<HTMLDivElement>, starIndex: number) {
			event.stopPropagation();

			if (!isRequired && currentStarIndex === starIndex) {
				onChange?.(0);
			} else {
				onChange?.(ratingValues[starIndex]);
			}
		}

		function handleStarBlur() {
			if (hasHoverChange) {
				onHoverChange(0);
			}
			setTimeout(() => saveTabIndex());
		}

		function handleMouseEnter(starIndex: number) {
			if (hasHoverChange) {
				onHoverChange(ratingValues[starIndex]);
			}
			setStyles({ ...styles, ...getDynamicStyles(starIndex, true) });
		}

		function handleMouseLeave(event: React.MouseEvent<HTMLDivElement>) {
			handleWhenNeeded(event, () => {
				handleStarBlur();
			});
			setStyles({ ...styles, ...getDynamicStyles(currentStarIndex, needsDynamicCssVars) });
		}

		function handleRealBlur(event: React.FocusEvent<HTMLDivElement>) {
			handleWhenNeeded(event, () => {
				handleStarBlur();
			});
		}

		function selectRating(childIndex: number, changeCallback: RatingChange | HoverChange) {
			if (!isRequired) {
				if (childIndex === 0) {
					changeCallback?.(0);
				} else {
					changeCallback?.(ratingValues[childIndex - 1]);
				}
			} else {
				changeCallback?.(ratingValues[childIndex]);
			}
		}

		function handleRealFocus(event: React.FocusEvent<HTMLDivElement>, starIndex: number) {
			handleWhenNeeded(
				event,
				() => {
					if (hasHoverChange) {
						onHoverChange(ratingValues[currentStarIndex]);
					}
				},
				() => {
					if (hasHoverChange) {
						selectRating(starIndex, onHoverChange);
					}
				}
			);
		}

		console.log('currentRatingIndex: ' + currentRatingIndex);
		console.log('currentStarIndex: ' + currentStarIndex);

		/* Keyboard */

		/** Ignoring keyboard handlers from Jest coverage as they have been
		 * tested with Playwright in tests/e2e/keyboardNavigation.test.ts */

		/* istanbul ignore next */
		function handleArrowNav(siblingToFocus: number) {
			setTabIndex(getTabIndex(tabIndexItems, siblingToFocus));
			radioRefs.current[siblingToFocus].focus();
		}

		/* istanbul ignore next */
		function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>, childIndex: number) {
			let siblingToFocus = 0;

			const lastSibling = isRequired ? ratingValues.length - 1 : ratingValues.length;
			const prevSibling = childIndex - 1;
			const nextSibling = childIndex + 1;

			const isFiringFromLast = lastSibling === childIndex;
			const isFiringFromFirst = childIndex === 0;

			const prevToFocus = isFiringFromFirst ? lastSibling : prevSibling;
			const nextToFocus = isFiringFromLast ? 0 : nextSibling;

			switch (event.code) {
				case 'Enter':
				case 'Space': {
					event.preventDefault();
					selectRating(childIndex, onChange as RatingChange);
					break;
				}
				case 'ArrowDown':
				case 'ArrowRight':
					siblingToFocus = !isRTL.current ? nextToFocus : prevToFocus;
					return handleArrowNav(siblingToFocus);

				case 'ArrowUp':
				case 'ArrowLeft':
					siblingToFocus = !isRTL.current ? prevToFocus : nextToFocus;
					return handleArrowNav(siblingToFocus);

				case 'Shift':
					return true;
				case 'Tab':
					return true;
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

		function getRefs(childIndex: number) {
			return {
				ref: (childNode: HTMLDivElement) => (radioRefs.current[childIndex] = childNode),
			};
		}

		function getKeyboardProps(childIndex: number): React.HTMLProps<HTMLDivElement> {
			return {
				tabIndex: tabIndex[childIndex],
				onKeyDown: /* istanbul ignore next */ (event) => handleKeyDown(event, childIndex),
			};
		}

		function getMouseProps(starIndex: number): React.HTMLProps<HTMLDivElement> {
			return {
				onClick: (event) => handleClick(event, starIndex),
				onMouseEnter: () => handleMouseEnter(starIndex),
				onMouseLeave: handleMouseLeave,
			};
		}

		function getRadioProps(starIndex: number): React.HTMLProps<HTMLDivElement> {
			const labelProps: React.HTMLProps<HTMLDivElement> = {};
			const radioLabels = Array.isArray(invisibleItemLabels)
				? invisibleItemLabels
				: ratingValues.map((_, index: number) => `Rate ${ratingValues[index]}`);

			if (Array.isArray(visibleItemLabelIds)) {
				labelProps['aria-labelledby'] = visibleItemLabelIds[starIndex];
			} else {
				labelProps['aria-label'] = radioLabels?.[starIndex];
			}

			if (isDisabled === true) {
				labelProps['aria-disabled'] = 'true';
			}

			return {
				role: 'radio',
				'aria-checked': ratingValues[starIndex] === ratingValue,
				...(isDisabled === false ? getMouseProps(starIndex) : {}),
				...labelProps,
			};
		}

		/* SVG props */

		function getRatingItemProps(starIndex: number): RatingItemProps {
			const sharedProps = {
				itemShapes: Array.isArray(itemShapes) ? itemShapes[starIndex] : itemShapes,
				itemStrokeWidth: absoluteStrokeWidth,
				orientation,
				hasHF: false,
				testId: getSvgTestIds(starIndex),
			};
			if (deservesHF && absoluteHFMode === HFProps.SVG) {
				sharedProps.hasHF = starIndex === currentStarIndex;
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
								{...(!readOnly ? { 'aria-checked': ratingValue === 0 } : {})}
								{...(isDynamic ? getKeyboardProps(0) : {})}
								{...(isDynamic ? getRefs(0) : {})}
								onFocus={(event) => handleRealFocus(event, 0)}
								onBlur={(event) => handleRealBlur(event)}
							/>
						)}
						<div
							className={`${RatingClasses.BOX} ${styles.dynamicClassNames[starIndex]}`}
							style={styles?.dynamicCssVars?.[starIndex]}
							{...(!readOnly ? getRadioProps(starIndex) : {})}
							{...(isDynamic ? getKeyboardProps(adjustIndex(starIndex)) : {})}
							{...(isDynamic ? getRefs(adjustIndex(starIndex)) : {})}
							{...getRadioTestIds(starIndex)}
							onFocus={(event) => handleRealFocus(event, adjustIndex(starIndex))}
							onBlur={(event) => handleRealBlur(event)}
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
