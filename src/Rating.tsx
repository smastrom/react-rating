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
	isRTLDir,
	useIsomorphicLayoutEffect,
	noop,
	getResetTestId,
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
	MouseEvent,
	FocusEvent,
	HTMLProps,
	MutableRef,
} from './internalTypes';

/** Thank you for using **React Rating**.
 * Visit https://github.com/smastrom/react-rating to read the full documentation. */
export const Rating: typeof RatingComponent = forwardRef<HTMLDivElement, RatingProps>(
	(
		{
			value,
			items = 5,
			readOnly = false,
			onChange,
			onHoverChange,
			onFocus = noop,
			onBlur = noop,
			isDisabled = false,
			highlightOnlySelected = false,
			orientation = OrientationProps.HORIZONTAL,
			spaceBetween = Sizes.NONE,
			spaceInside = Sizes.SMALL,
			radius = Sizes.NONE,
			transition = TransitionProps.COLORS,
			itemStyles = defaultItemStyles,
			isRequired = false,
			halfFillMode = HFProps.SVG,
			visibleLabelId,
			visibleItemLabelIds,
			invisibleLabel = !readOnly ? 'Rating' : `Rated ${value} on ${items}`,
			invisibleItemLabels,
			resetLabel = 'No rating',
			id,
			className,
			style,
		},
		externalRef
	) => {
		/* Helpers */

		const incrementIfReset = (index: number) => (isRequired ? index : index + 1);
		const incrementIfRequired = (index: number) => (isRequired ? index + 1 : index);

		const ratingValues = Array.from({ length: items }, (_, index) => index + 1);
		const hasPrecision = readOnly && !Number.isInteger(value);
		const isEligibleForHF = hasPrecision && !highlightOnlySelected;
		const isNotEligibleForHF = hasPrecision && highlightOnlySelected;
		const ratingValue = isNotEligibleForHF ? Math.round(value) : value;
		const isDynamic = !readOnly && !isDisabled;
		const needsDynamicCssVars = ratingValue >= 0.25;
		const userClassNames = typeof className === 'string' ? className : '';
		const absoluteHFMode = halfFillMode === HFProps.BOX ? HFProps.BOX : HFProps.SVG;
		const deservesHF = isEligibleForHF && !isGraphicalValueInteger(ratingValue);
		const shouldRenderReset = !isRequired && !readOnly;
		const tabIndexItems = incrementIfReset(items);
		const activeStarIndex = isEligibleForHF
			? getIntersectionIndex(ratingValues, ratingValue)
			: ratingValues.indexOf(ratingValue);
		const activeTabIndex = incrementIfReset(activeStarIndex);

		/* Deps/Callbacks */

		const {
			staticColors,
			arrayColors,
			itemShapes,
			absoluteStrokeWidth,
			absoluteBoxBorderWidth,
		} = useMemo(() => {
			const { itemShapes, itemStrokeWidth, boxBorderWidth, ...colors } = itemStyles;
			const userColors = getColors(colors);
			return {
				itemShapes,
				absoluteStrokeWidth: getNumber(itemStrokeWidth),
				absoluteBoxBorderWidth: getNumber(boxBorderWidth),
				...userColors,
			};
		}, [itemStyles]);

		const hasArrayColors = Object.keys(arrayColors).length > 0;

		const getDynamicStyles = useCallback(
			(starIndex: number, shouldGetCssVars: boolean) => ({
				dynamicClassNames: deservesHF
					? getHFClassNames(ratingValue, items, absoluteHFMode)
					: getActiveClassNames(highlightOnlySelected, items, starIndex),
				dynamicCssVars:
					shouldGetCssVars && hasArrayColors
						? getDynamicCssVars(
								arrayColors as RequireAtLeastOne<ValidArrayColors>,
								starIndex,
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
			() => setTabIndex(getTabIndex(tabIndexItems, activeTabIndex)),
			[activeTabIndex, tabIndexItems]
		);

		/* Refs */

		const skipStylesMount = useRef(true);
		const skipTabMount = useRef(true);
		const wrapperRef = useRef<HTMLDivElement>(null);
		const radioRefs = useRef<HTMLDivElement[]>([]);
		const isRTL = useRef(false);

		/* State */

		const [styles, setStyles] = useState<StylesState>({
			staticCssVars: getStaticCssVars(staticColors, absoluteBoxBorderWidth),
			...getDynamicStyles(activeStarIndex, needsDynamicCssVars),
		});

		const [tabIndex, setTabIndex] = useState<TabIndex[]>(() => {
			if (isDynamic) {
				return getTabIndex(tabIndexItems, activeTabIndex);
			}
			return [];
		});

		/* Effects */

		useIsomorphicLayoutEffect(() => {
			if (isDynamic && radioRefs.current) {
				isRTL.current = isRTLDir(radioRefs.current[0]);
			}
		}, [isDynamic]);

		useEffect(() => {
			if (!skipStylesMount.current) {
				return setStyles({
					staticCssVars: getStaticCssVars(staticColors, absoluteBoxBorderWidth),
					...getDynamicStyles(activeStarIndex, needsDynamicCssVars),
				});
			}
			skipStylesMount.current = false;
		}, [
			staticColors,
			getDynamicStyles,
			absoluteBoxBorderWidth,
			activeStarIndex,
			needsDynamicCssVars,
		]);

		useEffect(() => {
			if (!skipTabMount.current && isDynamic) {
				return saveTabIndex();
			}
			skipTabMount.current = false;
		}, [isDynamic, saveTabIndex]);

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
			event: FocusEvent | MouseEvent,
			fromOutsideCallback: () => void,
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			fromInsideCallback: () => void = () => {}
		) {
			const fromInside = radioRefs.current.some((radio) => radio === event.relatedTarget);
			if (!fromInside) {
				fromOutsideCallback();
			} else {
				fromInsideCallback();
			}
		}

		function handleStarLeave() {
			onHoverChange?.(0);
			setTimeout(() => saveTabIndex());
		}

		function handleClick(event: MouseEvent, clickedIndex: number) {
			event.stopPropagation();

			if (!isRequired && activeStarIndex === clickedIndex) {
				onChange?.(0);
			} else {
				onChange?.(clickedIndex + 1);
			}
		}

		function handleMouseEnter(hoveredIndex: number) {
			onHoverChange?.(hoveredIndex + 1);
			setStyles({ ...styles, ...getDynamicStyles(hoveredIndex, true) });
		}

		function handleMouseLeave(event: MouseEvent) {
			handleWhenNeeded(event, () => {
				handleStarLeave();
			});
			setStyles({ ...styles, ...getDynamicStyles(activeStarIndex, needsDynamicCssVars) });
		}

		function handleBlur(event: FocusEvent) {
			handleWhenNeeded(event, () => {
				handleStarLeave();
				onBlur();
			});
		}

		function handleFocus(event: FocusEvent, childIndex: number) {
			handleWhenNeeded(
				event,
				() => {
					onFocus();
					onHoverChange?.(incrementIfRequired(childIndex));
				},
				() => {
					onHoverChange?.(incrementIfRequired(childIndex));
				}
			);
		}

		/* Keyboard */

		/** Ignoring keyboard handlers from Vitest coverage as they have been
		 * tested with Playwright in tests/e2e/keyboardNavigation.test.ts */

		/* c8 ignore start */
		function handleArrowNav(siblingToFocus: number) {
			setTabIndex(getTabIndex(tabIndexItems, siblingToFocus));
			radioRefs.current[siblingToFocus].focus();
		}
		/* c8 ignore stop */

		/* c8 ignore start */
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
				case 'Shift':
				case 'Tab':
					return true;

				case 'ArrowDown':
				case 'ArrowRight':
					siblingToFocus = !isRTL.current ? nextToFocus : prevToFocus;
					return handleArrowNav(siblingToFocus);

				case 'ArrowUp':
				case 'ArrowLeft':
					siblingToFocus = !isRTL.current ? prevToFocus : nextToFocus;
					return handleArrowNav(siblingToFocus);

				case 'Enter':
				case 'Space':
					event.preventDefault();
					return onChange?.(incrementIfRequired(childIndex));
			}

			event.preventDefault();
			event.stopPropagation();
		}
		/* c8 ignore stop */

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

		function getAriaGroupProps() {
			if (!readOnly) {
				const isAriaRequired = isRequired && !isDisabled;
				const ariaProps: HTMLProps = {
					role: 'radiogroup',
					'data-value': `${ratingValue}`,
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

		function pushGroupRefs(element: HTMLDivElement) {
			if (isDynamic && !isRequired) {
				(wrapperRef as MutableRef).current = element;
			}
			if (externalRef) {
				(externalRef as MutableRef).current = element;
			}
		}

		/* Radio props */

		function getRefs(childIndex: number) {
			return {
				ref: (childNode: HTMLDivElement) => (radioRefs.current[childIndex] = childNode),
			};
		}

		function getKeyboardProps(childIndex: number): HTMLProps {
			return {
				tabIndex: tabIndex[childIndex],
				/* c8 ignore next */
				onKeyDown: (event) => handleKeyDown(event, childIndex),
			};
		}

		function getMouseProps(starIndex: number): HTMLProps {
			return {
				onClick: (event) => handleClick(event, starIndex),
				onMouseEnter: () => handleMouseEnter(starIndex),
				onMouseLeave: handleMouseLeave,
			};
		}

		function getAriaRadioProps(starIndex: number): HTMLProps {
			if (readOnly) {
				return {};
			}

			const labelProps: HTMLProps = {};
			const radioLabels = Array.isArray(invisibleItemLabels)
				? invisibleItemLabels
				: ratingValues.map((_, index: number) => `Rate ${index + 1}`);

			if (Array.isArray(visibleItemLabelIds)) {
				labelProps['aria-labelledby'] = visibleItemLabelIds[starIndex];
			} else {
				labelProps['aria-label'] = radioLabels[starIndex];
			}

			if (isDisabled) {
				labelProps['aria-disabled'] = 'true';
			}

			return {
				role: 'radio',
				'aria-checked': starIndex + 1 === ratingValue,
				...labelProps,
			};
		}

		function getInteractiveRadioProps(starIndex: number): HTMLProps {
			if (!isDynamic) {
				return {};
			}

			const radioIndex = incrementIfReset(starIndex);

			return {
				...getRefs(radioIndex),
				...getKeyboardProps(radioIndex),
				...getMouseProps(starIndex),
				onFocus: (event) => handleFocus(event, radioIndex),
				onBlur: (event) => handleBlur(event),
			};
		}

		function getResetProps(): HTMLProps {
			let resetProps: HTMLProps = {
				className: RatingClasses.RESET,
				role: 'radio',
				'aria-label': resetLabel,
				'aria-checked': ratingValue === 0,
				...getResetTestId(),
			};

			if (isDynamic) {
				resetProps = {
					...resetProps,
					...getKeyboardProps(0),
					...getRefs(0),
					onFocus: (event) => {
						handleFocus(event, 0);
						wrapperRef?.current?.classList.add(RatingClasses.GROUP_RESET);
					},
					onBlur: (event) => {
						handleBlur(event);
						wrapperRef?.current?.classList.remove(RatingClasses.GROUP_RESET);
					},
				};
			}

			if (isDisabled) {
				resetProps['aria-disabled'] = 'true';
			}

			return resetProps;
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
				sharedProps.hasHF = starIndex === activeStarIndex;
			}
			return sharedProps;
		}

		/* Render */

		return (
			<div
				id={id}
				className={groupClassNames}
				style={{ ...style, ...styles.staticCssVars }}
				ref={pushGroupRefs}
				{...getAriaGroupProps()}
				{...devTestId}
			>
				{ratingValues.map((value, index) => (
					<Fragment key={value}>
						{shouldRenderReset && index === 0 && <div {...getResetProps()} />}
						<div
							className={`${RatingClasses.BOX} ${styles.dynamicClassNames[index]}`}
							style={styles?.dynamicCssVars?.[index]}
							{...getAriaRadioProps(index)}
							{...getInteractiveRadioProps(index)}
							{...getRadioTestIds(index)}
						>
							<RatingItem {...getRatingItemProps(index)} />
						</div>
					</Fragment>
				))}
			</div>
		);
	}
);

Rating.displayName = 'Rating';
