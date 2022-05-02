# React Rating Input

Rating component for React focused on accessibility, mobile-first and customization.

[Live demo and examples](https://smastromattei.dev)

<br />

## Features

- Bring you own SVGs: No headaches or icon fonts in order to use your own vectors.
- Built-in SVG scaling, positioning and stroke control.
- Highly customizable: colors, strokes, boxes, hover, transitions, breakpoints and much more.
- Fully responsive and mobile-first
- Fully accessible with keyboard navigation and custom labels
- Dependency-free

<br />

## Installation

With NPM:

```console
npm i -S react-rating-input
```

Or Yarn:

```console
yarn add react-rating-input
```

<br />

## Basic configuration example

This is the most basic configuration including only the mandatory props:

```jsx
import { RatingInput } from 'react-rating-input';
import 'react-rating-input/dist/index.min.css';

const values = [1, 2, 3, 4, 5];

const App = () => {
  const [value, setValue] = useState(values[0]); // <-- Initial value

  return (
      <div style={{ maxWidth: 600 }}> {/* <-- Wrap it in a container */}
        <RatingInput
            ratingValues={values}
            ratingValue={value}
            onChange={(currentValue) => setValue(currentValue)}
        >
      </div>
  )
};
```

<br />

## Props

<br />

## Full configuration example

<br />

## Important notes

### SVGs

When importing your own SVG, include only the **inner nodes** of the `<svg>`:

**Source**

```html
<svg
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  width="46.47px"
  height="46.47px"
  viewBox="0 0 46.47 46.47"
  style="enable-background:new 0 0 46.47 46.47;"
  xml:space="preserve"
>
  <path
    fill="red"
    transform="translate(0.24, 2.80)"
    d="M3.445,6.322c0-3.423,2.777-6.201,6.201-6.201c3.423,0,6.2,2.777,6.2,6.201c0,3.426-2.777,6.203-6.2,6.203
		C6.222,12.524,3.445,9.748,3.445,6.322z M31.562,6.322c0-3.423,2.78-6.201,6.203-6.201s6.201,2.777,6.201,6.201
		c0,3.426-2.777,6.203-6.201,6.203C34.343,12.524,31.562,9.748,31.562,6.322z M46.223,31.72
		C42.38,40.607,33.38,46.349,23.294,46.349c-10.301,0-19.354-5.771-23.064-14.703c-0.636-1.53,0.089-3.286,1.62-3.922
		c0.376-0.155,0.766-0.229,1.15-0.229c1.176,0,2.292,0.696,2.771,1.851c2.777,6.685,9.655,11.004,17.523,11.004
		c7.69,0,14.528-4.322,17.421-11.012c0.658-1.521,2.424-2.222,3.943-1.562C46.181,28.433,46.881,30.199,46.223,31.72z"
  />
</svg>
```

**Destionation**

```jsx
const SmilingFace = (
  <path
    d="M3.445,6.322c0-3.423,2.777-6.201,6.201-6.201c3.423,0,6.2,2.777,6.2,6.201c0,3.426-2.777,6.203-6.2,6.203
        C6.222,12.524,3.445,9.748,3.445,6.322z M31.562,6.322c0-3.423,2.78-6.201,6.203-6.201s6.201,2.777,6.201,6.201
        c0,3.426-2.777,6.203-6.201,6.203C34.343,12.524,31.562,9.748,31.562,6.322z M46.223,31.72
        C42.38,40.607,33.38,46.349,23.294,46.349c-10.301,0-19.354-5.771-23.064-14.703c-0.636-1.53,0.089-3.286,1.62-3.922
        c0.376-0.155,0.766-0.229,1.15-0.229c1.176,0,2.292,0.696,2.771,1.851c2.777,6.685,9.655,11.004,17.523,11.004
        c7.69,0,14.528-4.322,17.421-11.012c0.658-1.521,2.424-2.222,3.943-1.562C46.181,28.433,46.881,30.199,46.223,31.72z"
  />
);
```

Delete any `transform`, `fill`, `stroke`, `strokeWidth` etc from the nodes as `RatingInput` will take care of applying transforms and let you control stroke and fills.

You can find free clean SVGs at [SVG Repo](https://www.svgrepo.com/).

### Rating Values

The component lets you control the rating values and the state, while taking care of updating it, however all the values of the provided array must be **unique**.

:white_check_mark: **Works**

```jsx
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

```jsx
const values = ['Like', 'Dislike'];
```

:x: **Doesn't work**

```jsx
const values = [1, 1, 1, 4, 5, 6, 6, 8, 9, 10];
```

```jsx
const values = ['Like', 'Like'];
```

<br />

## Local development

The `main` branch contains the latest version of `RatingInput`.

Once cloned, just run:

```console
yarn install
yarn vite
```
