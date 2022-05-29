import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { RatingItem } from './RatingItem';
import { defaultItemStyles } from './DefaultStyles';
import { getBreakpointRules } from './getBreakpointRules';
import { getSvgNodes } from './getSvgNodes';
import { getSvgStrokes } from './getSvgStrokes';
import { getCssObjectVars, getCssArrayVars } from './getCssVars';
import { getActiveClassNames } from './getActiveClassNames';
import { getGlobalStyles } from './getGlobalStyles';
import { isPlainObject } from './utils';

import {
  CSSVariables,
  ItemStylesProp,
  NewItemStylesProp,
  RatingInputProps,
} from './types';

/** Accessible radio-group to be used as input, please refer to
 * README.md at https://github.com/smastrom/react-rating-input
 * for the complete list of props. If you just need to display the rating
 * please use `<Rating />` instead. */

export const RatingInput = forwardRef<HTMLDivElement, RatingInputProps>(
  (
    {
      ratingValue = null,
      limit = 5,
      onChange,
      highlightOnlySelected = false,
      enableKeyboard = true,
      orientation = 'horizontal',
      itemStyles = defaultItemStyles,
      boxMargin = 20,
      boxRadius = 20,
      boxBorderWidth,
      boxPadding = 20,
      breakpoints,
      id,
      className,
      style,
      labelledBy,
      customAccessibleLabels,
    },
    externalRef
  ) => {
    const isStylesPropArray = Array.isArray(itemStyles);
    const isStylesPropObj = isPlainObject(itemStyles);

    if (typeof limit !== 'number' || limit < 1 || limit > 10) {
      return null;
    }
    if (!isStylesPropObj && !isStylesPropArray) {
      return null;
    }
    if (isStylesPropArray && itemStyles.length !== limit) {
      return null;
    }
    if (typeof onChange !== 'function') {
      return null;
    }

    const ratingValues = Array.from(Array(limit), (_, index) => index + 1);

    /* Refs */

    const roleRadioDivs = useRef<HTMLDivElement[] | []>([]);

    /* State and effect */

    const getClassNames = () => {
      return getActiveClassNames(
        highlightOnlySelected,
        ratingValues,
        ratingValues.indexOf(ratingValue || 0)
      );
    };

    const [dynamicStyles, setDynamicStyles] = useState(() => ({
      cssVars: isStylesPropArray
        ? getCssArrayVars(itemStyles as ItemStylesProp[], ratingValue || 0)
        : getCssObjectVars(itemStyles as ItemStylesProp),
      activeClassNames: getClassNames(),
    }));

    useEffect(() => {
      let cssVars: CSSVariables | CSSVariables[];

      if (isStylesPropArray) {
        cssVars = getCssArrayVars(itemStyles, ratingValues.indexOf(ratingValue || 0));
      } else {
        cssVars = getCssObjectVars(itemStyles);
      }

      const activeClassNames = getClassNames();
      setDynamicStyles({ cssVars, activeClassNames });
    }, [ratingValue, itemStyles]);

    /* Handlers */

    const handleClick = (
      event: React.MouseEvent<HTMLDivElement>,
      index: number
    ): void => {
      event.preventDefault();
      event.stopPropagation();
      onChange(ratingValues[index]);
    };

    const handleMouseEnterAndLeave = (
      event: React.MouseEvent<HTMLDivElement>,
      selectedIndex: number
    ) => {
      event.preventDefault();
      event.stopPropagation();

      const activeClassNames = getActiveClassNames(
        highlightOnlySelected,
        ratingValues,
        selectedIndex
      );

      if (isStylesPropArray) {
        const cssVars = getCssArrayVars(itemStyles, selectedIndex);
        setDynamicStyles({ cssVars, activeClassNames });
      } else {
        setDynamicStyles({ ...dynamicStyles, activeClassNames });
      }
    };

    const handleMouseEnter = (
      event: React.MouseEvent<HTMLDivElement>,
      hoveredIndex: number
    ) => {
      return handleMouseEnterAndLeave(event, hoveredIndex);
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      return handleMouseEnterAndLeave(event, ratingValues.indexOf(ratingValue || 0));
    };

    const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
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

    /* Props */

    const mouseProps = (childIndex: number): React.HTMLProps<HTMLDivElement> => ({
      onMouseEnter: (event: React.MouseEvent<HTMLDivElement>) =>
        handleMouseEnter(event, childIndex),
      onMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => handleMouseLeave(event),
    });

    const radioProps = (radioChildIndex: number): React.HTMLProps<HTMLDivElement> => ({
      role: 'radio',
      'aria-labelledby': labelledBy,
      'aria-checked': ratingValues[radioChildIndex] === ratingValue,
      ref: (radioChildNode: HTMLDivElement) =>
        (roleRadioDivs.current[radioChildIndex] = radioChildNode),
      onClick: (event: React.MouseEvent<HTMLDivElement>) =>
        handleClick(event, radioChildIndex),
      tabIndex: enableKeyboard && ratingValues[radioChildIndex] === ratingValue ? 0 : -1,
      onKeyDown: enableKeyboard
        ? (event: React.KeyboardEvent<HTMLDivElement>) =>
            handleKeydown(event, radioChildIndex)
        : undefined,
    });

    /* Labels */

    const itemLabels =
      typeof customAccessibleLabels === 'undefined'
        ? ratingValues.map((_, index: number) => `Rate ${ratingValues[index]}`)
        : customAccessibleLabels;

    /* Render */

    return (
      <>
        <div
          ref={externalRef}
          className={`rri--group ${
            orientation === 'horizontal' ? 'rri--dir-x' : 'rri--dir-y'
          } ${className || ''}`.trim()}
          id={id}
          role="radiogroup"
          aria-labelledby={labelledBy}
          style={{
            ...style,
            ...(isStylesPropObj ? ({ ...dynamicStyles?.cssVars } as CSSVariables) : {}),
            ...getGlobalStyles({
              orientation,
              breakpoints,
              boxMargin,
              boxPadding,
              boxRadius,
              boxBorderWidth,
            }),
          }}
        >
          {ratingValues.map((_, index) => (
            <div
              key={`rri_item_${index}`}
              className="rri--hover-mask"
              {...mouseProps(index)}
            >
              {/* Maybe remove rri--radio */}
              <div
                className={`rri--radio ${dynamicStyles?.activeClassNames?.[index]}`}
                {...radioProps(index)}
              >
                <div
                  style={
                    isStylesPropArray
                      ? { ...(dynamicStyles?.cssVars as CSSVariables[])?.[index] }
                      : {}
                  }
                  className="rri--box"
                  aria-hidden="true"
                >
                  <RatingItem
                    svgChildNodes={getSvgNodes(itemStyles, index)}
                    strokeWidth={getSvgStrokes(itemStyles, index)}
                  />
                </div>
                <span className="rri--hidden" id={`rri_label_${index + 1}`}>
                  {itemLabels?.[index]}
                </span>
              </div>
            </div>
          ))}
        </div>
        {isPlainObject(breakpoints) && (
          <style>
            {getBreakpointRules({
              breakpoints,
              boxMargin,
              boxPadding,
              boxRadius,
              boxBorderWidth,
            })}
          </style>
        )}
      </>
    );
  }
);
