import React, { forwardRef, useRef, useState, useEffect } from 'react';

import { RatingItem } from './RatingItem';
import { getDynamicCssVars } from './getDynamicCssVars';
import { getActiveClassNames } from './getDynamicClassNames';
import { getHalfFillClassNames } from './getDynamicClassNames';
import { getStaticCssVars } from './getStaticCssVars';
import { splitColors } from './splitColors';
import { getErrors } from './getErrors';
import {
  getGapClassName,
  getPaddingClassName,
  getRadiusClassName,
  getTransitionClassNames,
} from './getStaticClassNames';
import {
  isFinalValueFloat,
  getIntersectionIndex,
  isValidPositiveNumber as isValidStroke,
  useIsomorphicLayoutEffect,
  getUniqueId,
} from './utils';

import { RatingProps, ItemStylesProp, Rating as RatingComponent } from './exportedTypes';
import {
  CSSVariables,
  CSSClassName,
  MaybeEmptyCSSClassName,
  RequireAtLeastOne,
  ValidArrayColors,
} from './internalTypes';

const Star = (
  <polygon points="478.53 189 318.53 152.69 239.26 0 160 152.69 0 189 111.02 303.45 84 478.53 239.26 396.63 394.53 478.53 367.51 303.45 478.53 189" />
);

export const defaultItemStyles: ItemStylesProp = {
  svgChildNodes: Star,
  itemStrokeWidth: 25,
  boxBorderWidth: 2,
  // activeFillColor: ['#da1600', '#db711a', '#dcb000', '#61bb00', '#009664'],
  activeFillColor: '#ffb23f',
  inactiveFillColor: '#FFF7ED',
  activeStrokeColor: '#e17b21',
  activeBoxBorderColor: 'red',
  activeBoxColor: 'green',
  inactiveBoxColor: 'blue',
  inactiveStrokeColor: '#eda76a',
};

export const Rating: typeof RatingComponent = forwardRef<HTMLDivElement, RatingProps>(
  (
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
      halfFillMode = 'svg',
      labelledBy,
      accessibleLabels,
      accessibleLabel = readOnly === false ? 'Rating' : `Rated ${value} on ${limit}`,
      id,
      className,
      style,
    },
    externalRef
  ) => {
    const { svgChildNodes, itemStrokeWidth, boxBorderWidth, ...colors } = itemStyles;

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

    const deservesHalfFill = isEligibleForHalfFill && isFinalValueFloat(ratingValue);

    /* CSS helpers */

    const { staticColors, arrayColors } = splitColors(colors);
    const hasArrayColors = Object.keys(arrayColors).length > 0;

    const absoluteStrokeWidth = isValidStroke(itemStrokeWidth) ? itemStrokeWidth : 0;
    const absoluteHalfFillMode = halfFillMode === 'box' ? 'box' : 'svg';

    /* Refs */

    const uniqueLabelsIds = useRef<string[] | []>([]);
    const roleRadioDivs = useRef<HTMLDivElement[] | []>([]);

    /* State getters */

    const getStaticStyles = () => ({
      staticCssVars: getStaticCssVars(
        staticColors,
        boxBorderWidth,
        absoluteStrokeWidth as number,
        deservesHalfFill,
        absoluteHalfFillMode
      ),
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
              absoluteStrokeWidth as number,
              currentRatingIndex,
              highlightOnlySelected,
              absoluteHalfFillMode,
              deservesHalfFill
            )
          : [],
    });

    /* State */

    type StylesState = {
      staticCssVars: CSSVariables;
      dynamicCssVars: CSSVariables[] | [];
      dynamicClassNames: string[];
    };

    const [styles, setStyles] = useState<StylesState>({
      ...getStaticStyles(),
      ...getDynamicStyles(),
    });

    /* Effect */

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
      highlightOnlySelected, // To do: check again the deps
    ]);

    /* Mouse handlers */

    const handleClick = (event: React.MouseEvent<HTMLDivElement>, index: number): void => {
      event.preventDefault();
      event.stopPropagation();
      onChange(ratingValues[index]);
    };

    const handleMouseEnter = (hoveredIndex: number) => {
      if (typeof onHoverChange === 'function') {
        onHoverChange(ratingValues[hoveredIndex]);
      }

      const dynamicClassNames = getDynamicClassNames(hoveredIndex);
      const dynamicCssVars = hasArrayColors
        ? getDynamicCssVars(
            arrayColors as RequireAtLeastOne<ValidArrayColors>,
            absoluteStrokeWidth as number,
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

      const dynamicClassNames = getDynamicClassNames(ratingValues.indexOf(ratingValue));
      const dynamicCssVars =
        hasArrayColors && ratingValue >= 0.25
          ? getDynamicCssVars(
              arrayColors as RequireAtLeastOne<ValidArrayColors>,
              absoluteStrokeWidth as number,
              currentRatingIndex,
              highlightOnlySelected
            )
          : [];
      setStyles({ ...styles, dynamicCssVars, dynamicClassNames });
    };

    /* Keyboard handler */

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
      event.preventDefault();
      event.stopPropagation();

      const previousSibling = index - 1;
      const nextSibling = index + 1;
      const lastSibling = ratingValues.length - 1;

      const isEventFiringFromLastItem = lastSibling === index;
      const isEventFiringFromFistItem = index === 0;

      switch (event.code) {
        case 'Tab':
          roleRadioDivs.current[index].blur();
          break;
        case 'Escape':
          roleRadioDivs.current[index].blur();
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          {
            const siblingToFocus = isEventFiringFromLastItem ? 0 : nextSibling;
            roleRadioDivs.current[siblingToFocus].focus();
            if (typeof onChange === 'function') {
              onChange(ratingValues[siblingToFocus]);
            }
          }
          break;
        case 'ArrowUp':
        case 'ArrowLeft': {
          const siblingToFocus = isEventFiringFromFistItem ? lastSibling : previousSibling;
          roleRadioDivs.current[siblingToFocus].focus();
          onChange(ratingValues[siblingToFocus]);
        }
      }
    };

    /* Radio-group props */

    const getClassNames = (): string => {
      const cursorClassName: MaybeEmptyCSSClassName = !readOnly ? 'rar--pointer' : '';
      const orientationClassName: CSSClassName = `rar--dir-${
        orientation === 'vertical' ? 'y' : 'x'
      }`;
      const radiusClassName: MaybeEmptyCSSClassName =
        typeof radius === 'string' && radius !== 'none' ? getRadiusClassName(radius) : '';
      const borderClassName: MaybeEmptyCSSClassName =
        typeof boxBorderWidth === 'number' && boxBorderWidth > 0 ? 'rar--has-border' : '';
      const strokeClassName: MaybeEmptyCSSClassName =
        (absoluteStrokeWidth as number) > 0 ? 'rar--has-stroke' : '';
      const transitionClassName: MaybeEmptyCSSClassName =
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

    const getRadioProps = (childIndex: number): React.HTMLProps<HTMLDivElement> => {
      if (!readOnly) {
        return {
          role: 'radio',
          'aria-labelledby': `rar_label_${uniqueLabelsIds.current[childIndex]}`,
          'aria-checked': ratingValues[childIndex] === ratingValue,
          ref: (radioChildNode: HTMLDivElement) =>
            (roleRadioDivs.current[childIndex] = radioChildNode),
          onClick: (event: React.MouseEvent<HTMLDivElement>) => handleClick(event, childIndex),
          onMouseEnter: () => handleMouseEnter(childIndex),
          onMouseLeave: handleMouseLeave,
          tabIndex:
            enableKeyboard === true && ratingValues[childIndex] === ratingValue ? 0 : -1,
          onKeyDown:
            enableKeyboard === true
              ? (event: React.KeyboardEvent<HTMLDivElement>) =>
                  handleKeyDown(event, childIndex)
              : undefined,
        };
      }
      return {};
    };

    const getRatingAriaProps = (): React.HTMLProps<HTMLDivElement> => {
      if (!readOnly) {
        const ariaProps: React.HTMLProps<HTMLDivElement> = { role: 'radiogroup' };
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
      const sharedProps: any = {
        svgChildNodes: Array.isArray(svgChildNodes)
          ? svgChildNodes[childNodeIndex]
          : svgChildNodes,
        itemStrokeWidth: absoluteStrokeWidth,
      };
      if (deservesHalfFill && absoluteHalfFillMode === 'svg') {
        // To do: check that this condition is strong enough
        sharedProps['hasHalfFill'] = childNodeIndex === currentRatingIndex;
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
