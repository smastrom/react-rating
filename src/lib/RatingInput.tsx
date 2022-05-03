import React, { CSSProperties, forwardRef, useRef } from 'react';

import { RatingItem } from './RatingItem';
import { getBreakpointRules } from './getBreakpointRules';
import { getItemStyles } from './getItemStyles';
import { defaultItemStyles } from './DefaultStyles';

import { Breakpoints, ItemStyle, RatingItemProps, SvgChildNodes } from './types';

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

    // Refs

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

    // Styles

    const getGlobalResponsiveStyles = () => {
      if (typeof breakpoints === 'undefined') {
        return {
          '--rri--container-gap': `${containerGap}px`,
          '--rri--box-radius': `${boxRadius}px`,
          '--rri--box-border-width': `${boxBorderWidth}px`,
          '--rri--box-padding': `${boxPadding}px`,
        } as CSSProperties;
      }
      return {};
    };

    const globalStyles = {
      ...getGlobalResponsiveStyles(),
      '--rri--easing': customEasing,
      '--rri--direction': direction === 'horizontal' ? 'row' : 'column',
    } as CSSProperties;

    const getFullBreakpoints = (): Breakpoints => {
      if (typeof breakpoints === 'object') {
        const maxBreakpoint = Number.parseInt(Object.keys(breakpoints)[0]) - 1;
        const fullBreakpoints = { ...breakpoints };

        fullBreakpoints[maxBreakpoint] = {
          containerGap,
          boxRadius,
          boxBorderWidth,
          boxPadding,
        };

        return fullBreakpoints;
      }
      return {};
    };

    const additionalClassNames = `${enableHover && !readOnly ? 'rri--has-hover' : ''} ${
      enableTransitions && !readOnly ? 'rri--has-transitions' : ''
    }`;

    const getActiveClassNames = (index: number) => {
      const indexOfSelectedValue = ratingValues.indexOf(ratingValue as string);

      if (highlightOnlySelected) {
        if (indexOfSelectedValue === index) {
          return 'rri--active';
        }
        return 'rri--inactive';
      }
      if (indexOfSelectedValue + 1 <= index) {
        return 'rri--inactive';
      }
      return 'rri--active';
    };

    const getCssVariables = () => {
      if (isItemStylesObject) {
        return getItemStyles([itemStyles as ItemStyle])[0];
      }
      return {};
    };

    const getSingleCssVariables = (index: number) => {
      if (isItemStylesArray) {
        return getItemStyles(itemStyles)?.[index];
      }
      return {};
    };

    const getSingleStroke = (index: number): number => {
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
          ref: (ref: HTMLDivElement) =>
            (radioDivs.current[index] = ref as HTMLDivElement),
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

    // Render

    return (
      <>
        <div
          ref={externalRef}
          className={`rri--radio-group ${className || ''}`.trim()}
          id={id}
          style={{
            ...style,
            ...globalStyles,
            ...getCssVariables(),
          }}
          {...getInteractiveRadioGroupProps()}
        >
          {ratingValues.map((_, index) => (
            <div
              key={`rri_item_${index}`}
              className={`rri--radio ${getActiveClassNames(
                index
              )} ${additionalClassNames}`.trim()}
              {...getInteractiveRadioProps(index)}
            >
              <div
                style={getSingleCssVariables(index)}
                className="rri--box"
                aria-hidden="true"
              >
                <RatingItem
                  svgChildNodes={getSvgItem(index)}
                  strokeWidth={getSingleStroke(index)}
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
          <style>{getBreakpointRules(getFullBreakpoints())}</style>
        )}
      </>
    );
  }
);
