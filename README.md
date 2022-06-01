# React Advanced Rating

Zero-dependency highly customizable rating component for React.

[Live demo and examples](https://smastromattei.dev)

<br />

## Features

- **Use any SVG**: No headaches or icon fonts in order to use vectors from any source.
- Highly customizable: fills, strokes, box colors and borders, transitions, breakpoints and much more.
- Fully responsive and mobile-first
- Fully accessible with keyboard navigation and custom labels
- Fully typed with IntelliSense infos and autocomplete
- Dependency-free, ~3Kb gzipped.

<br />

## Installation

Node:

```console
yarn add react-rating-input
```

In the browser:

```html
<script type="module"></script>
```

<br />

## Basic usage

As an accessible [radio-group](https://dequeuniversity.com/library/aria/radio-and-radio-group):

```jsx
import React, { useState } from "react";
import { Rating } from 'react-advanced-rating';
import 'react-advanced-rating/dist/index.min.css'; // <-- Import CSS

const App = () => {
  const [value, setValue] = useState(3); // <-- Initial value, init with 0 for no value

  return (
      <div style={{ maxWidth: 600 }}> {/* <-- Wrap it in a container */}
        <Rating
            ratingValue={value}
            onChange={(currentValue) => setValue(currentValue)}
        >
      </div>
  )
};
```

or as an accessible [image element](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role):

```jsx
import React from 'react';
import { Rating } from 'react-advanced-rating';
import 'react-advanced-rating/dist/index.min.css';

const App = () => (
  <div style={{ maxWidth: 600 }}>
    <Rating readOnly ratingValue={3.78} />
  </div>
);
```

<br />

## API

**Legend**

| Color               | Description                                |
| ------------------- | ------------------------------------------ |
| :green_circle:      | Has always effect                          |
| :large_blue_circle: | Has effect only if `readOnly` is **false** |
| :purple_circle:     | Has effect only if `readOnly` is **true**  |

<br />

| Prop                  | Type                                                    | Description                                                                                          | Default                        | Required                        | :thinking:          |
| --------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------- | ------------------- |
| ratingValue           | number                                                  | An integer from 0 to **limit**, can be a float if `readOnly` is **true**.                            | undefined                      | Yes                             | :green_circle:      |
| onChange              | function                                                | Callback to update `ratingValue`                                                                     | undefined                      | Only if `readOnly` is **false** | :large_blue_circle: |
| onHoverChange         | function                                                | Callback to update the hovered ratingValue                                                           | undefined                      | No                              | :large_blue_circle: |
| readOnly              | boolean                                                 | Wheter or not the component should be an accessible image element                                    | false                          | No                              | :green_circle:      |
| limit                 | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10         | Maximum number of rating items to display                                                            | 5                              | No                              | :green_circle:      |
| highlightOnlySelected | boolean                                                 | Wheter or not to highlight only the selected rating item. Has no effect if `ratingValue` is a float. | false                          | No                              | :green_circle:      |
| orientation           | `horizontal` \| `vertical`                              | Orientation of the rating items                                                                      | `horizontal`                   | No                              | :green_circle:      |
| transition            | `none` \| `zoom` \| `colors` \| `opacity` \| `position` | Transition to apply when hovering/selecting                                                          | `zoom`                         | No                              | :large_blue_circle: |
| customEasing          | string                                                  | Custom easing to apply to transitions as `<timing> <easing>`                                         | `150ms ease-out`               | No                              | :large_blue_circle: |
| halfPrecisionFillMode | `svg` \| `box`                                          | Wheter to half-fill the SVG or the box if `ratingValue` is a float                                   | `svg`                          | No                              | :purple_circle:     |
| itemStyles            | ItemStyle \| ItemStyle[]                                | Custom SVGs and styles                                                                               | [defaultStyles]()              | No                              | :green_circle:      |
| boxMargin             | number                                                  | Margin between boxes                                                                                 | 5                              | No                              | :green_circle:      |
| boxPadding            | number                                                  | Box padding                                                                                          | 5                              | No                              | :green_circle:      |
| boxRadius             | number                                                  | Box border radius                                                                                    | 0                              | No                              | :green_circle:      |
| boxBorderWidth        | number                                                  | Box border width                                                                                     | 0                              | No                              | :green_circle:      |
| breakpoints           | Breakpoints                                             | Global styles breakpoints                                                                            | undefined                      | No                              | :green_circle:      |
| enableKeyboard        | boolean                                                 | Wheter or not to enable keyboard navigation                                                          | true                           | No                              | :large_blue_circle: |
| accessibleLabels      | string[]                                                | Accessible labels for each rating item                                                               | Array of `Rate ${ratingValue}` | No                              | :large_blue_circle: |
| accessibleLabel       | string                                                  | Value of `aria-label` attribute                                                                      | `Rating`                       | No                              | :purple_circle:     |

<br />

## Styling

### Rating Items

Just pass a `ItemStyle` object to `itemStyles` prop of any of both components.

<strong>Type definition</strong>
<br />

```ts
type ItemStyle = {
  svgChildNodes: JSX.Element;
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
  activeItemColor: 'red',
  activeBoxColor: 'blue',
  inactiveItemColor: 'red',
  inactiveBoxColor: 'blue',
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

Vite's [Library Mode](https://vitejs.dev/guide/build.html#library-mode) is used to bundle the package. To build the package just run:

```console
yarn build
```

<br />

## License

MIT Licensed. Copyright (c) Simone Mastromattei 2022.
