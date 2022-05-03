import React, { forwardRef, useRef, useState } from 'react';

import { RatingItem } from './RatingItem';
import { defaultItemStyles } from './DefaultStyles';
import { getBreakpointRules } from './getBreakpointRules';
import { getSvgNodes } from './getSvgNodes';
import { getSvgStrokes } from './getSvgStrokes';
import { getCssVars } from './getCssVars';
import { getActiveClassNames } from './getActiveClassNames';
import { getGlobalStyles } from './getGlobalStyles';
import { isPlainObject } from './utils';

import { RatingInputProps } from './types';

export const RatingInput = forwardRef<HTMLDivElement, RatingInputProps>(
  (
    {
      onChange = undefined,
      ratingValues = undefined,
      ratingValue = undefined,
      itemStyles = defaultItemStyles,
      enableKeyboard = true,
      direction = 'horizontal',
      containerGap = 20,
      boxRadius = 20,
      boxBorderWidth = 0,
      boxPadding = 20,
      breakpoints = undefined,
      customAccessibleLabels = undefined,
      id = undefined,
      className = undefined,
      style = undefined,
      ariaLabelledBy = undefined,
    },
    externalRef
  ) => {
    if (!ratingValues || !ratingValue) {
      return null;
    }
    if (typeof onChange !== 'function') {
      return null;
    }
    if (Array.isArray(itemStyles) && itemStyles.length !== ratingValues?.length) {
      return null;
    }
    if (ratingValues.length > 10) {
      return null;
    }

    /** Refs */

    const radioDivs = useRef<HTMLDivElement[] | []>([]);

    /** State */

    const [dynamicStyles, setDynamicStyles] = useState(() => ({
      cssVars: getCssVars(itemStyles, ratingValue),
      activeClassNames: getActiveClassNames(
        ratingValues,
        ratingValues.indexOf(ratingValue as string)
      ),
    }));

    /** Handlers */

    const handleMouseEnter = (hoveredIndex) => {
      const cssVars = getCssVars(itemStyles, hoveredIndex);
      const activeClassNames = getActiveClassNames(ratingValues, hoveredIndex);
      setDynamicStyles({ cssVars, activeClassNames });
    };

    const handleMouseLeave = () => {
      const cssVars = getCssVars(itemStyles, ratingValues.indexOf(ratingValue as string));
      const activeClassNames = getActiveClassNames(
        ratingValues,
        ratingValues.indexOf(ratingValue as string)
      );
      setDynamicStyles({ cssVars, activeClassNames });
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
          radioDivs.current[index].blur();
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          {
            const siblingToFocus = isEventFiringFromLastItem ? 0 : nextSibling;
            radioDivs.current[siblingToFocus].focus();
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
          radioDivs.current[siblingToFocus].focus();
          if (typeof onChange === 'function') {
            onChange(ratingValues[siblingToFocus]);
          }
        }
      }
    };

    const handleClick = (
      event: React.MouseEvent<HTMLDivElement>,
      index: number
    ): void => {
      event.preventDefault();
      event.stopPropagation();
      if (typeof onChange === 'function') {
        onChange(ratingValues[index]);
      }
    };

    /** Props */

    const radioProps = (
      radioChildIndex: number
    ): React.HTMLAttributes<HTMLDivElement> => ({
      role: 'radio',
      'aria-labelledby': ariaLabelledBy,
      'aria-checked': ratingValues[radioChildIndex] === ratingValue,
      ref: (ref: HTMLDivElement) => (radioDivs.current[radioChildIndex] = ref),
      onMouseEnter: () => handleMouseEnter(radioChildIndex),
      onMouseLeave: () => handleMouseLeave(),
      onClick: (event: React.MouseEvent<HTMLDivElement>) =>
        handleClick(event, radioChildIndex),
      tabIndex: enableKeyboard && ratingValues[radioChildIndex] === ratingValue ? 0 : -1,
      onKeyDown: enableKeyboard
        ? (event: React.KeyboardEvent<HTMLDivElement>) =>
            handleKeydown(event, radioChildIndex)
        : undefined,
    });

    const itemLabels =
      typeof customAccessibleLabels === 'undefined'
        ? ratingValues.map((_, index: number) => `Rate ${ratingValues[index]}`)
        : customAccessibleLabels;

    return (
      <>
        <div
          ref={externalRef}
          className={`rri--group ${className || ''}`.trim()}
          id={id}
          role="radiogroup"
          aria-labelledby={ariaLabelledBy}
          style={{
            ...style,
            ...getGlobalStyles({
              breakpoints,
              boxBorderWidth,
              boxPadding,
              boxRadius,
              containerGap,
              direction,
            }),
          }}
        >
          {ratingValues.map((_, index) => (
            <div
              key={`rri_item_${index}`}
              className={`rri--radio ${dynamicStyles?.activeClassNames?.[index]}`}
              {...radioProps(index)}
            >
              <div
                style={{ ...dynamicStyles?.cssVars?.[index] }}
                className="rri--box"
                aria-hidden="true"
              >
                <RatingItem
                  svgChildNodes={getSvgNodes(itemStyles, index)}
                  strokeWidth={getSvgStrokes(ratingValues, itemStyles, index)}
                />
              </div>
              <span className="rri--hidden" id={`rri_label_${index + 1}`}>
                {itemLabels?.[index]}
              </span>
            </div>
          ))}
        </div>
        {isPlainObject(breakpoints) && (
          <style>
            {getBreakpointRules({
              breakpoints,
              boxBorderWidth,
              boxPadding,
              boxRadius,
              containerGap,
            })}
          </style>
        )}
      </>
    );
  }
);
