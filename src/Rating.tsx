import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { RatingItem } from './RatingItem';
import { defaultItemStyles } from './DefaultStyles';
import { getBreakpointRules } from './getBreakpointRules';
import { getSvgNodes } from './getSvgNodes';
import { getSvgStroke } from './getSvgStroke';
import { getArrayCssVars, getObjectCssVars } from './getCssVars';
import { getActiveClassNames } from './getActiveClassNames';
import { getTransitionClasses } from './getTransitionClasses';
import { getGlobalStyles } from './getGlobalStyles';
import { isPlainObject } from './utils';

import { RatingProps } from './types';

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      ratingValue = 0,
      limit = 5,
      onChange,
      onHoverChange,
      highlightOnlySelected = false,
      enableKeyboard = true,
      orientation = 'horizontal',
      transition = 'zoom',
      itemStyles = defaultItemStyles,
      customEasing = '150ms ease-out',
      boxMargin = 5,
      boxRadius,
      boxPadding = 5,
      boxBorderWidth,
      breakpoints,
      id,
      className,
      style,
      labelledBy,
      customAccessibleLabels,
      halfPrecision = false,
      readOnly = false,
      accessibleLabel = 'Rating',
    },
    externalRef
  ) => {
    if (
      typeof limit !== 'number' ||
      limit < 1 ||
      limit > 10 ||
      typeof ratingValue !== 'number' ||
      ratingValue < 0 ||
      ratingValue > limit ||
      (readOnly === false && typeof onChange !== 'function')
    ) {
      return null;
    }

    const ratingValues = Array.from(Array(limit), (_, index) => index + 1);

    const roleRadioDivs = useRef<HTMLDivElement[] | []>([]);

    const uniqIds = useRef<string[]>(
      ratingValues.map(() => (Math.random() + 1).toString(36).substring(7))
    );

    /* State getters, used to generate CSS variables and active classNames */

    const getClassNames = (selectedValue: number) =>
      getActiveClassNames(highlightOnlySelected, ratingValues, selectedValue);

    const getStyles = () => ({
      arrayCssVars:
        ratingValue > 0
          ? getArrayCssVars(
              itemStyles,
              ratingValues.indexOf(ratingValue),
              highlightOnlySelected
            )
          : [{}],
      objectCssVars: getObjectCssVars({
        ...itemStyles,
        customEasing,
      }),
      activeClassNames: getClassNames(ratingValues.indexOf(ratingValue)),
    });

    /* State */

    const [styles, setStyles] = useState(getStyles());

    /* Effect */

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

    const handleMouseEnter = (
      event: React.MouseEvent<HTMLDivElement>,
      hoveredIndex: number
    ) => {
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

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      if (typeof onHoverChange === 'function') {
        onHoverChange(0);
      }

      const activeClassNames = getClassNames(ratingValues.indexOf(ratingValue));
      const arrayCssVars =
        ratingValue > 0
          ? getArrayCssVars(
              itemStyles,
              ratingValues.indexOf(ratingValue),
              highlightOnlySelected
            )
          : [{}];
      setStyles({ ...styles, arrayCssVars, activeClassNames });
    };

    console.log('Rubra');

    /* Keyboard handler */

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

    /* Parent element props */

    const getRatingClassNames = () => {
      const sharedClassNames = `rri--group rri--dir-${
        orientation === 'vertical' ? 'y' : 'x'
      } ${className || ''}`;

      if (readOnly === false) {
        return `${sharedClassNames} ${getTransitionClasses(transition)}`;
      }
      return sharedClassNames;
    };

    const getRatingAriaProps = (): React.HTMLProps<HTMLDivElement> => {
      if (readOnly === false) {
        return {
          role: 'radiogroup',
          'aria-labelledby': labelledBy,
        };
      }
      return {
        role: 'img',
        'aria-label': accessibleLabel,
      };
    };

    const ratingStyles = {
      ...style,
      ...styles.objectCssVars,
      ...getGlobalStyles({
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
          'aria-labelledby': `${uniqIds.current[radioChildIndex]}_rri_label_${
            radioChildIndex + 1
          }`,
          'aria-checked': ratingValues[radioChildIndex] === ratingValue,
          ref: (radioChildNode: HTMLDivElement) =>
            (roleRadioDivs.current[radioChildIndex] = radioChildNode),
          onClick: (event: React.MouseEvent<HTMLDivElement>) =>
            handleClick(event, radioChildIndex),
          tabIndex:
            enableKeyboard && ratingValues[radioChildIndex] === ratingValue ? 0 : -1,
          onKeyDown: enableKeyboard
            ? (event: React.KeyboardEvent<HTMLDivElement>) =>
                handleKeydown(event, radioChildIndex)
            : undefined,
        };
      }
      return {};
    };

    /* Rating item box props */

    const getItemClassNames = (childIndex: number) => {
      const activeClasNames = styles?.activeClassNames?.[childIndex];

      if (readOnly === false) {
        return `rri--item-mask rri--cursor rri--margin ${activeClasNames}`;
      }
      return `rri--item-box-ro rri--margin-ro ${activeClasNames}`;
    };

    const getMouseProps = (childIndex: number): React.HTMLProps<HTMLDivElement> => {
      if (readOnly === false) {
        return {
          onMouseEnter: (event: React.MouseEvent<HTMLDivElement>) =>
            handleMouseEnter(event, childIndex),
          onMouseLeave: (event: React.MouseEvent<HTMLDivElement>) =>
            handleMouseLeave(event),
        };
      }
      return {};
    };

    /* Labels */

    const radioLabels =
      typeof customAccessibleLabels === 'undefined'
        ? ratingValues.map((_, index: number) => `Rate ${ratingValues[index]}`)
        : customAccessibleLabels;

    return (
      <>
        <div
          {...getRatingAriaProps()}
          ref={externalRef}
          id={id}
          className={getRatingClassNames()}
          style={ratingStyles}
        >
          {ratingValues.map((_, childNodeIndex) => (
            <div
              {...getMouseProps(childNodeIndex)}
              key={`rri_item_mask_${childNodeIndex}`}
              className={getItemClassNames(childNodeIndex)}
              style={readOnly ? styles?.arrayCssVars?.[childNodeIndex] : {}}
            >
              {readOnly === false ? (
                <div
                  {...getRadioProps(childNodeIndex)}
                  className="rri--item-box"
                  style={styles?.arrayCssVars?.[childNodeIndex]}
                >
                  <RatingItem
                    svgChildNodes={getSvgNodes(itemStyles, childNodeIndex)}
                    strokeWidth={getSvgStroke(itemStyles)}
                  />
                </div>
              ) : (
                <RatingItem
                  svgChildNodes={getSvgNodes(itemStyles, childNodeIndex)}
                  strokeWidth={getSvgStroke(itemStyles)}
                />
              )}

              {readOnly === false && (
                <span
                  className="rri--hidden"
                  id={`${uniqIds.current[childNodeIndex]}_rri_label_${
                    childNodeIndex + 1
                  }`}
                >
                  {radioLabels?.[childNodeIndex]}
                </span>
              )}
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
