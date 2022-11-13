import {
	forwardRef,
	useMemo,
	useCallback,
	useRef,
	useState,
	useEffect,
	Fragment,
	KeyboardEvent,
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
	getRadioTestIds,
	getSvgTestIds,
	devTestId,
	getResetTestId,
	isGraphicalValueInteger,
	isRTLDir,
	useIsomorphicLayoutEffect,
	noop,
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
			onChange = noop,
			onHoverChange = noop,
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
		const tabIndexItems = isRequired ? items : items + 1;
		const activeStarIndex = isEligibleForHF
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
			() => setTabIndex(getTabIndex(tabIndexItems, activeStarIndex, !isRequired)),
			[activeStarIndex, tabIndexItems, isRequired]
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
				return getTabIndex(tabIndexItems, activeStarIndex, !isRequired);
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

		/* Log critical errors, return null */

		const { shouldRender, reason } = getErrors({
			items,
			itemShapes,
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
			const fromInside = radioRefs.current.some(
				(radio) => radio === event.relatedTarget
			);
			if (!fromInside) {
				fromOutsideCallback();
			} else {
				fromInsideCallback();
			}
		}

		function handleStarLeave() {
			onHoverChange(0);
			saveTabIndex();
		}

		function handleStarClick(event: MouseEvent, clickedIndex: number) {
			event.stopPropagation();

			if (!isRequired && activeStarIndex === clickedIndex) {
				onChange?.(0);
			} else {
				onChange?.(clickedIndex + 1);
			}
		}

		function handleMouseEnter(starIndex: number) {
			onHoverChange(starIndex + 1);
			setStyles({ ...styles, ...getDynamicStyles(starIndex, true) });
		}

		function handleMouseLeave(event: MouseEvent) {
			handleWhenNeeded(event, () => {
				handleStarLeave();
			});
			setStyles({
				...styles,
				...getDynamicStyles(activeStarIndex, needsDynamicCssVars),
			});
		}

		function handleBlur(event: FocusEvent) {
			handleWhenNeeded(event, () => {
				handleStarLeave();
				onBlur();
			});
		}

		function handleFocus(event: FocusEvent, childIndex: number) {
			const isResetBtn = !isRequired && childIndex === ratingValues.length;
			const hoveredValue = isResetBtn ? 0 : childIndex + 1;

			handleWhenNeeded(
				event,
				() => {
					onFocus();
					onHoverChange(hoveredValue);
				},
				() => {
					onHoverChange(hoveredValue);
				}
			);
		}

		/* Keyboard */

		function handleArrowNav(siblingToFocus: number) {
			setTabIndex(getTabIndex(tabIndexItems, siblingToFocus, !isRequired));
			radioRefs.current[siblingToFocus].focus();
		}

		function handleKeyDown(event: KeyboardEvent<HTMLDivElement>, childIndex: number) {
			let siblingToFocus = 0;

			const lastSibling = isRequired ? ratingValues.length - 1 : ratingValues.length;
			const prevSibling = childIndex - 1;
			const nextSibling = childIndex + 1;

			const isResetBtn = !isRequired && childIndex === ratingValues.length;
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
					return onChange?.(isResetBtn ? 0 : childIndex + 1);
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

		function getAriaGroupProps() {
			if (!readOnly) {
				const isAriaRequired = isRequired && !isDisabled;
				const ariaProps: HTMLProps = {
					role: 'radiogroup',
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
				ref: (childNode: HTMLDivElement) =>
					(radioRefs.current[childIndex] = childNode),
			};
		}

		function getKeyboardProps(childIndex: number): HTMLProps {
			return {
				tabIndex: tabIndex[childIndex],
				onKeyDown: (event) => handleKeyDown(event, childIndex),
			};
		}

		function getMouseProps(starIndex: number): HTMLProps {
			return {
				onClick: (event) => handleStarClick(event, starIndex),
				onMouseEnter: () => handleMouseEnter(starIndex),
				onMouseLeave: handleMouseLeave,
			};
		}

		function getAriaRadioProps(starIndex: number): HTMLProps {
			if (readOnly) {
				return {};
			}

			const labelProps: HTMLProps = {};

			if (Array.isArray(visibleItemLabelIds)) {
				labelProps['aria-labelledby'] = visibleItemLabelIds[starIndex];
			} else {
				const radioLabels = Array.isArray(invisibleItemLabels)
					? invisibleItemLabels
					: ratingValues.map((_, index: number) => `Rate ${index + 1}`);
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

			return {
				...getRefs(starIndex),
				...getKeyboardProps(starIndex),
				...getMouseProps(starIndex),
				onFocus: (event) => handleFocus(event, starIndex),
				onBlur: (event) => handleBlur(event),
			};
		}

		function getResetProps(childIndex: number): HTMLProps {
			return {
				className: RatingClasses.RESET,
				role: 'radio',
				'aria-label': resetLabel,
				'aria-checked': ratingValue === 0,
				onClick: () => onChange?.(0),
				onFocus: (event) => {
					handleFocus(event, childIndex);
					wrapperRef.current?.classList.add(RatingClasses.GROUP_RESET);
				},
				onBlur: (event) => {
					handleBlur(event);
					wrapperRef.current?.classList.remove(RatingClasses.GROUP_RESET);
				},
				...getResetTestId(),
				...getKeyboardProps(childIndex),
				...getRefs(childIndex),
				...(isDisabled ? { 'aria-disabled': 'true' } : {}),
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
						<div
							className={`${RatingClasses.BOX} ${styles.dynamicClassNames[index]}`}
							style={styles.dynamicCssVars[index]}
							{...getAriaRadioProps(index)}
							{...getInteractiveRadioProps(index)}
							{...getRadioTestIds(index)}
						>
							<RatingItem {...getRatingItemProps(index)} />
						</div>
						{shouldRenderReset && index === ratingValues.length - 1 && (
							<div {...getResetProps(index + 1)} />
						)}
					</Fragment>
				))}
			</div>
		);
	}
);

Rating.displayName = 'Rating';
