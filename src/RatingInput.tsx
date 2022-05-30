import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { RatingItem } from './RatingItem';
import { defaultItemStyles } from './DefaultStyles';
import { getBreakpointRules } from './getBreakpointRules';
import { getSvgNodes } from './getSvgNodes';
import { getSvgStroke } from './getSvgStroke';
import { getArrayCssVars, getObjectCssVars } from './getCssVars';
import { getActiveClassNames } from './getActiveClassNames';
import { getGlobalStyles } from './getGlobalStyles';
import { isPlainObject } from './utils';

import { RatingInputProps } from './types';

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
    if (typeof limit !== 'number' || limit < 1 || limit > 10) {
      return null;
    }

    /* Prevent rendering if invalid prop? */

    if (typeof onChange !== 'function') {
      return null;
    }

    const ratingValues = Array.from(Array(limit), (_, index) => index + 1);

    const roleRadioDivs = useRef<HTMLDivElement[] | []>([]);

    const uniqIds = useRef<string[]>(
      ratingValues.map(() => (Math.random() + 1).toString(36).substring(7))
    );

    const getClassNames = () => {
      return getActiveClassNames(
        highlightOnlySelected,
        ratingValues,
        ratingValues.indexOf(ratingValue || 0)
      );
    };

    const [dynamicStyles, setDynamicStyles] = useState({
      arrayCssVars: getArrayCssVars(
        itemStyles,
        ratingValues.indexOf(ratingValue || 0),
        highlightOnlySelected
      ),
      activeClassNames: getClassNames(),
      objectCssVars: getObjectCssVars(itemStyles),
    });

    useEffect(() => {
      const objectCssVars = getObjectCssVars(itemStyles);
      const activeClassNames = getClassNames();
      const arrayCssVars = getArrayCssVars(
        itemStyles,
        ratingValues.indexOf(ratingValue || 0),
        highlightOnlySelected
      );

      setDynamicStyles({ activeClassNames, objectCssVars, arrayCssVars });
    }, [ratingValue, itemStyles]);

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

      const arrayCssVars = getArrayCssVars(
        itemStyles,
        selectedIndex,
        highlightOnlySelected
      );

      setDynamicStyles({ ...dynamicStyles, arrayCssVars, activeClassNames });
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

    const mouseProps = (childIndex: number): React.HTMLProps<HTMLDivElement> => ({
      onMouseEnter: (event: React.MouseEvent<HTMLDivElement>) =>
        handleMouseEnter(event, childIndex),
      onMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => handleMouseLeave(event),
    });

    const radioProps = (radioChildIndex: number): React.HTMLProps<HTMLDivElement> => ({
      role: 'radio',
      'aria-labelledby': `${uniqIds.current[radioChildIndex]}_rri_label_${
        radioChildIndex + 1
      }`,
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

    const itemLabels =
      typeof customAccessibleLabels === 'undefined'
        ? ratingValues.map((_, index: number) => `Rate ${ratingValues[index]}`)
        : customAccessibleLabels;

    return (
      <>
        <div
          ref={externalRef}
          className={`rri--group ${
            orientation === 'horizontal' ? 'rri--dir-x' : 'rri--dir-y'
          } ${className || ''}`}
          id={id}
          role="radiogroup"
          aria-labelledby={labelledBy}
          style={{
            ...style,
            ...dynamicStyles.objectCssVars,
            ...getGlobalStyles({
              orientation,
              breakpoints,
              boxMargin,
              boxPadding,
              boxRadius,
            }),
          }}
        >
          {ratingValues.map((_, index) => (
            <div
              key={`rri_item_${index}`}
              className="rri--hover-mask"
              {...mouseProps(index)}
            >
              <div
                className={`rri--radio ${dynamicStyles?.activeClassNames?.[index]}`}
                {...radioProps(index)}
              >
                <div
                  style={{
                    ...dynamicStyles?.arrayCssVars?.[index],
                  }}
                  className="rri--box"
                  aria-hidden="true"
                >
                  <RatingItem
                    svgChildNodes={getSvgNodes(itemStyles, index)}
                    strokeWidth={getSvgStroke(itemStyles)}
                  />
                </div>
                <span
                  className="rri--hidden"
                  id={`${uniqIds.current[index]}_rri_label_${index + 1}`}
                >
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
            })}
          </style>
        )}
      </>
    );
  }
);
