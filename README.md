# React Advanced Rating

:star: Zero-dependency, highly customizable rating component for React.

[Live demo and examples](https://smastromattei.dev)

<br />

## Features

- **Use any SVG**: No headaches, icon fonts or packages to install in order to use vectors from any source.
- Highly customizable: fills, strokes, colors, transitions and much more.
- Fully responsive and mobile-first
- Fully accessible with keyboard navigation and custom labels
- Fully typed with IntelliSense infos and autocomplete
- Dependency-free, ~3.5Kb gzipped.

<br />

## Table of contents

* [Installation](#installation)
* [Basic usage](#basic-usage)
* [API](#api)
* [Styling](#styling)
  + [Rating items](#rating-items)
  + [How to create itemNodes elements](#-`important`--how-to-create-itemnodes-elements)
  + [Advanced rating items styling](#advanced-rating-items-styling)
  + [Rating items half-fill and float values](#rating-items-half-fill-and-float-values)
  + [Styling via CSS](#styling-via-css)
* [Accessibility](#accessibility)
* [Troubleshooting](#troubleshooting)

<br/>

## Installation

```console
yarn add react-rating-input
```

<br />

## Basic usage

As an accessible [radio-group](https://dequeuniversity.com/library/aria/radio-and-radio-group) input:

```jsx
import React, { useState } from "react";
import { Rating } from 'react-advanced-rating';
import 'react-advanced-rating/dist/index.css'; // <-- Import CSS

const App = () => {
  const [ratingValue, setRatingValue] = useState(3); // <-- Initial value, init with 0 for no value

  return (
      <div style={{ maxWidth: 600 }}> {/* <-- Wrap it in a container */}
        <Rating
            value={ratingValue}
            onChange={(currentValue) => setRatingValue(currentValue)}
        >
      </div>
  )
};
```

or as an accessible non-interactive [image element](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role):

```jsx
import React from 'react';
import { Rating } from 'react-advanced-rating';
import 'react-advanced-rating/dist/index.css';

const App = () => (
  <div style={{ maxWidth: 600 }}>
    <Rating readOnly value={3.78} />
  </div>
);
```

### Usage with NextJS

**\_app.js**

```jsx
import 'react-advanced-rating/dist/index.css'; // <-- Import CSS

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default MyApp;
```

**page.js**

```jsx
import { useState } from 'react';
import { Rating } from 'react-advanced-rating';

const ProductPage = ({ ratingFromServer }) => (
  <div style={{ maxWidth: 600 }}>
    <Rating value={ratingFromServer} readOnly />
  </div>
);

export default ProductPage;

export const getServerSideProps = async (req, res) => {
  // Async ops...
  return {
    props: {
      ratingFromServer,
    },
  };
};
```

### Usage with Gatsby

Same as NextJS, but the CSS must be imported in **gatsby-browser.js**.

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

| Prop                  | Type                                                    | Description                                                                                | Default                                                           | Required                        | :thinking:          |
| --------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------------- | ------------------- |
| value                 | number                                                  | An integer from 0 to **limit**, can be a float if `readOnly` is **true**.                  | undefined                                                         | **Yes**                         | :green_circle:      |
| onChange              | function                                                | Callback to update `value`                                                                 | undefined                                                         | Only if `readOnly` is **false** | :large_blue_circle: |
| onHoverChange         | function                                                | Callback to update the hovered rating value                                                | undefined                                                         | No                              | :large_blue_circle: |
| limit                 | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10         | Maximum number of rating items to display                                                  | 5                                                                 | No                              | :green_circle:      |
| readOnly              | boolean                                                 | Whether or not the component should be an accessible image element                         | false                                                             | No                              | :green_circle:      |

`ref`, `id`, `className` and `style` are also available.

<br />

### :nail_care: Appearance

| Prop                  | Type                                                    | Description                                                                                | Default                                                           | Required                        | :thinking:          |
| --------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------------- | ------------------- |
| highlightOnlySelected | boolean                                                 | Whether or not to highlight only the selected rating item.                                 | false                                                             | No                              | :green_circle:      |
| halfFillMode          | `svg` \| `box`                                          | Whether to half-fill the SVG or the box if `value` is a float                              | `svg`                                                             | No                              | :purple_circle:     |
| orientation           | `horizontal` \| `vertical`                              | Orientation of the rating items                                                            | `horizontal`                                                      | No                              | :green_circle:      |
| spaceInside           | `none` \| `small` \| `regular` \| `large`               | Responsive padding of each rating item                                                     | `regular`                                                         | No                              | :green_circle:      |
| spaceBetween          | `none` \| `small` \| `regular` \| `large`               | Responsive gap between the rating items                                                    | `small`                                                           | No                              | :green_circle:      |
| radius                | `none` \| `small` \| `medium` \| `full`                 | Radius of each rating item                                                      | `small`                                                           | No                              | :green_circle:      |
| transition            | `none` \| `zoom` \| `colors` \| `opacity` \| `position` | Transition to apply when hovering/selecting                                                | `colors`                                                          | No                              | :large_blue_circle: |
| itemStyles            | [ItemStyle]()                                           | Custom SVGs and colors                                                                     | [defaultStyles]()                                                 | No                              | :green_circle:      |

Would you like to style it via CSS? Take a look [here]().

<br />

### :open_umbrella: Accessibility

| Prop                  | Type                                                    | Description                                                                                | Default                                                           | Required                        | :thinking:          |
| --------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------------- | ------------------- |
| enableKeyboard        | boolean                                                 | Whether or not to enable keyboard navigation                                               | true                                                              | No                              | :large_blue_circle: |
| labelledBy            | string                                                  | `id` of the element to be used as radio-group label. Value of `aria-labelledby` attribute. | undefined                                                         | No                              | :large_blue_circle: |
| accessibleLabels      | string[]                                                | Accessible labels for each rating item                                                     | `Rate 1`, `Rate 2`...                                             | No                              | :large_blue_circle: |
| accessibleLabel       | string                                                  | Value of `aria-label` attribute                                                            | `Rated <value> on <limit>` or `Rating` if `readOnly` is **false** | No                              | :green_circle:      |

<br />

## Styling

### Rating items

You can pass a `ItemStyle` object to `itemStyles` prop:

```ts
type ItemStyle = {
  itemNodes: JSX.Element | JSX.Element[];

  itemStrokeWidth?: number;
  boxBorderWidth?: number;

  activeItemColor?: string | string[];
  activeItemStrokeColor?: string | string[];
  activeBoxColor?: string | string[];
  activeBoxBorderColor?: string | string[];

  inactiveItemColor?: string;
  inactiveItemStrokeColor?: string;
  inactiveBoxColor?: string;
  inactiveBoxBorderColor?: string;
};
```

It may seem a lot of properties, but they are all optional (except for `svgChildNodes`), if a property is not set, no classes nor CSS variables will be added to the rendered HTML. Just set the ones that you need and that's it.

<details><summary><strong>Default styles</strong></summary>
<br />

```jsx
const Star = <polygon points="478.53 189 318.53 152.69 239.26 0 160 152.69 0 189 111.02 303.45 84 478.53 239.26 396.63 394.53 478.53 367.51 303.45 478.53 189" />;

const defaultItemStyles = {
  svgChildNodes: Star,
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

Depending on the vector nodes provided you may have to input and try different values in order to reach the desidered stroke width.

It is responsive by nature, so expect it to increase/decrease when resizing the container.
<br />

</details>

<details><summary><strong>Color values</strong></summary>
<br />

You can pass any valid CSS color string such as `aliceblue`, `#FFF332`, `rgba(0, 0, 0, 0)` or `hsl(69, 22, 200)`.

</details>

<br />

### `IMPORTANT` How to create itemNodes elements

In short, you should include in the JSX element only the inner **<u><a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes">basic shapes</a></u>** of your SVG: `path`, `circle`, `rect`, `polygon`, `ellipse`, `polyline` and `line`.

Then you should delete any **transform**, fill and stroke-related attribute from such elements. You can safely delete also any `data-*` and `id` attribute. 

The component will take care of rendering a brand-new responsive SVG element with the elements you provided, re-applying proper transforms when necessary.

You will be able to control the fill and the stroke for each rating item directly from `itemStyles` prop.

Just paste or open the SVG with a text editor, it will take 20 seconds:

**Example - SVG Source**

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g transform="translate(0 -0.073)">
    <!-- Include from here -->
    <circle
      cx="4"
      cy="4"
      r="4"
      transform="translate(8 3)" <!-- Delete -->
      fill="red" <!-- Delete -->
      stroke="2" <!-- Delete -->
    />
    <path
      transform="translate(0.4 2)" <!-- Delete -->
      d="M11,13a6.006,6.006,0,0,0-6,6,1,1,0,0,0,1,1H18a1,1,0,0,0,1-1,6.006,6.006,0,0,0-6-6Z"
    />
    <!-- To here -->
  </g>
</svg>
```

**Example - Destination**

```jsx
const SmilingFace = (
  <>
    <circle cx="4" cy="4" r="4" />
    <path d="M11,13a6.006,6.006,0,0,0-6,6,1,1,0,0,0,1,1H18a1,1,0,0,0,1-1,6.006,6.006,0,0,0-6-6Z" />
  </>
);

const itemStyle = {
  svgChildNodes: SmilingFace,
  activeItemColor: 'green',
  inactiveItemColor: 'gray',
};
```

**More examples**

<details><summary><strong>Example 2</strong></summary>
<br />

**Source**

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <!-- Delete -->
  <g transform="translate(0 -0.073)"> <!-- Delete -->
    <!-- Include from here -->
    <circle
      cx="4"
      cy="4"
      r="4"
      transform="translate(8 3)" <!-- Delete -->
      fill="red" <!-- Delete -->
      stroke="2" <!-- Delete -->
    />
    <path
      transform="translate(0.4 2)" <!-- Delete -->
      d="M11,13a6.006,6.006,0,0,0-6,6,1,1,0,0,0,1,1H18a1,1,0,0,0,1-1,6.006,6.006,0,0,0-6-6Z"
    />
    <!-- To here -->
  </g> <!-- Delete -->
</svg> <!-- Delete -->
```

**Destination**

```jsx
const SmilingFace = (
  <>
    <circle cx="4" cy="4" r="4" />
    <path d="M11,13a6.006,6.006,0,0,0-6,6,1,1,0,0,0,1,1H18a1,1,0,0,0,1-1,6.006,6.006,0,0,0-6-6Z" />
  </>
);

const itemStyle = {
  svgChildNodes: SmilingFace,
  activeItemColor: 'green',
  inactiveItemColor: 'gray',
};
```

</details>

<details><summary><strong>Example 2</strong></summary>
<br />

**Source**

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <!-- Delete -->
  <g transform="translate(0 -0.073)"> <!-- Delete -->
    <!-- Include from here -->
    <circle
      cx="4"
      cy="4"
      r="4"
      transform="translate(8 3)" <!-- Delete -->
      fill="red" <!-- Delete -->
      stroke="2" <!-- Delete -->
    />
    <path
      transform="translate(0.4 2)" <!-- Delete -->
      d="M11,13a6.006,6.006,0,0,0-6,6,1,1,0,0,0,1,1H18a1,1,0,0,0,1-1,6.006,6.006,0,0,0-6-6Z"
    />
    <!-- To here -->
  </g> <!-- Delete -->
</svg> <!-- Delete -->
```

**Destination**

```jsx
const SmilingFace = (
  <>
    <circle cx="4" cy="4" r="4" />
    <path d="M11,13a6.006,6.006,0,0,0-6,6,1,1,0,0,0,1,1H18a1,1,0,0,0,1-1,6.006,6.006,0,0,0-6-6Z" />
  </>
);

const itemStyle = {
  svgChildNodes: SmilingFace,
  activeItemColor: 'green',
  inactiveItemColor: 'gray',
};
```

</details>

<details><summary><strong>Example 2</strong></summary>
<br />

**Source**

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <!-- Delete -->
  <g transform="translate(0 -0.073)"> <!-- Delete -->
    <!-- Include from here -->
    <circle
      cx="4"
      cy="4"
      r="4"
      transform="translate(8 3)" <!-- Delete -->
      fill="red" <!-- Delete -->
      stroke="2" <!-- Delete -->
    />
    <path
      transform="translate(0.4 2)" <!-- Delete -->
      d="M11,13a6.006,6.006,0,0,0-6,6,1,1,0,0,0,1,1H18a1,1,0,0,0,1-1,6.006,6.006,0,0,0-6-6Z"
    />
    <!-- To here -->
  </g> <!-- Delete -->
</svg> <!-- Delete -->
```

**Destination**

```jsx
const SmilingFace = (
  <>
    <circle cx="4" cy="4" r="4" />
    <path d="M11,13a6.006,6.006,0,0,0-6,6,1,1,0,0,0,1,1H18a1,1,0,0,0,1-1,6.006,6.006,0,0,0-6-6Z" />
  </>
);

const itemStyle = {
  svgChildNodes: SmilingFace,
  activeItemColor: 'green',
  inactiveItemColor: 'gray',
};
```

</details>

<details><summary><strong>Example 2</strong></summary>
<br />

**Source**

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <!-- Delete -->
  <g transform="translate(0 -0.073)"> <!-- Delete -->
    <!-- Include from here -->
    <circle
      cx="4"
      cy="4"
      r="4"
      transform="translate(8 3)" <!-- Delete -->
      fill="red" <!-- Delete -->
      stroke="2" <!-- Delete -->
    />
    <path
      transform="translate(0.4 2)" <!-- Delete -->
      d="M11,13a6.006,6.006,0,0,0-6,6,1,1,0,0,0,1,1H18a1,1,0,0,0,1-1,6.006,6.006,0,0,0-6-6Z"
    />
    <!-- To here -->
  </g> <!-- Delete -->
</svg> <!-- Delete -->
```

**Destination**

```jsx
const SmilingFace = (
  <>
    <circle cx="4" cy="4" r="4" />
    <path d="M11,13a6.006,6.006,0,0,0-6,6,1,1,0,0,0,1,1H18a1,1,0,0,0,1-1,6.006,6.006,0,0,0-6-6Z" />
  </>
);

const itemStyle = {
  svgChildNodes: SmilingFace,
  activeItemColor: 'green',
  inactiveItemColor: 'gray',
};
```

</details>

<br />

### Advanced rating items styling

If you wish to style each rating item, you can optionally pass an array of JSX elements and an array of valid CSS colors to any **active** color property you want to customize:

![](https://i.ibb.co/RTZ9mh8/Registrazione-schermo-2022-06-02-alle-00-27-10.gif)

```jsx
const SadFace = <polygon points="100,10 40,198 190,78 10,78 160,198" />;
const Face = <polygon points="100,10 40,198 190,78 10,78 160,198" />;
const HappyFace = <polygon points="100,10 40,198 190,78 10,78 160,198" />;

const itemStyles = {
    svgChildNodes: [SadFace, Face, HappyFace],
    activeItemColor: ['white', 'white', 'white'],
    activeBoxColor: '#22C55E',
    inactiveItemColor: '#DCFCE7',
    inactiveBoxColor: '#D4D4D4',
};

const App = () => {
  const [ratingValue, setRatingValue] = useState(0);

  return (
      <div style={{ maxWidth: 600 }}>
        <RatingInput
            limit={3}
            itemStyles={itemStyles}
            value={ratingValue}
            onChange={(currentValue) => setValue(currentValue)}
        >
      </div>
  )
};
```

<br />

### Rating items half-fill and float values

If `readOnly` is set to **true**, `value` prop accepts a float:

```jsx
const App = () => (
  <div style={{ maxWidth: 300 }}>
    <Rating readOnly value={1.38} />
  </div>
);
```



The component will try to round it to the nearest half integer:

```js
3.2 = 3
3.26 = 3.5
3.62 = 3.5
3.75 = 4
```

If necessary, the SVG will be half-filled by default (`halfFillMode = 'svg'`):

![react rating](https://i.ibb.co/H29m0mQ/Schermata-2022-06-01-alle-23-41-53.png)

All the boxes will have the same background color (inactiveBoxColor) and `activeBoxColor` will have no effect.

You can switch between `svg` and `box`:

```jsx
const App = () => (
  <div style={{ maxWidth: 300 }}>
    <Rating readOnly value={2.38} halfFillMode="box" />
  </div>
);
```

![react rating](https://i.ibb.co/sKpybbV/Schermata-2022-06-01-alle-23-43-29.png)

In this case instead, all the SVGs will have the same fill color (inactiveFillColor) and `activeFillColor` will have no effect.

If you don't want the half-fill feature, simply pass an integer to `value`.

> :warning: If `highlightOnlySelected` is set to **true**, any float value provided will be rounded to nearest integer and no half-fill will ever take place.

<br />

### Styling via CSS

Although the component already comes with optimal styles configurable via props, and it shouldn't be necessary to touch any CSS it may happen that you have or prefer to.

You can assign a custom class to `<Rating />`:

```jsx
const App = () => {
  const [ratingValue, setRatingValue] = useState(3);

  return (
      <div style={{ maxWidth: 250 }}>
        <Rating
            value={ratingValue}
            onChange={(currentValue) => setRatingValue(currentValue)}
            className="my-own-class"
        >
    </div>
  )
};
```

Then, disable any style you want to replace via props, so that no variables or classes for that specific style will be generated/injected:

```jsx
<Rating
    value={ratingValue}
    onChange={(currentValue) => setRatingValue(currentValue)}
    className="my-own-class"
    spaceBetween="none"
    radius="none"
    transition="none"
>
```

Then you can target the child elements and style them:

```css
.my-own-class {
  gap: 20px;
}

.my-own-class .rar--box {
  border-radius: 20px;
}

.my-own-class .rar--svg-item {
  transform: scale(1);
  transition: all 300ms cubic-bezier(0.87, 0, 0.13, 1);
  opacity: 0.5;
}

.my-own-class .rar--box.rar--on .rar--svg-item {
  transform: scale(2);
  opacity: 1;
}
```

<br />

## Accessibility

### Radio group labels

By default, the radio-group element has an invisible label whose value equals to `Rate`. To customize it, you have two choices:

**1. With a visible label:**

```jsx
const LABEL_DOM_ID = "rating_group_label"

const App = () => {
  const [ratingValue, setRatingValue] = useState(3);

  return (
      <div style={{ maxWidth: 250, display: 'flex', flexDirection: "column", gap: '10px' }}>
        <h3 id={LABEL_DOM_ID}>Rate this product</h3>
        <Rating
            value={ratingValue}
            onChange={(currentValue) => setRatingValue(currentValue)}
            labelledBy={LABEL_DOM_ID}
        >
    </div>
  )
};
```

**2. With an invisible label:**

```jsx
const App = () => {
  const [ratingValue, setRatingValue] = useState(3);

  return (
      <div style={{ maxWidth: 250 }}>
        <Rating
            value={ratingValue}
            onChange={(currentValue) => setRatingValue(currentValue)}
            accessibleLabel="Rate this product"
        >
    </div>
  )
};
```

If you have set both props, `labelledBy` will take precedence over `accessibleLabel`.

### Rating items labels

By default, if no `accessibleLabels` prop is set, an hidden label will automatically be generated for each rating item. The first item will have the label `Rate 1`, the second one `Rate 2` and so on.

To customize them, pass an array of strings to `accessibleLabels`:

```jsx
const LABEL_DOM_ID = "rating_group_label"

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
      <div style={{ maxWidth: 250 }}>
        <h3 id={LABEL_DOM_ID}>Rate this product</h3>
        <Rating
            value={ratingValue}
            onChange={(currentValue) => setRatingValue(currentValue)}
            labelledBy={LABEL_DOM_ID}
            accessibleLabels={labels}
        >
    </div>
  )
};
```

### Image element label

By default if `readOnly` is set to **true**, an accessible label for the image element will be equal to `Rated ${value}`. To customize it, simply set the `accessibleLabel` prop:

```jsx
import React from 'react';
import { Rating } from 'react-advanced-rating';
import 'react-advanced-rating/dist/index.min.css';

const ratingValue = 3.5;
const ratingLabel = `This product is rated ${ratingValue} on 5`;

const App = () => (
  <div style={{ maxWidth: 600 }}>
    <Rating readOnly value={ratingValue} accessibleLabel={ratingLabel} />
  </div>
);
```

### Keyboard navigation

To navigate the rating items:

- **Tab** - Focus or blur the current selected rating item
- **Left Arrow | Down Arrow** - Select the next rating item
- **Right Arrow | Up Arrow** - Select the previous item

<br />

## Troubleshooting

### I can see the nodes returned from rendering, but no styles have been applied.

Check that you have imported the CSS as displayed in the [Basic usage]() section.

### I passed an array of SVGs but the stroke width looks different for each item.

This package enforces you to use icons from the same package and author to keep design consistency. Be sure you are doing that.

You can find clean, attribution-free SVG collections at [SVG Repo](https://www.svgrepo.com/collections/monocolor).

### I keep getting the error "svgChildNodes is not a valid JSX element".

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
