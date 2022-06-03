import React, { forwardRef, useRef, useState, useEffect, useLayoutEffect } from 'react';

import { RatingItem } from './RatingItem';
import { defaultItemStyles } from './DefaultStyles';
import { getBreakpointRules } from './getBreakpointRules';
import { getArrayCssVars, getObjectCssVars } from './getCssVars';
import { getActiveClassNames } from './getActiveClassNames';
import { getHalfFillClassNames } from './getHalfFillClassNames';
import { getTransitionClassNames } from './getTransitionClassNames';
import { getGlobalStylesCssVars } from './getGlobalStylesCssVars';
import { isPlainObject, isFinalValueFloat, getIntersectionIndex } from './utils';
import { getErrors } from './getErrors';

import { RatingProps } from './types';

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value = 0, // Ok
      limit = 5, // Ok
      readOnly = false, // Ok
      onChange, // Ok
      onHoverChange, // Ok
      highlightOnlySelected = false, // Ok
      enableKeyboard = true, // Ok
      orientation = 'horizontal', // Ok
      transition = 'zoom', // Ok
      itemStyles = defaultItemStyles, // To do
      customEasing = '150ms ease-out', // Ok
      boxMargin = 5,
      boxRadius = 0, // Check wheter or not to inject styles with default value
      boxPadding = 5,
      boxBorderWidth = 0,
      breakpoints, // Ok
      halfFillMode = 'svg', // To do
      labelledBy,
      accessibleLabels,
      accessibleLabel = readOnly === false ? 'Rating' : `Rated ${value} on ${limit}`,
      id,
      className,
      style,
    },
    externalRef
  ) => {
    const { shouldRender, errorReason } = getErrors(
      limit,
      value,
      readOnly,
      onChange,
      itemStyles,
      highlightOnlySelected
    );

    if (!shouldRender) {
      console.error(errorReason);
      return null;
    }

    /* Rating value helpers from props */

    const ratingValues = Array.from(Array(limit), (_, index) => index + 1);

    const hasPrecision = readOnly && !Number.isInteger(value);
    const isEligibleForHalfFill = hasPrecision && !highlightOnlySelected;
    const isNotEligibleForHalfFill = hasPrecision && highlightOnlySelected;

    const ratingValue = isNotEligibleForHalfFill ? Math.round(value) : value;
    const deservesHalfFill = isEligibleForHalfFill && isFinalValueFloat(ratingValue);

    const currentRatingIndex = isEligibleForHalfFill
      ? getIntersectionIndex(ratingValues, ratingValue)
      : ratingValues.indexOf(ratingValue);

    /* Refs */

    const roleRadioDivs = useRef<HTMLDivElement[] | []>([]);

    const uniqIds = useRef<string[]>(
      readOnly === false
        ? ratingValues.map(() => (Math.random() + 1).toString(36).substring(7))
        : []
    );

    /* State getters, used to generate CSS variables and active classNames */

    const getClassNames = (currentSelectedIndex: number) => {
      if (deservesHalfFill) {
        return getHalfFillClassNames(ratingValue, ratingValues, halfFillMode);
      }

      return getActiveClassNames(
        highlightOnlySelected,
        ratingValues,
        currentSelectedIndex
      );
    };

    const getStyles = () => {
      const easingValue = readOnly || customEasing === 'none' ? undefined : customEasing;

      return {
        arrayCssVars:
          ratingValue >= 0.25
            ? getArrayCssVars(
                itemStyles,
                currentRatingIndex,
                highlightOnlySelected,
                halfFillMode,
                deservesHalfFill
              )
            : [{}],
        objectCssVars: getObjectCssVars(
          {
            ...itemStyles,
            easingValue,
          },
          halfFillMode,
          deservesHalfFill
        ),
        activeClassNames: getClassNames(currentRatingIndex),
      };
    };

    /* State */

    const [styles, setStyles] = useState(getStyles());

    /* Effects */

    useLayoutEffect(() => {
      if (isPlainObject(breakpoints)) {
        const breakpointRules = getBreakpointRules({
          breakpoints,
          boxMargin,
          boxPadding,
          boxRadius,
          boxBorderWidth,
        });
        if (breakpointRules.length > 0) {
          const breakpointsStyleTag = document.createElement('style');
          breakpointsStyleTag.innerHTML = breakpointRules;
          document.head.appendChild(breakpointsStyleTag);
          return () => {
            document.head.removeChild(breakpointsStyleTag);
          };
        }
      }
    }, [itemStyles]);

    useEffect(() => {
      setStyles(getStyles());
    }, [ratingValue, itemStyles]);

    /* Mouse handlers */

    const handleClick = (
      event: React.MouseEvent<HTMLDivElement>,
      index: number
    ): void => {
      event.preventDefault();
      event.stopPropagation();
      onChange(ratingValues[index]);
    };

    const handleMouseEnter = (hoveredIndex: number) => {
      if (typeof onHoverChange === 'function') {
        onHoverChange(ratingValues[hoveredIndex]);
      }

      const activeClassNames = getClassNames(hoveredIndex);
      const arrayCssVars = getArrayCssVars(
        itemStyles,
        hoveredIndex,
        highlightOnlySelected
      );
      setStyles({ ...styles, arrayCssVars, activeClassNames });
    };

    const handleMouseLeave = () => {
      if (typeof onHoverChange === 'function') {
        onHoverChange(0);
      }

      const activeClassNames = getClassNames(ratingValues.indexOf(ratingValue));
      const arrayCssVars =
        ratingValue >= 0.25
          ? getArrayCssVars(itemStyles, currentRatingIndex, highlightOnlySelected)
          : [{}];
      setStyles({ ...styles, arrayCssVars, activeClassNames });
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
          const siblingToFocus = isEventFiringFromFistItem
            ? lastSibling
            : previousSibling;
          roleRadioDivs.current[siblingToFocus].focus();
          onChange(ratingValues[siblingToFocus]);
        }
      }
    };

    /* Parent element props */

    const getRatingClassNames = () => {
      const sharedClassNames = `rar--group rar--dir-${
        orientation === 'vertical' ? 'y' : 'x'
      } ${className || ''}`;

      if (readOnly === false) {
        const needsTransitionClassNames = readOnly === false && transition !== 'none';
        const transitionClassNames = needsTransitionClassNames
          ? getTransitionClassNames(transition)
          : '';
        return `${sharedClassNames} ${transitionClassNames}`;
      }
      return sharedClassNames;
    };

    const getRatingAriaProps = (): React.HTMLProps<HTMLDivElement> => {
      if (readOnly === false) {
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

    const ratingStyles: React.CSSProperties = {
      ...style,
      ...styles.objectCssVars, // To do: Create a new function that renders such vars to the element main className
      ...getGlobalStylesCssVars({
        orientation,
        breakpoints,
        boxMargin,
        boxPadding,
        boxRadius,
        boxBorderWidth,
      }),
    };

    /* Radio div props */

    const getRadioProps = (radioChildIndex: number): React.HTMLProps<HTMLDivElement> => {
      if (readOnly === false) {
        return {
          role: 'radio',
          'aria-labelledby': `${uniqIds.current[radioChildIndex]}_rar_label_${
            radioChildIndex + 1
          }`,
          'aria-checked': ratingValues[radioChildIndex] === ratingValue,
          ref: (radioChildNode: HTMLDivElement) =>
            (roleRadioDivs.current[radioChildIndex] = radioChildNode),
          onClick: (event: React.MouseEvent<HTMLDivElement>) =>
            handleClick(event, radioChildIndex),
          tabIndex:
            enableKeyboard === true && ratingValues[radioChildIndex] === ratingValue
              ? 0
              : -1,
          onKeyDown:
            enableKeyboard === true
              ? (event: React.KeyboardEvent<HTMLDivElement>) =>
                  handleKeyDown(event, radioChildIndex)
              : undefined,
        };
      }
      return {};
    };

    const getRadioLabels = () =>
      Array.isArray(accessibleLabels)
        ? accessibleLabels
        : ratingValues.map((_, index: number) => `Rate ${ratingValues[index]}`);

    /* Rating item box props */

    const getItemClassNames = (childIndex: number) => {
      const activeClasName = styles?.activeClassNames?.[childIndex];

      if (readOnly === false) {
        return `rar--box-mask rar--cursor rar--margin ${activeClasName}`;
      }
      return `rar--ro-box rar--margin-ro ${activeClasName}`;
    };

    const getMouseProps = (childIndex: number): React.HTMLProps<HTMLDivElement> => {
      if (readOnly === false) {
        return {
          onMouseEnter: () => handleMouseEnter(childIndex),
          onMouseLeave: handleMouseLeave,
        };
      }
      return {};
    };

    /* SVG element props */

    const getSvgRatingItemProps = (childNodeIndex: number) => {
      const sharedProps: any = {
        svgChildNodes: Array.isArray(itemStyles.svgChildNodes)
          ? itemStyles.svgChildNodes[childNodeIndex]
          : itemStyles.svgChildNodes,
        itemStrokeWidth:
          typeof itemStyles.itemStrokeWidth === 'number' && itemStyles.itemStrokeWidth > 0
            ? itemStyles.itemStrokeWidth
            : 0,
      };
      if (deservesHalfFill && halfFillMode === 'svg') {
        sharedProps['hasHalfFill'] = childNodeIndex === currentRatingIndex;
      }
      return sharedProps;
    };

    /* Render */

    return (
      <div
        {...getRatingAriaProps()}
        ref={externalRef}
        id={id}
        style={ratingStyles}
        className={getRatingClassNames()}
      >
        {/* */}
        {/* */}
        {/* */}
        {/* */}
        {ratingValues.map((_, childNodeIndex) => (
          <div
            {...getMouseProps(childNodeIndex)}
            key={`rar_item_mask_${childNodeIndex}`}
            className={getItemClassNames(childNodeIndex)}
            style={readOnly ? styles?.arrayCssVars?.[childNodeIndex] : {}}
          >
            {/* */}
            {/* */}
            {readOnly === false ? (
              <div
                {...getRadioProps(childNodeIndex)}
                className="rar--box"
                style={styles?.arrayCssVars?.[childNodeIndex]}
              >
                <RatingItem {...getSvgRatingItemProps(childNodeIndex)} />
              </div>
            ) : (
              <RatingItem {...getSvgRatingItemProps(childNodeIndex)} />
            )}
            {/* */}
            {readOnly === false && (
              <span
                className="rar--hidden"
                id={`${uniqIds.current[childNodeIndex]}_rar_label_${childNodeIndex + 1}`}
              >
                {getRadioLabels()?.[childNodeIndex]}
              </span>
            )}
            {/* */}
            {/* */}
          </div>
        ))}
        {/* */}
        {/* */}
        {/* */}
        {/* */}
      </div>
    );
  }
);
