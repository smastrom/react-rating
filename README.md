# React Rating Input

Rating components for React focused on accessibility, SVGs, mobile-first and customization.

[Live demo and examples](https://smastromattei.dev)

<br />

## Features

- Use any SVG: No headaches or icon fonts in order to use your own vectors.
- Automatic SVG scaling and positioning
- Highly customizable: fills, strokes, box color and borders, hover, transitions, breakpoints and much more.
- Fully responsive and mobile-first
- Fully accessible with keyboard navigation and custom labels
- Dependency-free, ~2.5Kb gzipped.
- Fully typed with IntelliSense completion and infos.

<br />

## Installation

Node:

```console
yarn add react-rating-input
```

In the browser:

```js
import
```

<br />

## Package

The package exports two components:

- **RatingInput** - Accessible [radio-group](https://dequeuniversity.com/library/aria/radio-and-radio-group) to be used as input
- **Rating** - Accessible [image element](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role) to display the rating

<br />

## Basic usage

Examples of the most basic usage including only the required props.

### RatingInput

```jsx
import React, { useState } from "react";
import { RatingInput } from 'react-rating-input';
import 'react-rating-input/dist/index.min.css'; // <-- Import CSS

const App = () => {
  const [value, setValue] = useState(3); // <-- Initial value, init with null for no value

  return (
      <div style={{ maxWidth: 600 }}> {/* <-- Wrap it in a container */}
        <RatingInput
            ratingValue={value}
            onChange={(currentValue) => setValue(currentValue)}
        >
      </div>
  )
};
```

### Rating

```jsx
import React from 'react';
import { Rating } from 'react-rating-input';
import 'react-rating-input/dist/index.min.css';

const App = () => (
  <div style={{ maxWidth: 600 }}>
    <Rating ratingValue={3.78} />
  </div>
);
```

<br />

## Props

### RatingInput

| Prop                   | Type                                            | Default value     | Required           |
| ---------------------- | ----------------------------------------------- | ----------------- | ------------------ |
| ratingValue            | number \| null \| undefined                     | undefined         | :white_check_mark: |
| onChange               | function \| undefined                           | undefined         | :white_check_mark: |
| limit                  | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 | 5                 | :x:                |
| highlightOnlySelected  | boolean                                         | false             | :x:                |
| enableKeyboard         | boolean                                         | true              | :x:                |
| orientation            | `horizontal` \| `vertical`                      | `horizontal`      | :x:                |
| itemStyles             | ItemStyle \| ItemStyle[]                        | [defaultStyles]() | :x:                |
| boxMargin              | number                                          | 10                | :x:                |
| boxPadding             | number                                          | 10                | :x:                |
| boxRadius              | number                                          | 0                 | :x:                |
| boxBorderWidth         | number                                          | 0                 | :x:                |
| breakpoints            | Breakpoints                                     | undefined         | :x:                |
| customAccessibleLabels | string[]                                        | undefined         | :x:                |
| labelledBy             | string                                          | undefined         | :x:                |

<br />

### Rating

| Prop                  | Type                                            | Description                                                                 | Default           | Required           |
| --------------------- | ----------------------------------------------- | --------------------------------------------------------------------------- | ----------------- | ------------------ |
| ratingValue           | number                                          | An integer from 0 to **limit**, can be a float as well.                     | undefined         | :white_check_mark: |
| limit                 | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 | Number of rating items to display                                           | 5                 | :x:                |
| orientation           | `horizontal` \| `vertical`                      | orientation of the rating items                                             | `horizontal`      | :x:                |
| halfPrecision         | boolean                                         | If true and `ratingValue` is a float the SVG or the box will be half-filled | false             | :x:                |
| halfPrecisionFillMode | `svg` \| `box`                                  | Wheter to half-fill the SVG or the box                                      | `svg`             | :x:                |
| itemStyles            | ItemStyle \| ItemStyle[]                        | Custom SVG and styles                                                       | [defaultStyles]() | :x:                |
| boxMargin             | number                                          | Side margin between boxes                                                   | 10                | :x:                |
| boxPadding            | number                                          | Box/item padding                                                            | 10                | :x:                |
| boxRadius             | number                                          | Box border radius                                                           | 0                 | :x:                |
| boxBorderWidth        | number                                          | Box border width                                                            | 0                 | :x:                |
| breakpoints           | Breakpoints                                     | Global styles breakpoints                                                   | undefined         | :x:                |
| accessibleLabel       | string                                          | Value of `aria-label`                                                       | `Rating`          | :x:                |

<br />

## Styling

### Rating Items

Just pass a `ItemStyle` object to `itemStyles` prop of any of both components.

<strong>Type definition</strong>
<br />

```ts
type ItemStyle = {
  svgChildNodes: JSX.Element | JSX.Element[] | null;
  itemStrokeWidth?: number;
  itemStrokeStyle?: 'round' | 'sharp';

  activeItemColor: string;
  activeItemStrokeColor?: string;
  activeBoxColor?: string;
  activeBoxBorderColor?: string;

  inactiveItemColor: string;
  inactiveItemStrokeColor?: string;
  inactiveBoxColor?: string;
  inactiveBoxBorderColor?: string;
};
```

<details><summary><strong>Default styles</strong></summary>
<br />

```jsx
const Star = <polygon points="100,10 40,198 190,78 10,78 160,198" />;

const itemStyle = {
  svgChildNodes: Star,
  itemStrokeWidth: undefined,
  itemStrokeStyle: 'round',

  activeItemColor: 'red',
  activeItemStrokeColor: undefined,
  activeBoxColor: 'blue',
  activeBoxBorderColor: undefined,

  inactiveItemColor: 'red',
  inactiveItemStrokeColor: undefined,
  inactiveBoxColor: 'blue',
  inactiveBoxBorderColor: undefined,
};
```

</details>

<details><summary><strong>How itemStrokeStyle works</strong></summary>
<br />

| Value   | Appearance                              |
| ------- | --------------------------------------- |
| `round` | ![](https://i.ibb.co/v3kyz5V/round.png) |
| `sharp` | ![](https://i.ibb.co/5cXng6v/sharp.png) |

</details>

<details><summary><strong>How itemStrokeWidth works</strong></summary>
<br />

The stroke width is expressed in _viewBox user coordinate's unit size_ and **not in pixels**.

Depending on the vector nodes provided you may have to input and try different values in order to reach the desidered stroke width.

</details>

<details><summary><strong>Color values</strong></summary>
<br />

Any valid CSS color string such as `aliceblue`, `#FFF332`, `rgba(0, 0, 0, 0)` or `hsl(69, 22, 200)` will be applied.

</details>

---

The object you pass **needs at least** the properties `svgChildNodes`, `activeItemColor` and `inactiveItemColor` set:

```jsx
const Star = <polygon points="100,10 40,198 190,78 10,78 160,198" />;

const itemStyle = {
  svgChildNodes: Star,
  activeItemColor: 'green',
  inactiveItemColor: 'gray',
};

const App = () => {
  const [value, setValue] = useState(3);

  return (
      <div style={{ maxWidth: 600 }}>
        <RatingInput
            itemStyles={itemStyle}
            ratingValue={value}
            onChange={(currentValue) => setValue(currentValue)}
        >
      </div>
  )
};
```

:warning: When using custom SVGs, create a new JSX component from the SVG **inner nodes** and **remove** any transform, fill, or stroke-related attributes from the source paths. Components will take care of rendering the full SVG element applying proper transforms (if necessary).

**HTML Source**

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g transform="translate(0 -0.073)">
    <circle
      id="Ellipse_1"
      data-name="Ellipse 1"
      cx="4"
      cy="4"
      r="4"
      transform="translate(8 3)"
      fill="red"
      stroke="2"
    />
    <path
      id="Path_6"
      data-name="Path 6"
      d="M11,13a6.006,6.006,0,0,0-6,6,1,1,0,0,0,1,1H18a1,1,0,0,0,1-1,6.006,6.006,0,0,0-6-6Z"
    />
  </g>
</svg>
```

**Destination**

```jsx
const SmilingFace = () => (
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

If you wish to style each single rating item, pass an **array** of [ItemStyle](#item-styles) instead:

```jsx
const Star = <polygon points="100,10 40,198 190,78 10,78 160,198" />;
const StarTwo = <polygon points="100,10 40,198 190,78 10,78 160,198" />;

const itemStyles = [
  {
    svgChildNodes: Star,
    activeItemColor: 'white',
    activeBoxColor: '#22C55E',
    inactiveItemColor: '#DCFCE7',
    inactiveBoxColor: '#D4D4D4',
  },
  {
    svgChildNodes: StarTwo,
    activeItemColor: 'blue',
    activeBoxColor: 'red',
    inactiveItemColor: 'indigo',
    inactiveBoxColor: '#D4D4D4',
  }
]; // <-- Array length must match the "limit" prop value!

const App = () => {
  const [value, setValue] = useState(null);

  return (
      <div style={{ maxWidth: 600 }}>
        <RatingInput
            limit={2} {/* <-- Value must match "itemStyles" array length! */}
            itemStyles={itemStyles}
            ratingValue={value}
            onChange={(currentValue) => setValue(currentValue)}
        >
      </div>
  )
};
```

<br />

### Global styles and breakpoints

Both components accept the props `boxMargin`, `boxPadding`, `boxBorderWidth` and `boxRadius`.

These styles are independent from `itemStyles` as they are not supposed to change for each rating item (for obvious design-consistency reasons).

Their value is always expressed with a **number** representing the pixel value of each property.

```ts
type GlobalStyles = {
  boxMargin?: number;
  boxPadding?: number;
  boxRadius?: number;
  boxBorderWidth?: number;
};
```

You can customize them for different breakpoints by setting the `breakpoints` prop:

<details><summary><strong>Type definition</strong></summary>
<br />

```ts
type Breakpoints = {
  [key: number]: GlobalStyles;
};
```

</details>

```jsx
const App = () => {
  const [value, setValue] = useState(3);

  return (
      <div style={{ maxWidth: 600 }}>
        <RatingInput
            ratingValue={value}
            onChange={(currentValue) => setValue(currentValue)}
            boxMargin={10}
            boxPadding={10}
            boxRadius={5}
            boxBorderWidth={2}
            breakpoints={{
              375: {
                boxMargin: 15,
                boxPadding: 15,
                boxRadius: 10,
                boxBorderWidth: 4,
              },
              910: {
                boxMargin: 20,
                boxPadding: 20,
                boxRadius: 20,
                boxBorderWidth: 2,
              },
            }}
        >
      </div>
  )
};
```

Each breakpoint will generate a CSS mobile-first media rule such as `@media (min-width: 375px)`.

<br />

## Accessibility

<br />

## Typescript

<br />

## Local development

The `main` branch contains the latest version of this package. RatingInput and Rating components are imported in a simple test React App which runs on a [Vite](https://vitejs.dev/) dev server.

In `dev/` you can find the test app files. It is just a blank React app with some CSS resets applied.

In `src/` you can find the package core files, the build entry point is `src/index.ts`.

Once cloned, just run:

```console
yarn
yarn dev
```

Vite's [Library Mode](https://vitejs.dev/guide/build.html#library-mode) is used to bundle the package. Just run:

```console
yarn build
```

<br />

## License

MIT Licensed. Copyright (c) Simone Mastromattei 2022.
