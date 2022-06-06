import React, { forwardRef, useRef, useState, useLayoutEffect, useEffect } from 'react';

import { RatingItem } from './RatingItem';
import { getDynamicCssVars } from './getDynamicCssVars';
import { getActiveClassNames } from './getDynamicClassNames';
import { getHalfFillClassNames } from './getDynamicClassNames';
import { getTransitionClassNames } from './getTransitionClassNames';
import { getStaticCssVars } from './getStaticCssVars';
import { createBreakpointsStyleElement } from './createBreakpointsStyleElement';
import {
  isFinalValueFloat,
  getIntersectionIndex,
  getUniqueId,
  isObjectWithKeys,
  isValidPositiveNumber as isValidStroke,
  cleanupSplitColors,
} from './utils';
import { getErrors } from './getErrors';

import {
  RatingProps,
  ItemStylesProp,
  CSSVariables,
  CSSClassName,
  MaybeEmptyCSSClassName,
  TagID,
  MergedStyles,
  MaybeInvalidBreakPoints,
  RequireAtLeastOne,
  ValidArrayColors,
} from './types';

const Star = <path d="M100,10L40 198 190 78 10 78 160 198z" />;

export const defaultItemStyles: ItemStylesProp = {
  svgChildNodes: Star,
  itemStrokeWidth: 2,
  itemStrokeStyle: 'round',
  activeStrokeColor: ['#da1600', '#db711a', '#dcb000', '#61bb00', '#009664'],
  activeBoxColor: 'aliceblue',
  activeFillColor: ['#da1600', '#db711a', '#dcb000', '#61bb00', '#009664'],
  inactiveFillColor: 'rgba(0, 0, 0, 0.25)',
};

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value = 0,
      limit = 5,
      readOnly = false,
      onChange,
      onHoverChange,
      highlightOnlySelected = false,
      enableKeyboard = true,
      orientation = 'horizontal',
      transition = 'none', // To do: maybe set 'colors' as default?
      itemStyles = defaultItemStyles,
      boxMargin = 5,
      boxRadius = 0,
      boxPadding = 5,
      boxBorderWidth = 0,
      breakpoints,
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
    const { svgChildNodes, itemStrokeStyle, itemStrokeWidth, ...colors } = itemStyles;

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

    const ratingValue = isNotEligibleForHalfFill ? Math.round(value) : value;
    const currentRatingIndex = isEligibleForHalfFill
      ? getIntersectionIndex(ratingValues, ratingValue)
      : ratingValues.indexOf(ratingValue);

    const deservesHalfFill = isEligibleForHalfFill && isFinalValueFloat(ratingValue);

    /* CSS helpers */

    const { staticColors, arrayColors } = cleanupSplitColors(colors);
    const hasArrayColors = Object.keys(arrayColors).length > 0;

    const absoluteStrokeWidth = isValidStroke(itemStrokeWidth) ? itemStrokeWidth : 0;
    const absoluteHalfFillMode = halfFillMode === 'box' ? 'box' : 'svg';

    /* Refs */

    const breakpointsStyleTagId = useRef<string | null>(null);
    const uniqueLabelsIds = useRef<string[]>(
      readOnly === false ? ratingValues.map(() => getUniqueId()) : []
    );

    const roleRadioDivs = useRef<HTMLDivElement[] | []>([]);

    /* Styles getters */

    const getStaticStyles = () => {
      const mergedStyles: MergedStyles = {
        boxStyles: { boxMargin, boxPadding, boxRadius, boxBorderWidth },
        colors: staticColors,
      };

      return {
        staticCssVars: getStaticCssVars(mergedStyles, deservesHalfFill, absoluteHalfFillMode),
      };
    };

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
          : [{}],
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

    /* Effects */

    useLayoutEffect(() => {
      if (isObjectWithKeys(breakpoints)) {
        if (!breakpointsStyleTagId.current) {
          breakpointsStyleTagId.current = getUniqueId();
        }
        const tagId: TagID = `rar_bp_${breakpointsStyleTagId.current}`;
        const breakpointsStyleElem = createBreakpointsStyleElement(
          tagId,
          breakpoints as MaybeInvalidBreakPoints
        );

        if (breakpointsStyleElem) {
          document.head.appendChild(breakpointsStyleElem);
          return () => {
            if (document.getElementById(tagId)) {
              document.head.removeChild(breakpointsStyleElem);
            }
          };
        }
      }
    }, []);

    useEffect(() => {
      setStyles({ ...getStaticStyles(), ...getDynamicStyles() });
    }, [ratingValue]);

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

    /* Radio-group/parent props */

    const getRatingClassNames = () => {
      const orientationClassName: CSSClassName = `rar--dir-${
        orientation === 'vertical' ? 'y' : 'x'
      }`;
      const strokeStyleClassName: CSSClassName = `rar--stroke-${
        itemStrokeStyle === 'sharp' ? 'sharp' : 'round'
      }`;
      const breakpointsTargetClassName: MaybeEmptyCSSClassName = breakpointsStyleTagId.current
        ? `rar--${breakpointsStyleTagId.current}`
        : '';

      const sharedClassNames: MaybeEmptyCSSClassName = `rar--group ${orientationClassName}
      ${strokeStyleClassName} ${className || ''} ${breakpointsTargetClassName}`;

      if (!readOnly) {
        const needsTransitionClassNames = !readOnly && transition !== 'none';
        const transitionClassNames = needsTransitionClassNames
          ? getTransitionClassNames(transition)
          : '';
        return `${sharedClassNames} ${transitionClassNames}`;
      }
      return sharedClassNames;
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

    /* Rating boxes props */

    const getBoxClassNames = (childIndex: number) => {
      const activeClasName = styles?.dynamicClassNames?.[childIndex];

      if (!readOnly) {
        return `rar--box-mask rar--cursor rar--margin ${activeClasName}`;
      }
      return `rar--ro-box rar--margin-ro ${activeClasName}`;
    };

    const getMouseProps = (childIndex: number): React.HTMLProps<HTMLDivElement> => {
      if (!readOnly) {
        return {
          onMouseEnter: () => handleMouseEnter(childIndex),
          onMouseLeave: handleMouseLeave,
        };
      }
      return {};
    };

    /* Radio divs */

    const getRadioProps = (radioChildIndex: number): React.HTMLProps<HTMLDivElement> => {
      if (!readOnly) {
        return {
          role: 'radio',
          'aria-labelledby': `${uniqueLabelsIds.current[radioChildIndex]}_rar_label_${
            radioChildIndex + 1
          }`,
          'aria-checked': ratingValues[radioChildIndex] === ratingValue,
          ref: (radioChildNode: HTMLDivElement) =>
            (roleRadioDivs.current[radioChildIndex] = radioChildNode),
          onClick: (event: React.MouseEvent<HTMLDivElement>) =>
            handleClick(event, radioChildIndex),
          tabIndex:
            enableKeyboard === true && ratingValues[radioChildIndex] === ratingValue ? 0 : -1,
          onKeyDown:
            enableKeyboard === true
              ? (event: React.KeyboardEvent<HTMLDivElement>) =>
                  handleKeyDown(event, radioChildIndex)
              : undefined,
        };
      }
      return {};
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
        {...getRatingAriaProps()}
        ref={externalRef}
        id={id}
        style={{ ...style, ...styles.staticCssVars }}
        className={getRatingClassNames()}
      >
        {/* */}
        {/* */}
        {/* Boxes */}
        {ratingValues.map((_, childNodeIndex) => (
          <div
            {...getMouseProps(childNodeIndex)}
            key={`rar_mask_${childNodeIndex}`}
            className={getBoxClassNames(childNodeIndex)}
            style={readOnly ? styles?.dynamicCssVars?.[childNodeIndex] : {}}
          >
            {/* */}
            {/* */}
            {/* Radios & SVG */}
            {!readOnly ? (
              <div
                {...getRadioProps(childNodeIndex)}
                className="rar--box"
                style={styles?.dynamicCssVars?.[childNodeIndex]}
              >
                <RatingItem {...getSvgRatingItemProps(childNodeIndex)} />
              </div>
            ) : (
              <RatingItem {...getSvgRatingItemProps(childNodeIndex)} />
            )}
            {/* */}
            {/* */}
            {/* Labels */}
            {!readOnly && (
              <span
                className="rar--hidden"
                id={`${uniqueLabelsIds.current[childNodeIndex]}_rar_label_${
                  childNodeIndex + 1
                }`}
              >
                {getRadioLabels()?.[childNodeIndex]}
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
