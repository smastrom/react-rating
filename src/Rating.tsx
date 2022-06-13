import React, { forwardRef, useRef, useState, useEffect } from 'react';

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
  useIsomorphicLayoutEffect,
  getUniqueId,
  isGraphicalValueInteger,
} from './utils';

import { RatingProps, ItemStylesProp, Rating as RatingComponent } from './exportedTypes';
import {
  StylesState,
  CSSClassName,
  MaybeEmptyCSSClassName,
  RequireAtLeastOne,
  ValidArrayColors,
  TabIndex,
} from './internalTypes';

const Star = (
  <polygon points="478.53 189 318.53 152.69 239.26 0 160 152.69 0 189 111.02 303.45 84 478.53 239.26 396.63 394.53 478.53 367.51 303.45 478.53 189" />
);

export const defaultItemStyles: ItemStylesProp = {
  svgChildNodes: Star,
  itemStrokeWidth: 40,
  activeFillColor: '#ffb23f',
  inactiveFillColor: '#FFF7ED',
  activeStrokeColor: '#e17b21',
  inactiveStrokeColor: '#eda76a',
};

export const Rating: typeof RatingComponent = forwardRef<HTMLDivElement, RatingProps>(
  function RatingParent /* Named function is required for DevTools and Playwright tests */(
    {
      value = undefined,
      limit = 5,
      readOnly = false,
      onChange,
      onHoverChange,
      highlightOnlySelected = false,
      enableKeyboard = true,
      orientation = 'horizontal',
      spaceBetween = 'small',
      spaceInside = 'small',
      radius = 'none',
      transition = 'colors',
      itemStyles = defaultItemStyles,
      isRequired = true,
      halfFillMode = 'svg',
      labelledBy,
      accessibleLabels,
      accessibleLabel = readOnly === false ? 'Rating' : `Rated ${value} on ${limit}`,
      id,
      className,
      style,
    },
    externalRef
  ) {
    const { svgChildNodes, itemStrokeWidth, boxBorderWidth, ...colors } = itemStyles;

    /* Prevent rendering */

    const { shouldRender, errorReason } = getErrors(
      limit,
      value,
      readOnly,
      highlightOnlySelected,
      onChange,
      svgChildNodes
    );

    if (!shouldRender) {
      console.error(errorReason);
      return null;
    }

    /* Rating value helpers */

    const ratingValues = Array.from(Array(limit), (_, index) => index + 1);

    const hasPrecision = readOnly && !Number.isInteger(value);
    const isEligibleForHalfFill = hasPrecision && !highlightOnlySelected;
    const isNotEligibleForHalfFill = hasPrecision && highlightOnlySelected;

    const ratingValue = (
      isNotEligibleForHalfFill ? Math.round(value as number) : value
    ) as number;
    const currentRatingIndex = isEligibleForHalfFill
      ? getIntersectionIndex(ratingValues, ratingValue)
      : ratingValues.indexOf(ratingValue);

    const deservesHalfFill = isEligibleForHalfFill && !isGraphicalValueInteger(ratingValue);

    /* CSS helpers */

    const absoluteStrokeWidth = isValidPositiveNumber(itemStrokeWidth)
      ? (itemStrokeWidth as number)
      : 0;
    const absoluteBoxBorderWidth = isValidPositiveNumber(boxBorderWidth)
      ? (boxBorderWidth as number)
      : 0;
    const absoluteHalfFillMode = halfFillMode === 'box' ? 'box' : 'svg';

    const { staticColors, arrayColors } = getColors(
      colors,
      absoluteStrokeWidth,
      deservesHalfFill,
      absoluteHalfFillMode
    );

    const hasArrayColors = Object.keys(arrayColors).length > 0;

    console.log(Object.entries({}).length);

    /* Refs */

    const uniqueLabelsIds = useRef<string[] | []>([]);
    const roleRadioDivs = useRef<HTMLDivElement[] | []>([]);

    /* State getters */

    const getStaticStyles = () => ({
      staticCssVars: getStaticCssVars(staticColors, absoluteBoxBorderWidth),
    });

    const getDynamicClassNames = (currentSelectedIndex: number) => {
      if (deservesHalfFill) {
        return getHalfFillClassNames(ratingValue, ratingValues, absoluteHalfFillMode);
      }
      return getActiveClassNames(highlightOnlySelected, ratingValues, currentSelectedIndex);
    };

    const getDynamicStyles = () => ({
      dynamicClassNames: getDynamicClassNames(currentRatingIndex),
      dynamicCssVars:
        hasArrayColors && ratingValue >= 0.25
          ? getDynamicCssVars(
              arrayColors as RequireAtLeastOne<ValidArrayColors>,
              currentRatingIndex,
              highlightOnlySelected
            )
          : [],
    });

    /* State */

    const [styles, setStyles] = useState<StylesState>({
      ...getStaticStyles(),
      ...getDynamicStyles(),
    });

    const [tabIndex, setTabIndex] = useState<TabIndex[] | []>(() => {
      if (!readOnly && enableKeyboard === true) {
        return getTabIndex(ratingValues, currentRatingIndex);
      }
      return [];
    });

    /* Effects */

    useIsomorphicLayoutEffect(() => {
      if (!readOnly && uniqueLabelsIds.current.length === 0) {
        uniqueLabelsIds.current = ratingValues.map(() => getUniqueId());
      }
    }, []);

    useEffect(() => {
      setStyles({ ...getStaticStyles(), ...getDynamicStyles() });
    }, [
      ratingValue,
      itemStyles,
      boxBorderWidth,
      halfFillMode,
      orientation,
      highlightOnlySelected,
      limit,
    ]);

    useEffect(() => {
      if (!readOnly && enableKeyboard === true) {
        setTabIndex(getTabIndex(ratingValues, currentRatingIndex));
      }
    }, [ratingValue]);

    /* Mouse handlers */

    const handleClick = (event: React.MouseEvent<HTMLDivElement>, clickedIndex: number) => {
      event.preventDefault();
      event.stopPropagation();
      onChange(ratingValues[clickedIndex]);
    };

    const handleMouseEnter = (hoveredIndex: number) => {
      if (typeof onHoverChange === 'function') {
        onHoverChange(ratingValues[hoveredIndex]);
      }

      const dynamicClassNames = getDynamicClassNames(hoveredIndex);
      const dynamicCssVars = hasArrayColors
        ? getDynamicCssVars(
            arrayColors as RequireAtLeastOne<ValidArrayColors>,
            hoveredIndex,
            highlightOnlySelected
          )
        : [];

      setStyles({ ...styles, dynamicCssVars, dynamicClassNames });
    };

    const handleMouseLeave = () => {
      if (typeof onHoverChange === 'function') {
        onHoverChange(0);
      }

      const dynamicClassNames = getDynamicClassNames(currentRatingIndex);
      const dynamicCssVars =
        hasArrayColors && ratingValue >= 0.25
          ? getDynamicCssVars(
              arrayColors as RequireAtLeastOne<ValidArrayColors>,
              currentRatingIndex,
              highlightOnlySelected
            )
          : [];

      setStyles({ ...styles, dynamicCssVars, dynamicClassNames });
    };

    /* Keyboard handler */

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, childIndex: number) => {
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
              setTabIndex(getTabIndex(ratingValues, currentRatingIndex));
            });
          }
          return true;
        case 'Enter':
        case 'Space': {
          if (childIndex !== currentRatingIndex) {
            return onChange(ratingValues[childIndex]);
          }
          return onChange(0);
        }
        case 'ArrowDown':
        case 'ArrowRight':
          {
            const siblingToFocus = isEventFiringFromLastItem ? 0 : nextSibling;
            setTabIndex(getTabIndex(ratingValues, siblingToFocus));
            roleRadioDivs.current[siblingToFocus].focus();
          }
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          {
            const siblingToFocus = isEventFiringFromFistItem ? lastSibling : previousSibling;
            setTabIndex(getTabIndex(ratingValues, siblingToFocus));
            roleRadioDivs.current[siblingToFocus].focus();
          }
          break;
      }

      event.preventDefault();
      event.stopPropagation();
    };

    /* Radio-group props */

    const getClassNames = (): string => {
      const cursorClassName: MaybeEmptyCSSClassName = !readOnly ? 'rar--pointer' : '';
      const orientationClassName: CSSClassName = `rar--dir-${
        orientation === 'vertical' ? 'y' : 'x'
      }`;
      const radiusClassName =
        typeof radius === 'string' && radius !== 'none' ? getRadiusClassName(radius) : '';
      const borderClassName: MaybeEmptyCSSClassName =
        absoluteBoxBorderWidth > 0 ? 'rar--has-border' : '';
      const strokeClassName: MaybeEmptyCSSClassName =
        absoluteStrokeWidth > 0 ? 'rar--has-stroke' : '';
      const transitionClassName =
        !readOnly && transition !== 'none' ? getTransitionClassNames(transition) : '';
      const gapClassName =
        typeof spaceBetween === 'string' && spaceBetween !== 'none'
          ? getGapClassName(spaceBetween)
          : '';
      const paddingClassName =
        typeof spaceInside === 'string' && spaceBetween !== 'none'
          ? getPaddingClassName(spaceInside)
          : '';

      return `rar--group ${orientationClassName} ${strokeClassName} ${borderClassName}
      ${transitionClassName} ${radiusClassName} ${cursorClassName} ${gapClassName}
      ${paddingClassName} ${className || ''}`
        .replace(/  +/g, ' ')
        .trimEnd();
    };

    /* Radios */

    const getKeyboardProps = (childIndex: number): React.HTMLProps<HTMLDivElement> => {
      if (enableKeyboard === true) {
        return {
          'aria-checked': ratingValues[childIndex] === ratingValue,
          tabIndex: tabIndex[childIndex],
          onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) =>
            handleKeyDown(event, childIndex),
        };
      }
      return {};
    };

    const getRadioProps = (childIndex: number): React.HTMLProps<HTMLDivElement> => {
      if (!readOnly) {
        return {
          role: 'radio',
          'aria-labelledby': `rar_label_${uniqueLabelsIds.current[childIndex]}`,
          ref: (radioChildNode: HTMLDivElement) =>
            (roleRadioDivs.current[childIndex] = radioChildNode),
          onClick: (event: React.MouseEvent<HTMLDivElement>) => handleClick(event, childIndex),
          onMouseEnter: () => handleMouseEnter(childIndex),
          onMouseLeave: handleMouseLeave,
          ...getKeyboardProps(childIndex),
        };
      }
      return {};
    };

    const getRatingAriaProps = (): React.HTMLProps<HTMLDivElement> => {
      if (!readOnly) {
        const ariaProps: React.HTMLProps<HTMLDivElement> = {
          role: 'radiogroup',
          'aria-required': isRequired === true,
        };
        if (typeof labelledBy === 'string' && labelledBy.length > 0) {
          ariaProps['aria-labelledby'] = labelledBy;
        } else {
          ariaProps['aria-label'] = accessibleLabel;
        }
        return ariaProps;
      }
      return {
        role: 'img',
        'aria-label': accessibleLabel,
      };
    };

    /* SVG */

    const getSvgRatingItemProps = (childNodeIndex: number) => {
      const sharedProps = {
        svgChildNodes: Array.isArray(svgChildNodes)
          ? svgChildNodes[childNodeIndex]
          : svgChildNodes,
        itemStrokeWidth: absoluteStrokeWidth,
        hasHalfFill: false,
      };
      if (deservesHalfFill && absoluteHalfFillMode === 'svg') {
        sharedProps.hasHalfFill = childNodeIndex === currentRatingIndex;
      }
      return sharedProps;
    };

    /* Labels */

    const getRadioLabels = () =>
      Array.isArray(accessibleLabels)
        ? accessibleLabels
        : ratingValues.map((_, index: number) => `Rate ${ratingValues[index]}`);

    /* Render */

    return (
      <div
        ref={externalRef}
        id={id}
        style={{ ...style, ...styles.staticCssVars }}
        className={getClassNames()}
        {...getRatingAriaProps()}
      >
        {/* */}
        {/* */}
        {/* Box */}
        {ratingValues.map((_, childIndex) => (
          <div
            key={`rar_box_${childIndex}`}
            className={`rar--box ${styles.dynamicClassNames[childIndex]}`}
            style={styles?.dynamicCssVars?.[childIndex]}
            {...getRadioProps(childIndex)}
          >
            {/* */}
            {/* */}
            {/* SVG */}
            <RatingItem {...getSvgRatingItemProps(childIndex)} />
            {/* */}
            {/* */}
            {/* Labels */}
            {!readOnly && (
              <span
                className="rar--hidden"
                id={`rar_label_${uniqueLabelsIds.current[childIndex]}`}
              >
                {getRadioLabels()?.[childIndex]}
              </span>
            )}
          </div>
        ))}
        {/* */}
        {/* */}
        {/* */}
      </div>
    );
  }
);
