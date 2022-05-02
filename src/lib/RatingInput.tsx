import React, { CSSProperties, forwardRef, useRef } from 'react';

import { RatingItem } from './RatingItem';
import { getBreakpointRules } from './getBreakpointRules';
import { getItemStyles } from './getItemStyles';
import { defaultItemStyles } from './DefaultStyles';

import { ItemStyle, RatingItemProps, SvgChildNodes } from './types';

export const RatingInput = forwardRef<HTMLDivElement, RatingItemProps>(
  (
    {
      onChange = undefined,

      ratingValues = undefined,
      ratingValue = undefined,
      customLabels = undefined,

      itemStyles = defaultItemStyles,
      direction = 'horizontal',
      customEasing = '500ms cubic-bezier(0, 0, 0.2, 1)',

      containerGap = 20,
      boxRadius = 20,
      boxBorderWidth = 0,
      boxPadding = 20,
      breakpoints = undefined,

      highlightOnlySelected = false,
      enableHover = true,
      enableTransitions = true,
      enableKeyboard = true,
      readOnly = false,

      id = undefined,
      className = undefined,
      style = undefined,

      ariaLabelledBy = undefined,
      readOnlyLabel = 'Rating',
    },
    externalRef
  ) => {
    const isItemStylesArray = Array.isArray(itemStyles);
    const isItemStylesObject = typeof itemStyles === 'object' && !isItemStylesArray;

    if (!ratingValues || !ratingValue) {
      console.error(
        '[ReactRatingInput] - Props "ratingValues" and "ratingValue" are required.'
      );
      return null;
    }

    if (!readOnly && typeof onChange !== 'function') {
      console.error('[ReactRatingInput] - Prop "onChange" is required.');
      return null;
    }

    if (isItemStylesArray && itemStyles.length !== ratingValues?.length) {
      console.error(
        '[ReactRatingInput] - They array provided must be of the same length of ratingValues.'
      );
      return null;
    }

    if (ratingValues.length > 10) {
      console.error('[ReactRatingInput] - Maximum 10 values are allowed.');
      return null;
    }

    const radioDivs = useRef<HTMLDivElement[] | []>([]);

    // Handlers

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

    const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
      event.preventDefault();
      event.stopPropagation();

      const previousValue = index - 1;
      const lastValue = ratingValues.length - 1;
      const nextValue = index + 1;

      const isEventFiringFromLastItem = lastValue === index;
      const isEventFiringFromFistItem = index === 0;

      switch (event.code) {
        case 'Tab':
        case 'Escape':
          radioDivs.current[index].blur();
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          {
            const indexToSelect = isEventFiringFromLastItem ? 0 : nextValue;
            radioDivs.current[indexToSelect].focus();
            if (typeof onChange === 'function') {
              onChange(ratingValues[indexToSelect]);
            }
          }
          break;
        case 'ArrowUp':
        case 'ArrowLeft': {
          const indexToSelect = isEventFiringFromFistItem ? lastValue : previousValue;
          radioDivs.current[indexToSelect].focus();
          if (typeof onChange === 'function') {
            onChange(ratingValues[indexToSelect]);
          }
        }
      }
    };

    const handleHighlight = (index: number) => {
      const valueAtIndex = ratingValues.indexOf(ratingValue as string);

      if (highlightOnlySelected) {
        if (valueAtIndex === index) {
          return 'rri--active';
        }
        return 'rri--inactive';
      }
      if (valueAtIndex + 1 <= index) {
        return 'rri--inactive';
      }
      return 'rri--active';
    };

    // Styles

    const globalStyles = {
      '--rri--container-gap': `${containerGap}px`,
      '--rri--box-radius': `${boxRadius}px`,
      '--rri--box-border-width': `${boxBorderWidth}px`,
      '--rri--box-padding': `${boxPadding}px`,
      '--rri--easing': customEasing,
      '--rri--direction': direction === 'horizontal' ? 'row' : 'column',
    } as CSSProperties;

    const appendStyles = () => {
      if (isItemStylesObject) {
        return getItemStyles([itemStyles as ItemStyle])[0];
      }
      return {};
    };

    const appendSingleStyles = (index: number) => {
      if (isItemStylesArray) {
        return getItemStyles(itemStyles)?.[index];
      }
      return {};
    };

    const getStrokeIndex = (index: number): number => {
      if (isItemStylesArray) {
        const mappedIndex = itemStyles.map(({ itemStrokeWidth }) =>
          typeof itemStrokeWidth === 'number' ? itemStrokeWidth : 0
        );
        return mappedIndex[index];
      }
      if (isItemStylesObject) {
        const mappedIndex = ratingValues.map(() => itemStyles.itemStrokeWidth);
        return mappedIndex[index] as number;
      }
      return 0;
    };

    const getSvgItem = (index: number): SvgChildNodes => {
      if (isItemStylesObject) {
        return itemStyles.svgChildNodes as SvgChildNodes;
      }
      if (isItemStylesArray) {
        return itemStyles[index].svgChildNodes as SvgChildNodes;
      }
      return null;
    };

    const additionalClassNames = `${enableHover && !readOnly ? 'rri--has-hover' : ''} ${
      enableTransitions && !readOnly ? 'rri--has-transitions' : ''
    }`;

    // Props

    const getInteractiveRadioGroupProps = () => {
      if (!readOnly) {
        return {
          role: 'radiogroup',
          'aria-labelledby': ariaLabelledBy,
        };
      }
      return { role: 'img', 'aria-label': readOnlyLabel };
    };

    const getInteractiveRadioProps = (index: number) => {
      if (!readOnly) {
        return {
          role: 'radio',
          'aria-labelledby': ariaLabelledBy,
          'aria-checked': ratingValues[index] === ratingValue,
          onClick: (event: React.MouseEvent<HTMLDivElement>) => handleClick(event, index),
          tabIndex: enableKeyboard && ratingValues[index] === ratingValue ? 0 : -1,
          onKeyDown: enableKeyboard
            ? (event: React.KeyboardEvent<HTMLDivElement>) => handleKeydown(event, index)
            : undefined,
        };
      }
      return {};
    };

    // Labels

    const defaultLabels: string[] = ratingValues.map(
      (_, index: number) => `Rate ${ratingValues[index]}`
    );

    const itemLabels = typeof customLabels === 'undefined' ? defaultLabels : customLabels;

    return (
      <>
        <div
          ref={externalRef}
          className={`rri--radio-group ${className || ''}`.trim()}
          id={id}
          style={{
            ...style,
            ...globalStyles,
            ...appendStyles(),
          }}
          {...getInteractiveRadioGroupProps()}
        >
          {ratingValues.map((_, index) => (
            <div
              key={`rri_item_${index}`}
              ref={(ref) => (radioDivs.current[index] = ref as HTMLDivElement)}
              className={`rri--radio ${handleHighlight(
                index
              )} ${additionalClassNames}`.trim()}
              {...getInteractiveRadioProps(index)}
            >
              <div
                style={appendSingleStyles(index)}
                className="rri--box"
                aria-hidden="true"
              >
                <RatingItem
                  svgChildNodes={getSvgItem(index)}
                  strokeWidth={getStrokeIndex(index)}
                />
              </div>
              {!readOnly && (
                <span className="rri--hidden" id={`rri_label_${index + 1}`}>
                  {itemLabels?.[index]}
                </span>
              )}
            </div>
          ))}
        </div>
        {typeof breakpoints === 'object' && (
          <style>{getBreakpointRules(breakpoints)}</style>
        )}
      </>
    );
  }
);
