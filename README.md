![react-rating-version](https://img.shields.io/npm/v/@smastrom/react-rating?color=22C55E) ![react-rating-build-workflow](https://img.shields.io/github/actions/workflow/status/smastrom/react-rating/build.yml?branch=main&color=22C55E)
![react-rating-tests-workflow](https://img.shields.io/github/actions/workflow/status/smastrom/react-rating/tests.yml?branch=main&color=22C55E&label=tests) ![react-rating-coverage](https://img.shields.io/codecov/c/github/smastrom/react-rating?color=22C55E) ![react-rating-dependencies](https://img.shields.io/badge/dependency%20count-0-22C55E)

# React Rating

Zero dependency, highly customizable rating component for React.

![react-rating](https://i.ibb.co/L6M0hfw/new.png)

[Demo and Examples](https://reactrating.netlify.app) — [NextJS Page Router](https://stackblitz.com/edit/nextjs-5qw9id?file=pages/index.tsx) — [Vite](https://stackblitz.com/edit/vitejs-vite-gwqytd?file=src/App.tsx)

<br />

## Features

- **Use any SVG**: No headaches, icon fonts or packages to install in order to use your favorite shapes.
- Endless possibilities of customization
- Most common rating shapes included
- Zero-config smart half-fill
- Dead simple per-active-item styling
- Built with accessibility in mind
- Truly responsive and mobile-first
- Controllable with React Hook Form
- Simple DOM structure
- Zero-config RTL support
- Works with SSR

<br/>

## Installation

```zsh
pnpm add @smastrom/react-rating
```

```zsh
yarn add @smastrom/react-rating
```

```zsh
npm i @smastrom/react-rating
```

<br />

## Usage

### 1. Import CSS and Rating component

```jsx
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
```

> Importing the CSS **only once** (most likely _main.js_ or _App.jsx_) is enough to use Rating in any other component of your App.

<details><summary><strong>Remix</strong></summary>
<br />

**app/root.tsx**

```tsx
import styles from '@smastrom/react-rating/style.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function App() {
  // ...
```

**in any page.tsx**

```tsx
import { Rating } from '@smastrom/react-rating';

export default function Index() {
  // ...
```

</details>

<details><summary><strong>NextJS 13 - App Router</strong></summary>

### Interactive rating

**app/layout.tsx**

```tsx
import '@smastrom/react-rating/style.css'
```

**components/Rating.tsx**

```tsx
'use client'

import { useState } from 'react'
import { Rating as ReactRating } from '@smastrom/react-rating'

export function Rating() {
  const [rating, setRating] = useState(0)

  return <ReactRating style={{ maxWidth: 100 }} value={rating} onChange={setRating} />
}
```

**in any page/component:**

```tsx
import { Rating } from './components/Rating'

export default function Home() {
  return (
    <div>
      {/* Other nodes... */}
      <Rating />
      {/* Other nodes... */}
    </div>
  )
}
```

### Non-interactive rating

**app/layout.tsx**

```tsx
import '@smastrom/react-rating/style.css'
```

**in any page/component:**

```tsx
import { Rating } from '@smastrom/react-rating'

export default function Home() {
  return (
    <div>
      {/* Other nodes... */}
      <Rating style={{ maxWidth: 100 }} value={3} readOnly />
      {/* Other nodes... */}
    </div>
  )
}
```

</details>

<details><summary><strong>NextJS - Pages Router</strong></summary>

<br />

**pages/\_app.js**

```jsx
import '@smastrom/react-rating/style.css';

function MyApp({ Component, pageProps }) {
  // ...
```

**in any page/component:**

```tsx
import { Rating } from '@smastrom/react-rating';

export default function Home() {
  // ...
```

</details>

<details><summary><strong>Gatsby</strong></summary>

<br />

**gatsby-browser.js** - Create the file at the root of your project if it doesn't exist, and relaunch the dev server.

```jsx
import '@smastrom/react-rating/style.css'
```

**in any page/component:**

```tsx
import { Rating } from '@smastrom/react-rating';

const IndexPage = () => {
  // ...
```

</details>

<details><summary><strong>Vite</strong></summary>

<br />

**main.jsx**

```jsx
import '@smastrom/react-rating/style.css'
```

**in any component:**

```jsx
import { Rating } from '@smastrom/react-rating';

function App() {
  // ...
```

</details>

<br />

### 2. Give it a max-width and init the state

Since **Rating** will span across the entire container, define a _maximum width_ via inline styles or css class:

```jsx
function App() {
  const [rating, setRating] = useState(0) // Initial value

  return <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />
}
```

<details><summary><strong>CSS Class</strong></summary>
<br />

**my-styles.css**

```css
.my-rating-class {
  max-width: 600px;
}
```

**App.jsx**

```jsx
import './my-styles.css'

function App() {
  const [rating, setRating] = useState(0)

  return <Rating className="my-rating-class" value={rating} onChange={setRating} />
}
```

</details>

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

| :thinking:          | Prop            | Description                                                                | Type                                            | Default   | Required                        |
| ------------------- | --------------- | -------------------------------------------------------------------------- | ----------------------------------------------- | --------- | ------------------------------- |
| :green_circle:      | `value`         | An integer from 0 to `items`. It can be a float if `readOnly` is **true**. | number                                          | undefined | :white_check_mark:              |
| :large_blue_circle: | `onChange`      | Setter or custom function to update the rating.                            | RatingChange                                    | () => {}  | Only if `readOnly` is **false** |
| :large_blue_circle: | `onHoverChange` | Callback to execute while navigating the rating items.                     | (hoveredValue: number) => void                  | () => {}  | :x:                             |
| :green_circle:      | `items`         | Rating items to display.                                                   | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 | 5         | :x:                             |
| :green_circle:      | `readOnly`      | Whether to render an accessible image element or not.                      | boolean                                         | false     | :x:                             |
| :large_blue_circle: | `isDisabled`    | Whether to disable the radio group or not.                                 | boolean                                         | false     | :x:                             |
| :large_blue_circle: | `isRequired`    | Whether users should be able to set rating to 0 or not.                    | boolean                                         | false     | :x:                             |

`ref`, `id`, `className`, `style`, `onBlur`, `onFocus` are also available.

<br />

### :nail_care: Appearance

| :thinking:          | Prop                    | Description                                                | Type                                                    | Default       | Required |
| ------------------- | ----------------------- | ---------------------------------------------------------- | ------------------------------------------------------- | ------------- | -------- |
| :green_circle:      | `highlightOnlySelected` | Whether to highlight only the selected rating item or not. | boolean                                                 | false         | :x:      |
| :purple_circle:     | `halfFillMode`          | Whether to half-fill the shape or the bounding box.        | `svg` \| `box`                                          | `svg`         | :x:      |
| :green_circle:      | `itemStyles`            | Custom shapes and colors.                                  | ItemStyles                                              | defaultStyles | :x:      |
| :green_circle:      | `spaceInside`           | Responsive padding of each rating item.                    | `none` \| `small` \| `medium` \| `large`                | `small`       | :x:      |
| :green_circle:      | `spaceBetween`          | Responsive gap between rating items.                       | `none` \| `small` \| `medium` \| `large`                | `none`        | :x:      |
| :green_circle:      | `radius`                | Responsive radius of the bounding box.                     | `none` \| `small` \| `medium` \| `large` \| `full`      | `none`        | :x:      |
| :green_circle:      | `orientation`           | Orientation of the rating items.                           | `horizontal` \| `vertical`                              | `horizontal`  | :x:      |
| :large_blue_circle: | `transition`            | Transition to apply when hovering/selecting.               | `none` \| `zoom` \| `colors` \| `opacity` \| `position` | `colors`      | :x:      |

<br />

### :open_umbrella: Accessibility

| :thinking:          | Prop                  | Description                                                                                                       | Type     | Default                                                                          | Required |
| ------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------- | -------- |
| :green_circle:      | `invisibleLabel`      | Accessible label of the rating group / image.                                                                     | string   | • `Rating Selection` (radioGroup) <br /> • `Rated {value} on {items}` (readOnly) | :x:      |
| :large_blue_circle: | `invisibleItemLabels` | Accessible labels of each rating item.                                                                            | string[] | `Rate 1`, `Rate 2`...                                                            | :x:      |
| :large_blue_circle: | `visibleLabelId`      | DOM ID of the element used as rating group label. If set, takes precedence over `invisibleLabel`.                 | string   | undefined                                                                        | :x:      |
| :large_blue_circle: | `visibleItemLabelIds` | DOM IDs of the elements used as labels for each rating item. If set, takes precedence over `invisibleItemLabels`. | string[] | undefined                                                                        | :x:      |
| :large_blue_circle: | `resetLabel`          | Accessible label of the reset radio button.                                                                       | string   | `Reset Rating`                                                                   | :x:      |

<br />

## onChange

<details><summary><strong>Type Definition</strong></summary>
<br />

```ts
type RatingChange =
  | React.Dispatch<React.SetStateAction<number>>
  | ((selectedValue: number) => void | Promise<void>)
```

</details>

### Basic

If your app doesn't require any custom logic/state to set the rating, you can simply pass the setter to `onChange`:

```js
function App() {
  const [rating, setRating] = useState(0)

  return <Rating value={rating} onChange={setRating} />
}
```

### Custom logic/state

If you need to perform actions while setting the rating (like calling an API) or you need to update a complex state, `onChange` accepts a callback whose only parameter equals to the selected rating:

```js
function App() {
  const [state, setState] = useState({
    review: '',
    rating: 0 // Initial value
  })

  function handleChange(selectedValue) {
    // 1. Logs the selected rating (1, 2, 3...)
    console.log(selectedValue)

    // 2. Do something with or without the value...

    // 3. Update Rating UI
    setState((prevState) => ({
      ...prevState,
      rating: selectedValue
    }))
  }

  return <Rating onChange={handleChange} value={state.rating} />
}
```

<br />

## Behavior

### 1. Rating with reset - _Default_

By default, the user is able to reset the rating (from 1-5 to 0 and vice versa):

| Interaction | Reset action                                  | Preview                                                             |
| ----------- | --------------------------------------------- | ------------------------------------------------------------------- |
| Mouse       | By clicking again on the selected rating item | ![react-rating](https://i.ibb.co/pLPP1wM/ezgif-com-gif-maker-2.gif) |
| Keyboard    | By navigating to an invisible reset radio     | ![react-rating](https://i.ibb.co/3YWM7Fx/ezgif-com-gif-maker-1.gif) |

> :bulb: Don't like the default focus style? Check [here](#troubleshooting) how to customize it.

### 2. Rating without reset

There could be scenarios where you want to force the user to express a rating _(e.g. review page, post-service rating)_.

In such cases, set `isRequired` to **true**:

```jsx
<Rating isRequired value={rating} onChange={setRating} />
```

![react-rating](https://i.ibb.co/BrtwWPX/ezgif-com-gif-maker-4.gif)

- It is not possible to reset by clicking again on the selected rating or by using the invisible radio.

- It is announced by screen readers that rating **is required**.

- If value equals to 0, it is announced by screen readers that rating **is invalid** .

> :bulb: Don't like the default focus style? Check [here](#troubleshooting) how to customize it.

<br/>

## Styling

### Using included shapes

This package ships with six of the most common (open source) rating shapes that you can import and use:

| Import Name       | Preview                                                                          | Collection / Author                                          |
| ----------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `Star`            | ![react-rating](https://i.ibb.co/0jS3F2P/Schermata-2022-09-29-alle-09-45-48.png) | [Feather](https://feathericons.com/)                         |
| `ThinStar`        | ![react-rating](https://i.ibb.co/9hzfsmJ/Schermata-2022-10-01-alle-00-25-39.png) | [Raphael](https://github.com/dmitrybaranovskiy/raphael)      |
| `RoundedStar`     | ![react-rating](https://i.ibb.co/V9P422w/Schermata-2022-09-30-alle-23-47-02.png) | [Phosphor](https://phosphoricons.com/)                       |
| `ThinRoundedStar` | ![react-rating](https://i.ibb.co/tP3fRfz/Schermata-2022-09-30-alle-23-59-46.png) | [SVG Repo](https://www.svgrepo.com/svg/99804/star-favourite) |
| `StickerStar`     | ![react-rating](https://i.ibb.co/C2sPq9X/Schermata-2022-10-01-alle-00-30-48.png) | [Raphael](https://www.svgrepo.com/svg/99804/star-favourite)  |
| `Heart`           | ![react-rating](https://i.ibb.co/7gvN66m/Schermata-2022-09-29-alle-10-26-24.png) | [Feather](https://feathericons.com/)                         |

```jsx
import { Rating, ThinStar } from '@smastrom/react-rating'

// Declare it outside your component so it doesn't get re-created
const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: '#ffb700',
  inactiveFillColor: '#fbf1a9'
}

function App() {
  const [rating, setRating] = useState(0)

  return (
    <Rating style={{ maxWidth: 300 }} value={rating} onChange={setRating} itemStyles={myStyles} />
  )
}
```

<details><summary><strong>Customizable properties</strong></summary>

<br/>

You can pass an object with the following properties to `itemStyles` prop:

```ts
type ItemStyles = {
  itemShapes: JSX.Element | JSX.Element[]

  itemStrokeWidth?: number
  boxBorderWidth?: number

  activeFillColor?: string | string[]
  activeStrokeColor?: string | string[]
  activeBoxColor?: string | string[]
  activeBoxBorderColor?: string | string[]

  inactiveFillColor?: string
  inactiveStrokeColor?: string
  inactiveBoxColor?: string
  inactiveBoxBorderColor?: string
}
```

Besides `itemShapes`, **all the properties are optional**. If a property isn't defined, no classes nor CSS variables will be added to the SVG.

Just set the ones you need and that's it:

```jsx
const CustomStar = (
  <polygon points="478.53 189 318.53 152.69 239.26 0 160 152.69 0 189 111.02 303.45 84 478.53 239.26 396.63 394.53 478.53 367.51 303.45 478.53 189" />
)

const myStyles = {
  itemShapes: CustomStar,
  activeFillColor: '#22C55E',
  inactiveFillColor: '#BBF7D0'
}

function App() {
  const [rating, setRating] = useState(4)

  return (
    <Rating style={{ maxWidth: 300 }} value={rating} onChange={setRating} itemStyles={myStyles} />
  )
}
```

</details>

<br />

### Using your own shapes

All you have to do is to open the SVG with a text editor, grab the <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes">inner shapes</a> and delete any attribute except for <a href="https://www.w3.org/TR/SVG/geometry.html">geometric</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform">transform</a> ones.

If the SVG comes from quality sources such as any collection you can find on [Icônes](https://icones.js.org/collection/all), all you have to do is to delete a couple of fill and stroke attributes (if any):

```html
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    stroke="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
  />
</svg>
```

Then define a JSX element to render the shapes. Rating will take care of rendering a brand-new, responsive SVG for you:

```jsx
const CustomStar = (
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
)

const myStyles = {
  itemShapes: CustomStar,
  itemStrokeWidth: 2,
  activeFillColor: 'LightSeaGreen',
  activeStrokeColor: '#99F6E4',
  inactiveFillColor: '#99F6E4',
  inactiveStrokeColor: 'LightSeaGreen'
}

function App() {
  const [rating, setRating] = useState(4)

  return (
    <Rating style={{ maxWidth: 300 }} value={rating} onChange={setRating} itemStyles={myStyles} />
  )
}
```

<br />

<details><summary><strong>Customizable properties</strong></summary>

<br/>

You can pass an object with the following properties to `itemStyles` prop:

```ts
type ItemStyles = {
  itemShapes: JSX.Element | JSX.Element[]

  itemStrokeWidth?: number
  boxBorderWidth?: number

  activeFillColor?: string | string[]
  activeStrokeColor?: string | string[]
  activeBoxColor?: string | string[]
  activeBoxBorderColor?: string | string[]

  inactiveFillColor?: string
  inactiveStrokeColor?: string
  inactiveBoxColor?: string
  inactiveBoxBorderColor?: string
}
```

Besides `itemShapes`, **all the properties are optional**. If a property isn't defined, no classes nor CSS variables will be added to the SVG.

Just set the ones you need and that's it:

```jsx
const CustomStar = (
  <polygon points="478.53 189 318.53 152.69 239.26 0 160 152.69 0 189 111.02 303.45 84 478.53 239.26 396.63 394.53 478.53 367.51 303.45 478.53 189" />
)

const myStyles = {
  itemShapes: CustomStar,
  activeFillColor: '#22C55E',
  inactiveFillColor: '#BBF7D0'
}

function App() {
  const [rating, setRating] = useState(4)

  return (
    <Rating style={{ maxWidth: 300 }} value={rating} onChange={setRating} itemStyles={myStyles} />
  )
}
```

</details>

<details><summary><strong>Default styles</strong></summary>
<br />

```js
import { Star } from '@smastrom/react-rating'

const defaultItemStyles = {
  itemShapes: Star,
  itemStrokeWidth: 2,
  activeFillColor: '#ffb23f',
  activeStrokeColor: '#e17b21',
  inactiveFillColor: '#fff7ed',
  inactiveStrokeColor: '#e17b21'
}
```

</details>

<details><summary><strong>How itemStrokeWidth works</strong></summary>
<br />

The stroke width is expressed in _viewBox user coordinate's unit size_ and **not in pixels**.

Depending on the vector nodes provided you may have to input and try different values in order to reach the desired stroke width.

It is responsive by nature, so expect it to increase/decrease when resizing the container.

</details>

<details><summary><strong>Color values</strong></summary>
<br />

You can pass any valid CSS color string such as `aliceblue`, `#FFF332`, `rgba(0, 0, 0, 0)` or `hsl(69, 22, 200)`.

</details>

<details><summary><strong>TypeScript</strong></summary>
<br />

```tsx
import type { ItemStyles } from '@smastrom/react-rating'

const Star = (
  <polygon points="478.53 189 318.53 152.69 239.26 0 160 152.69 0 189 111.02 303.45 84 478.53 239.26 396.63 394.53 478.53 367.51 303.45 478.53 189" />
)

const myStyles: ItemStyles = {
  itemShapes: Star,
  activeFillColor: 'green',
  inactiveFillColor: 'gray'
}
```

<br />

</details>

<details><summary><strong>Quick guide for complex or messy SVGs</strong></summary>

1. Keep only the <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g">groups</a> and the inner shapes of the svg: `g`, `path`, `circle`, `rect`, `polygon`, `ellipse`, `polyline` or `line` and delete any other node (e.g. `<defs>`).

2. If a group is present, check if it has the `transform` attribute set. If the attribute is not set, keep the inner shapes and delete the `g` node.

3. Delete any attribute **except** geometric, draw and <u><a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform">transform</a></u> ones from any group and shape.

4. If present, delete any empty node like `<circle></circle>` or `<g></g>`.

</details>

<br />

### Per-active-item styling

If you wish to style each rating item, you can optionally pass an array of JSX elements to `itemShapes` and an array of valid CSS colors to any **<u>active</u>** property:

![react-rating](https://i.ibb.co/QXsDp8B/Schermata-2022-06-30-alle-01-30-51.png)

```jsx
const SadFace = (
  <path d="M12.0000002,1.99896738 C17.523704,1.99896738 22.0015507,6.47681407 22.0015507,12.0005179 C22.0015507,17.5242217 17.523704,22.0020684 12.0000002,22.0020684 C6.47629639,22.0020684 1.99844971,17.5242217 1.99844971,12.0005179 C1.99844971,6.47681407 6.47629639,1.99896738 12.0000002,1.99896738 Z M12.0000002,3.49896738 C7.30472352,3.49896738 3.49844971,7.30524119 3.49844971,12.0005179 C3.49844971,16.6957946 7.30472352,20.5020684 12.0000002,20.5020684 C16.6952769,20.5020684 20.5015507,16.6957946 20.5015507,12.0005179 C20.5015507,7.30524119 16.6952769,3.49896738 12.0000002,3.49896738 Z M12.0000001,13.4979816 C13.6312483,13.4979816 15.1603686,14.1528953 16.2810488,15.2934358 C16.5713583,15.5888901 16.5671876,16.0637455 16.2717333,16.354055 C15.976279,16.6443646 15.5014236,16.6401939 15.211114,16.3447396 C14.3696444,15.4883577 13.2246935,14.9979816 12.0000001,14.9979816 C10.7726114,14.9979816 9.62535029,15.4905359 8.78347552,16.3502555 C8.49366985,16.6462041 8.01882223,16.6511839 7.72287367,16.3613782 C7.4269251,16.0715726 7.4219453,15.5967249 7.71175097,15.3007764 C8.83296242,14.155799 10.3651558,13.4979816 12.0000001,13.4979816 Z M9.00044779,8.75115873 C9.69041108,8.75115873 10.2497368,9.3104845 10.2497368,10.0004478 C10.2497368,10.6904111 9.69041108,11.2497368 9.00044779,11.2497368 C8.3104845,11.2497368 7.75115873,10.6904111 7.75115873,10.0004478 C7.75115873,9.3104845 8.3104845,8.75115873 9.00044779,8.75115873 Z M15.0004478,8.75115873 C15.6904111,8.75115873 16.2497368,9.3104845 16.2497368,10.0004478 C16.2497368,10.6904111 15.6904111,11.2497368 15.0004478,11.2497368 C14.3104845,11.2497368 13.7511587,10.6904111 13.7511587,10.0004478 C13.7511587,9.3104845 14.3104845,8.75115873 15.0004478,8.75115873 Z" />
)

const SmilingFace = (
  <path d="M12.0000002,1.99896738 C17.523704,1.99896738 22.0015507,6.47681407 22.0015507,12.0005179 C22.0015507,17.5242217 17.523704,22.0020684 12.0000002,22.0020684 C6.47629639,22.0020684 1.99844971,17.5242217 1.99844971,12.0005179 C1.99844971,6.47681407 6.47629639,1.99896738 12.0000002,1.99896738 Z M12.0000002,3.49896738 C7.30472352,3.49896738 3.49844971,7.30524119 3.49844971,12.0005179 C3.49844971,16.6957946 7.30472352,20.5020684 12.0000002,20.5020684 C16.6952769,20.5020684 20.5015507,16.6957946 20.5015507,12.0005179 C20.5015507,7.30524119 16.6952769,3.49896738 12.0000002,3.49896738 Z M8.46174078,14.7838355 C9.31087697,15.8615555 10.6018926,16.5020843 11.9999849,16.5020843 C13.396209,16.5020843 14.6856803,15.8632816 15.5349376,14.7880078 C15.7916692,14.4629512 16.2633016,14.4075628 16.5883582,14.6642944 C16.9134148,14.9210259 16.9688032,15.3926584 16.7120717,15.717715 C15.5813083,17.1494133 13.8601276,18.0020843 11.9999849,18.0020843 C10.1373487,18.0020843 8.41411759,17.1471146 7.28351576,15.7121597 C7.02716611,15.3868018 7.08310832,14.9152347 7.40846617,14.6588851 C7.73382403,14.4025354 8.20539113,14.4584777 8.46174078,14.7838355 Z M9.00044779,8.75115873 C9.69041108,8.75115873 10.2497368,9.3104845 10.2497368,10.0004478 C10.2497368,10.6904111 9.69041108,11.2497368 9.00044779,11.2497368 C8.3104845,11.2497368 7.75115873,10.6904111 7.75115873,10.0004478 C7.75115873,9.3104845 8.3104845,8.75115873 9.00044779,8.75115873 Z M15.0004478,8.75115873 C15.6904111,8.75115873 16.2497368,9.3104845 16.2497368,10.0004478 C16.2497368,10.6904111 15.6904111,11.2497368 15.0004478,11.2497368 C14.3104845,11.2497368 13.7511587,10.6904111 13.7511587,10.0004478 C13.7511587,9.3104845 14.3104845,8.75115873 15.0004478,8.75115873 Z" />
)

const myStyles = {
  itemShapes: [SadFace, SmilingFace],
  activeFillColor: ['#da1600', '#61bb00'],
  inactiveFillColor: '#a8a8a8'
}

function App() {
  const [rating, setRating] = useState(0)

  return (
    <Rating
      style={{ maxWidth: 200 }}
      value={rating}
      onChange={setRating}
      items={2}
      itemStyles={myStyles}
      highlightOnlySelected
    />
  )
}
```

![react-rating](https://s8.gifyu.com/images/in_AdobeExpress.gif)

```jsx
const Star = (
  <path d="M62 25.154H39.082L32 3l-7.082 22.154H2l18.541 13.693L13.459 61L32 47.309L50.541 61l-7.082-22.152L62 25.154z" />
)

const myStyles = {
  itemShapes: Star,
  boxBorderWidth: 3,

  activeFillColor: ['#FEE2E2', '#FFEDD5', '#FEF9C3', '#ECFCCB', '#D1FAE5'],
  activeBoxColor: ['#da1600', '#db711a', '#dcb000', '#61bb00', '#009664'],
  activeBoxBorderColor: ['#c41400', '#d05e00', '#cca300', '#498d00', '#00724c'],

  inactiveFillColor: 'white',
  inactiveBoxColor: '#dddddd',
  inactiveBoxBorderColor: '#a8a8a8'
}

function App() {
  const [rating, setRating] = useState(0)

  return (
    <Rating
      style={{ maxWidth: 500 }}
      value={rating}
      onChange={setRating}
      itemStyles={myStyles}
      radius="large"
      spaceInside="large"
    />
  )
}
```

<br />

### Half-fill and float values

If `readOnly` is set to **true**, the `value` prop accepts a float:

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

> :warning: The value will only be rounded "internally" for graphical purposes. The accessible label will always display the value provided.

If necessary, the SVG will be half-filled by default (`halfFillMode = 'svg'`):

![react-rating](https://i.ibb.co/V2kJ317/Screenshot-2022-11-13-alle-12-07-51.png)

All the boxes will have the same background color (inactiveBoxColor) and `activeBoxColor` will have no effect.

You can switch between `svg` and `box`:

```jsx
<Rating readOnly value={2.38} halfFillMode="box" />
```

![react-rating](https://i.ibb.co/sKpybbV/Schermata-2022-06-01-alle-23-43-29.png)

In this case instead, all the shapes will have the same fill color (inactiveFillColor) and `activeFillColor` will have no effect.

If you don't want the half-fill feature, simply pass an integer to `value`.

> :warning: If `highlightOnlySelected` is set to **true**, no half-fill will take place.

<br />

## Accessibility

### Mouse/keyboard callbacks

React Rating leverages `aria radiogroup` role instead of native HTML radio buttons in order to improve keyboard-users experience and extend capabilities (e.g. API calls) by keeping callbacks consistent between keyboard and mouse.

In **React Rating**:

- Rating must be confirmed with `Enter/Space` keys and cannot be set directly with arrows like native radios.

- `onChange` is called on both `Enter/Space` keys and click.

- `onHoverChange` is called on `← → ↑ ↓` navigation, mouse hovering, focus-from / blur-to a _non-react-rating_ element.

### Disabled state

It is always announced by screen readers instead of being completely hidden.

### Labels

React Rating ships with default accessible labels computed from your `items` value. In order to customize them or to switch to visible ones check the multiple examples on the [demo website](https://reactrating.netlify.app).

<br />

## Troubleshooting

### I can see the nodes returned from rendering, but no styles have been applied.

Check that you are importing the CSS as displayed in the [Basic usage](#basic-usage) section.

### I keep getting the error: "itemShapes is not a valid JSX element".

Check that you are passing a JSX element and not a functional component:

:white_check_mark: **Correct**

```jsx
const Star = <path d="M100,10L40 198 190 78 10 78 160 198z" />
```

:x: **Incorrect**

```jsx
const Star = () => <path d="M100,10L40 198 190 78 10 78 160 198z" />
```

### I passed an array of shapes but the stroke width looks different for each item.

When passing different shapes for each rating item, this package forces you to use icons from the same collection to keep design consistency. Be sure you are doing that.

You can find clean, SVG collections at [Icônes](https://icones.js.org/collection/all).

### I don't like the default focus ring styles. How can I style them?

It is possible to style them via CSS by targeting the following selectors:

**Rating items**

```css
.rr--box:focus-visible .rr--svg {
  /* Your styles */
}
```

**Reset**

```css
.rr--focus-reset {
  /* Your styles */
}
```

<details><summary><strong>Defaults</strong></summary>

```css
.rr--focus-reset {
  outline: 6px double #0079ff;
}

.rr--box:focus-visible .rr--svg {
  outline: 6px double #0079ff;
}
```

</details>

<br />

## License

MIT
