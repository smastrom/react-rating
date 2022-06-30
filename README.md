# React Advanced Rating

:star: Zero-dependency, highly customizable rating component for React.

[Live demo and examples](https://react-advanced-rating.onrender.com/)

<br />

## Features

- **Use any SVG**: No headaches, icon fonts or packages to install in order to use vectors from any source.
- Highly customizable: fills, strokes, colors, transitions and much more.
- Fully responsive and mobile-first
- Fully accessible with keyboard navigation and custom labels
- Works both on the server and the client
- Fully typed with IntelliSense infos and autocomplete
- Dependency-free, ~3.8Kb gzipped.

<br />

## Table of contents

- [Installation](#installation)
- [Basic usage](#basic-usage)
- [API](#api)
- [Styling](#styling)
  - [Rating items](#rating-items)
  - [How to create itemShapes elements](#how-to-create-itemshapes-elements)
  - [Advanced styling](#advanced-styling)
  - [Half-fill and float values](#half-fill-and-float-values)
  - [Styling via CSS](#styling-via-css)
- [Accessibility](#accessibility)
- [Troubleshooting](#troubleshooting)

<br/>

## Installation

```console
yarn add react-advanced-rating
```

Or with NPM:

```console
npm i -S react-advanced-rating
```

<br />

## Basic usage

As an accessible [radio-group](https://developer.mozilla.org/en-US/docs/web/accessibility/aria/roles/radiogroup_role) input:

```jsx
import React, { useState } from "react";
import { Rating } from 'react-advanced-rating';

import 'react-advanced-rating/dist/index.css'; // <-- Import CSS

const App = () => {
  const [ratingValue, setRatingValue] = useState(3); // <-- Initial value, init with 0 for no value

  return (
      <div style={{ maxWidth: 600, width: "100%" }}> {/* <-- Wrap it in a container */}
        <Rating
            value={ratingValue}
            onChange={(currentValue) => setRatingValue(currentValue)}
        >
      </div>
  )
};
```

or as an accessible, non-interactive [image element](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role):

```jsx
import React from 'react';
import { Rating } from 'react-advanced-rating';

import 'react-advanced-rating/dist/index.css';

const App = () => (
  <div style={{ maxWidth: 600, width: '100%' }}>
    <Rating readOnly value={3.78} />
  </div>
);
```

### Usage with frameworks

- **NextJS** - Import the CSS once in **\_app.js**
- **Gatsby** - Import the CSS once in **gatsby-browser.js**

<br />

## API

**Legend**

| Color               | Description                                |
| ------------------- | ------------------------------------------ |
| :green_circle:      | Has always effect                          |
| :large_blue_circle: | Has effect only if `readOnly` is **false** |
| :purple_circle:     | Has effect only if `readOnly` is **true**  |

<br />

### :cyclone: Core

| Prop               | Type                                            | Description                                                                        | Default   | Required                        | :thinking:          |
| ------------------ | ----------------------------------------------- | ---------------------------------------------------------------------------------- | --------- | ------------------------------- | ------------------- |
| value              | number                                          | An integer from 0 to `items`. It can be a float if `readOnly` is **true**.         | undefined | **Yes**                         | :green_circle:      |
| onChange           | function                                        | Callback to set the rating value                                                   | undefined | Only if `readOnly` is **false** | :large_blue_circle: |
| onHoverChange      | function                                        | Callback to set the hovered value                                                  | undefined | No                              | :large_blue_circle: |
| items              | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 | Number of rating items to display                                                  | 5         | No                              | :green_circle:      |
| readOnly           | boolean                                         | Whether or not to render an accessible image element                               | false     | No                              | :green_circle:      |
| resetOnSecondClick | boolean                                         | Whether or not to reset the rating value when clicking again on the current rating | false     | No                              | :large_blue_circle: |

`ref`, `id`, `className` and `style` are also available.

<br />

### :nail_care: Appearance

| Prop                  | Type                                                    | Description                                               | Default       | Required | :thinking:          |
| --------------------- | ------------------------------------------------------- | --------------------------------------------------------- | ------------- | -------- | ------------------- |
| highlightOnlySelected | boolean                                                 | Whether or not to highlight only the selected rating item | false         | No       | :green_circle:      |
| halfFillMode          | `svg` \| `box`                                          | Whether to half-fill the SVG or the box                   | `svg`         | No       | :purple_circle:     |
| orientation           | `horizontal` \| `vertical`                              | Orientation of the rating items                           | `horizontal`  | No       | :green_circle:      |
| spaceInside           | `none` \| `small` \| `medium` \| `large`                | Responsive padding of each rating item                    | `regular`     | No       | :green_circle:      |
| spaceBetween          | `none` \| `small` \| `medium` \| `large`                | Responsive gap between the rating items                   | `small`       | No       | :green_circle:      |
| radius                | `none` \| `small` \| `medium` \| `full`                 | Radius of each rating item                                | `small`       | No       | :green_circle:      |
| transition            | `none` \| `zoom` \| `colors` \| `opacity` \| `position` | Transition to apply when hovering/selecting               | `colors`      | No       | :large_blue_circle: |
| itemStyles            | ItemStyle                                               | Custom SVGs and colors                                    | defaultStyles | No       | :green_circle:      |

Would you like to style it via CSS? Take a look [here](#styling-via-css).

<br />

### :open_umbrella: Accessibility

| Prop             | Type     | Description                                                                                          | Default                                                           | Required | :thinking:          |
| ---------------- | -------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | -------- | ------------------- |
| enableKeyboard   | boolean  | Whether or not to enable keyboard navigation                                                         | true                                                              | No       | :large_blue_circle: |
| isRequired       | boolean  | Whether or not to tell assistive technologies that rating is required                                | true                                                              | No       | :large_blue_circle: |
| labelledBy       | string   | `id` of the element to be used as radio-group label. If set, takes precedence over `accessibleLabel` | undefined                                                         | No       | :large_blue_circle: |
| accessibleLabels | string[] | Accessible labels of each rating item                                                                | `Rate 1`, `Rate 2`...                                             | No       | :large_blue_circle: |
| accessibleLabel  | string   | Value of `aria-label` attribute                                                                      | `Rated <value> on <items>` or `Rating` if `readOnly` is **false** | No       | :green_circle:      |

<br />

## Styling

### Rating items

Pass an `ItemStyle` object to `itemStyles` prop:

```ts
type ItemStyle = {
  itemShapes: JSX.Element | JSX.Element[];

  itemStrokeWidth?: number;
  boxBorderWidth?: number;

  activeFillColor?: string | string[];
  activeStrokeColor?: string | string[];
  activeBoxColor?: string | string[];
  activeBoxBorderColor?: string | string[];

  inactiveFillColor?: string;
  inactiveStrokeColor?: string;
  inactiveBoxColor?: string;
  inactiveBoxBorderColor?: string;
};
```

All the properties are **optional** (except for `itemShapes`). If a property isn't defined, no classes nor CSS variables will be added to the rendered HTML.

Just set the ones you need and that's it:

```jsx
const CustomStar = (
  <polygon points="478.53 189 318.53 152.69 239.26 0 160 152.69 0 189 111.02 303.45 84 478.53 239.26 396.63 394.53 478.53 367.51 303.45 478.53 189" />
);

const customStyles = {
  itemShapes: CustomStar,
  activeFillColor: '#22C55E',
  inactiveFillColor: '#BBF7D0',
};

const App = () => {
  const [ratingValue, setRatingValue] = useState(4);

  return (
    <div
      style={{
        maxWidth: 300,
        width: '100%',
      }}
    >
      <Rating
        value={ratingValue}
        onChange={(selectedValue) => setRatingValue(selectedValue)}
        itemStyles={customStyles}
      />
    </div>
  );
};
```

<details><summary><strong>Default styles</strong></summary>
<br />

```jsx
const Star = (
  <polygon points="478.53 189 318.53 152.69 239.26 0 160 152.69 0 189 111.02 303.45 84 478.53 239.26 396.63 394.53 478.53 367.51 303.45 478.53 189" />
);

const defaultItemStyles = {
  itemShapes: Star,
  itemStrokeWidth: 40,

  activeFillColor: '#ffb23f',
  activeStrokeColor: '#e17b21',

  inactiveFillColor: '#fff7ed',
  inactiveStrokeColor: '#e17b21',
};
```

</details>

<details><summary><strong>How itemStrokeWidth works</strong></summary>
<br />

The stroke width is expressed in _viewBox user coordinate's unit size_ and **not in pixels**.

Depending on the vector nodes provided you may have to input and try different values in order to reach the desired stroke width.

It is responsive by nature, so expect it to increase/decrease when resizing the container.
<br />

</details>

<details><summary><strong>Color values</strong></summary>
<br />

You can pass any valid CSS color string such as `aliceblue`, `#FFF332`, `rgba(0, 0, 0, 0)` or `hsl(69, 22, 200)`.

</details>

<br />

### How to create itemShapes elements

This package is designed to work with SVGs from any source: just provide the inner shapes and the component will take care of rendering a brand-new, responsive SVG for you.

1. Extract the **<u><a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes">basic shapes</a></u>** from the SVG: `path`, `circle`, `rect`, `polygon`, `ellipse`, `polyline` or `line`.

2. Delete any fill and stroke-related attribute from the shapes. You will be able to control such values directly from `itemStyles` prop. You can safely delete also any `data-name` and `id` attribute.

3. Delete also any **top-level** parent group (`g`), whether or not it has transforms applied.

4. Create a new JSX Element from the shapes and assign it to `itemShapes` property.

> :warning: This example describes the worst-case scenario with a very messy SVG code pasted from Adobe XD which automatically applies translations, useless attributes and groups. If your SVGs comes from quality sources like
> [css.gg](https://css.gg/), [Feather](https://feathericons.com/) or [SVG Repo](https://www.svgrepo.com/collections/monocolor/), you won't have to do anything else than removing stroke and fill attributes.

**SVG Source**

```html
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
  <g transform="translate(-1 -1)">
    <line
      id="Line_2"
      data-name="Line 2"
      y2="4"
      transform="translate(15 7)"
      fill="none"
      stroke="#000"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    />
    <path
      id="Path_1"
      data-name="Path 1"
      d="M8,16a8.858,8.858,0,0,1,4-1,8.87,8.87,0,0,1,4,1"
      fill="none"
      stroke="#000"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    />
    <circle
      id="Ellipsis_1"
      data-name="Ellipsis 1"
      cx="10"
      cy="10"
      r="10"
      transform="translate(2 2)"
      fill="none"
      stroke="#000"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    />
  </g></svg
>;
```

**Destination**

```jsx
const StrangeFace = (
  <>
    <line y2="4" transform="translate(15 7)" />
    <path d="M8,16a8.858,8.858,0,0,1,4-1,8.87,8.87,0,0,1,4,1" />
    <circle cx="10" cy="10" r="10" transform="translate(2 2)" />
  </>
);

/**
 * Since this is an outline icon without any fill color
 * we just set the desired stroke width and color.
 */

const customStyles = {
  itemShapes: StrangeFace,
  itemStrokeWidth: 2,
  activeStrokeColor: 'green',
  inactiveStrokeColor: 'gray',
};

const App = () => {
  const [ratingValue, setRatingValue] = useState(4);

  return (
    <div
      style={{
        maxWidth: 300,
        width: '100%',
      }}
    >
      <Rating
        value={ratingValue}
        onChange={(selectedValue) => setRatingValue(selectedValue)}
        itemStyles={customStyles}
      />
    </div>
  );
};
```

<br />

### Advanced styling

If you wish to style each rating item, you can optionally pass an array of JSX elements to `itemShapes` and an array of valid CSS colors to any **<u>active color</u>** property:

![react-advanced-rating](https://i.ibb.co/QXsDp8B/Schermata-2022-06-30-alle-01-30-51.png)

```jsx
const SadFace = (
  <path d="M12.0000002,1.99896738 C17.523704,1.99896738 22.0015507,6.47681407 22.0015507,12.0005179 C22.0015507,17.5242217 17.523704,22.0020684 12.0000002,22.0020684 C6.47629639,22.0020684 1.99844971,17.5242217 1.99844971,12.0005179 C1.99844971,6.47681407 6.47629639,1.99896738 12.0000002,1.99896738 Z M12.0000002,3.49896738 C7.30472352,3.49896738 3.49844971,7.30524119 3.49844971,12.0005179 C3.49844971,16.6957946 7.30472352,20.5020684 12.0000002,20.5020684 C16.6952769,20.5020684 20.5015507,16.6957946 20.5015507,12.0005179 C20.5015507,7.30524119 16.6952769,3.49896738 12.0000002,3.49896738 Z M12.0000001,13.4979816 C13.6312483,13.4979816 15.1603686,14.1528953 16.2810488,15.2934358 C16.5713583,15.5888901 16.5671876,16.0637455 16.2717333,16.354055 C15.976279,16.6443646 15.5014236,16.6401939 15.211114,16.3447396 C14.3696444,15.4883577 13.2246935,14.9979816 12.0000001,14.9979816 C10.7726114,14.9979816 9.62535029,15.4905359 8.78347552,16.3502555 C8.49366985,16.6462041 8.01882223,16.6511839 7.72287367,16.3613782 C7.4269251,16.0715726 7.4219453,15.5967249 7.71175097,15.3007764 C8.83296242,14.155799 10.3651558,13.4979816 12.0000001,13.4979816 Z M9.00044779,8.75115873 C9.69041108,8.75115873 10.2497368,9.3104845 10.2497368,10.0004478 C10.2497368,10.6904111 9.69041108,11.2497368 9.00044779,11.2497368 C8.3104845,11.2497368 7.75115873,10.6904111 7.75115873,10.0004478 C7.75115873,9.3104845 8.3104845,8.75115873 9.00044779,8.75115873 Z M15.0004478,8.75115873 C15.6904111,8.75115873 16.2497368,9.3104845 16.2497368,10.0004478 C16.2497368,10.6904111 15.6904111,11.2497368 15.0004478,11.2497368 C14.3104845,11.2497368 13.7511587,10.6904111 13.7511587,10.0004478 C13.7511587,9.3104845 14.3104845,8.75115873 15.0004478,8.75115873 Z" />
);

const SmilingFace = (
  <path d="M12.0000002,1.99896738 C17.523704,1.99896738 22.0015507,6.47681407 22.0015507,12.0005179 C22.0015507,17.5242217 17.523704,22.0020684 12.0000002,22.0020684 C6.47629639,22.0020684 1.99844971,17.5242217 1.99844971,12.0005179 C1.99844971,6.47681407 6.47629639,1.99896738 12.0000002,1.99896738 Z M12.0000002,3.49896738 C7.30472352,3.49896738 3.49844971,7.30524119 3.49844971,12.0005179 C3.49844971,16.6957946 7.30472352,20.5020684 12.0000002,20.5020684 C16.6952769,20.5020684 20.5015507,16.6957946 20.5015507,12.0005179 C20.5015507,7.30524119 16.6952769,3.49896738 12.0000002,3.49896738 Z M8.46174078,14.7838355 C9.31087697,15.8615555 10.6018926,16.5020843 11.9999849,16.5020843 C13.396209,16.5020843 14.6856803,15.8632816 15.5349376,14.7880078 C15.7916692,14.4629512 16.2633016,14.4075628 16.5883582,14.6642944 C16.9134148,14.9210259 16.9688032,15.3926584 16.7120717,15.717715 C15.5813083,17.1494133 13.8601276,18.0020843 11.9999849,18.0020843 C10.1373487,18.0020843 8.41411759,17.1471146 7.28351576,15.7121597 C7.02716611,15.3868018 7.08310832,14.9152347 7.40846617,14.6588851 C7.73382403,14.4025354 8.20539113,14.4584777 8.46174078,14.7838355 Z M9.00044779,8.75115873 C9.69041108,8.75115873 10.2497368,9.3104845 10.2497368,10.0004478 C10.2497368,10.6904111 9.69041108,11.2497368 9.00044779,11.2497368 C8.3104845,11.2497368 7.75115873,10.6904111 7.75115873,10.0004478 C7.75115873,9.3104845 8.3104845,8.75115873 9.00044779,8.75115873 Z M15.0004478,8.75115873 C15.6904111,8.75115873 16.2497368,9.3104845 16.2497368,10.0004478 C16.2497368,10.6904111 15.6904111,11.2497368 15.0004478,11.2497368 C14.3104845,11.2497368 13.7511587,10.6904111 13.7511587,10.0004478 C13.7511587,9.3104845 14.3104845,8.75115873 15.0004478,8.75115873 Z" />
);

const customStyles = {
  itemShapes: [SadFace, SmilingFace],
  activeFillColor: ['#da1600', '#61bb00'],
  inactiveFillColor: '#a8a8a8',
};

export const FacesRating = () => {
  const [ratingValue, setRatingValue] = useState(0);

  return (
    <div
      style={{
        maxWidth: 200,
        width: '100%',
      }}
    >
      <Rating
        value={ratingValue}
        onChange={(selectedValue) => setRatingValue(selectedValue)}
        items={2}
        itemStyles={customStyles}
        highlightOnlySelected
      />
    </div>
  );
};
```

![react-advanced-rating](https://s8.gifyu.com/images/in_AdobeExpress.gif)

```jsx
const Star = (
  <path d="M62 25.154H39.082L32 3l-7.082 22.154H2l18.541 13.693L13.459 61L32 47.309L50.541 61l-7.082-22.152L62 25.154z" />
);

const customStyles = {
  itemShapes: Star,
  boxBorderWidth: 3,

  activeFillColor: ['#FEE2E2', '#FFEDD5', '#FEF9C3', '#ECFCCB', '#D1FAE5'],
  activeBoxColor: ['#da1600', '#db711a', '#dcb000', '#61bb00', '#009664'],
  activeBoxBorderColor: ['#c41400', '#d05e00', '#cca300', '#498d00', '#00724c'],

  inactiveFillColor: 'white',
  inactiveBoxColor: '#dddddd',
  inactiveBoxBorderColor: '#a8a8a8',
};

export const App = () => {
  const [ratingValue, setRatingValue] = useState(4);

  return (
    <div
      style={{
        maxWidth: 500,
        width: '100%',
      }}
    >
      <Rating
        value={ratingValue}
        onChange={(selectedValue) => setRatingValue(selectedValue)}
        itemStyles={customStyles}
        radius="large"
        spaceInside="large"
      />
    </div>
  );
};
```

<br />

### Half-fill and float values

If `readOnly` is set to **true**, `value` prop accepts a float:

```jsx
<Rating readOnly value={1.38} />
```

The component will try to round it to the nearest half integer:

```js
3.2 = 3
3.26 = 3.5
3.62 = 3.5
3.75 = 4
```

> :warning: The value will only be rounded "internally" for graphical purposes. The accessible label will always display the value you provided.

If necessary, the SVG will be half-filled by default (`halfFillMode = 'svg'`):

![react-advanced-rating](https://i.ibb.co/H29m0mQ/Schermata-2022-06-01-alle-23-41-53.png)

All the boxes will have the same background color (inactiveBoxColor) and `activeBoxColor` will have no effect.

You can switch between `svg` and `box`:

```jsx
<Rating readOnly value={2.38} halfFillMode="box" />
```

![react-advanced-rating](https://i.ibb.co/sKpybbV/Schermata-2022-06-01-alle-23-43-29.png)

In this case instead, all the SVGs will have the same fill color (inactiveFillColor) and `activeFillColor` will have no effect.

If you don't want the half-fill feature, simply pass an integer to `value`.

> :warning: If `highlightOnlySelected` is set to **true**, no half-fill will take place.

<br />

### Styling via CSS

It shouldn't be necessary to touch any CSS, however it may happen that you have to:

1. Assign a custom class to `<Rating />`:

```jsx
<Rating
  value={ratingValue}
  onChange={(currentValue) => setRatingValue(currentValue)}
  className="my-own-class"
/>
```

2. Disable any style you want to replace via props, so that no variables nor classes for that style will be generated/injected:

```jsx
<Rating
  value={ratingValue}
  onChange={(currentValue) => setRatingValue(currentValue)}
  className="my-own-class"
  spaceBetween="none"
  spaceInside="none"
  radius="none"
  transition="none"
>
```

3. Target the child elements and style them:

```css
.my-own-class {
  gap: 20px;
}

.my-own-class .rar--svg {
  border-radius: 10px;
  padding: 5px;
}

.my-own-class .rar--svg {
  transform: scale(1);
  transition: all 300ms cubic-bezier(0.87, 0, 0.13, 1);
  opacity: 0.5;
}

.my-own-class .rar--on:hover .rar--svg {
  transform: scale(1.5);
  opacity: 1;
}
```

<br />

## Accessibility

### Radio group label

By default, the radio-group element has an invisible label whose value equals to `Rate`. Depending on your needs you can customize it:

**1. With a visible label**

Add `role="radiogroup"` to the container, create a label element and pass its `id` to `labelledBy`:

```jsx
const LABEL_ID = 'rating_group_label';

const App = () => {
  const [ratingValue, setRatingValue] = useState(3);

  return (
    <div role="radiogroup" style={{ maxWidth: 300, width: '100%' }}>
      <h3 id={LABEL_ID}>Rate this product</h3>
      <Rating
        value={ratingValue}
        onChange={(currentValue) => setRatingValue(currentValue)}
        labelledBy={LABEL_ID}
      />
    </div>
  );
};
```

**2. With an invisible label**

```jsx
const App = () => {
  const [ratingValue, setRatingValue] = useState(3);

  return (
    <div style={{ maxWidth: 250, width: '100%' }}>
      <Rating
        value={ratingValue}
        onChange={(currentValue) => setRatingValue(currentValue)}
        accessibleLabel="Rate this product"
      />
    </div>
  );
};
```

If you have set both props, `labelledBy` will take precedence over `accessibleLabel`.

### Rating items labels

By default, if no `accessibleLabels` prop is set, an hidden label-element will automatically be rendered for each rating item. The first item will be labelled `Rate 1`, the second one `Rate 2` and so on.

To customize them, pass an array of strings to `accessibleLabels`:

```jsx
const LABEL_ID = 'rating_group_label';

const labels = [
  'Rate 1 - Not recommended',
  'Rate 2 - Poor',
  'Rate 3 - Average',
  'Rate 4 - Very Good',
  'Rate 5 - Excellent',
];

const App = () => {
  const [ratingValue, setRatingValue] = useState(3);

  return (
    <div role="radiogroup" style={{ maxWidth: 300, width: '100%' }}>
      <h3 id={LABEL_ID}>Rate this product</h3>
      <Rating
        value={ratingValue}
        onChange={(currentValue) => setRatingValue(currentValue)}
        labelledBy={LABEL_ID}
        accessibleLabels={labels}
      />
    </div>
  );
};
```

### Image element label

By default, if `readOnly` is set to **true**, an accessible label equal to `Rated <value> on <items>` will be added to the image element. To customize it, simply set the `accessibleLabel` prop:

```jsx
const productName = 'Yellow tomato';
const ratingValue = 3.5;
const ratingLabel = `${productName} is rated ${ratingValue} on 5`;

const App = () => (
  <div style={{ maxWidth: 600, width: '100%' }}>
    <Rating readOnly value={ratingValue} accessibleLabel={ratingLabel} />
  </div>
);
```

### Keyboard navigation

- **Tab** - Default behavior
- **Shift + Tab** - Default behavior
- **Left Arrow | Down Arrow** - Select the next rating item
- **Right Arrow | Up Arrow** - Select the previous rating item
- **Spacebar | Enter** - Set/unset the current selection

<br />

## Troubleshooting

### I can see the nodes returned from rendering, but no styles have been applied.

Check that you have imported the CSS as displayed in the [Basic usage]() section.

### I passed an array of SVGs but the stroke width looks different for each item.

When passing different shapes for each rating item, this package forces you to use icons from the same collection to keep design consistency. Be sure you are doing that.

You can find clean, attribution-free SVG collections at [SVG Repo](https://www.svgrepo.com/collections/monocolor).

### I keep getting the error "itemShapes" is not a valid JSX element".

Check that you are passing a JSX element and not a functional component:

:white_check_mark: **Correct**

```jsx
const Star = <path d="M100,10L40 198 190 78 10 78 160 198z" />;
```

:x: **Incorrect**

```jsx
const Star = () => <path d="M100,10L40 198 190 78 10 78 160 198z" />;
```

<br />

## Local development

The `main` branch contains the latest version of this package. Rating component is imported in a simple test React App which runs on a [Vite](https://vitejs.dev/) dev server.

In `dev/` you can find the test app files. It is just a blank React app container with some CSS resets applied.

In `src/` you can find the package core files, the build entry point is `src/index.ts`.

Once cloned, just run:

```console
yarn
yarn dev
```

Vite's [Library Mode](https://vitejs.dev/guide/build.html#library-mode) is used to bundle the package. To build the package just run:

```console
yarn build
```

<br />

## License

MIT Licensed. Copyright (c) Simone Mastromattei 2022.
