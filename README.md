![react-rating-version](https://img.shields.io/npm/v/@smastrom/react-rating?color=22C55E) ![react-rating-build-workflow](https://img.shields.io/github/workflow/status/smastrom/react-rating/Build/main?color=22C55E)
![react-rating-tests-workflow](https://img.shields.io/github/workflow/status/smastrom/react-rating/Tests/main?color=22C55E&label=tests) ![react-rating-coverage](https://img.shields.io/codecov/c/github/smastrom/react-rating?color=22C55E) ![react-rating-code-quality](https://img.shields.io/lgtm/grade/javascript/github/smastrom/react-rating?color=22C55E) ![react-rating-size](https://img.shields.io/bundlephobia/minzip/@smastrom/react-rating/1.0.0?color=22C55E)

# React Rating

Zero-dependency, highly customizable rating component for React.

First released: July 2nd, 2022

<br />

![react-rating](https://i.ibb.co/0X7djmF/examples.png)

[Demo and examples](https://react-rating.onrender.com/)

<br />

## Features

- **Use any SVG**: No headaches, icon fonts or packages to install in order to use your favorite shapes.
- Smart half-fill and advanced behavior customization
- Dead simple per-active-item styling
- Truly responsive and mobile-first
- Fully accessible with keyboard navigation and custom/default labels
- Simple and clean DOM structure
- Works both on the server and the client
- Lightweight with zero dependencies
- Fully typed with IntelliSense infos and autocomplete

<br/>

## Installation

```shell
yarn add @smastrom/react-rating
# npm install --save @smastrom/react-rating
```

<br />

## Basic usage

### 1. Import the CSS and the component

```jsx
import { Rating } from '@smastrom/react-rating';

import '@smastrom/react-rating/style.css';
```

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

**in any page/component:**

```tsx
import { Rating } from '@smastrom/react-rating';

export default function Index() {
  // ...
```

</details>

<details><summary><strong>Next</strong></summary>

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
import '@smastrom/react-rating/style.css';
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
import '@smastrom/react-rating/style.css';
```

**in any component:**

```jsx
import { Rating } from '@smastrom/react-rating';

const App = () => {
  // ...
```

</details>

<details><summary><strong>Create React App</strong></summary>

<br />

**index.js**

```jsx
import '@smastrom/react-rating/style.css';
```

**in any component:**

```jsx
import { Rating } from '@smastrom/react-rating';

const App = () => {
  // ...
```

</details>

<br />

### 2. Give it a max-width and init the state

Since **Rating** will span across the entire container, define a _maximum width_ via inline styles, css class or wrap it in a responsive container:

```jsx
const App = () => {
  const [ratingValue, setRatingValue] = useState(3); // <-- Init with 0 for no initial value

  return (
    <Rating
      style={{ maxWidth: 250 }}
      value={ratingValue}
      onChange={(selectedValue) => setRatingValue(selectedValue)}
    />
  );
};
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
import 'my-styles.css';

const App = () => {
  const [ratingValue, setRatingValue] = useState(3);

  return (
    <Rating
      className="my-rating-class"
      value={ratingValue}
      onChange={(selectedValue) => setRatingValue(selectedValue)}
    />
  );
};
```

</details>

<details><summary><strong>Responsive container</strong></summary>
<br />

```jsx
const App = () => {
  const [ratingValue, setRatingValue] = useState(3);

  return (
    <div style={{ maxWidth: 600, width: '100%' }}>
      <Rating
        value={ratingValue}
        onChange={(selectedValue) => setRatingValue(selectedValue)}
      />
    </div>
  );
};
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

| Prop               | Type                                            | Description                                                                      | Default   | Required                        | :thinking:          |
| ------------------ | ----------------------------------------------- | -------------------------------------------------------------------------------- | --------- | ------------------------------- | ------------------- |
| value              | number                                          | An integer from 0 to `items`. It can be a float if `readOnly` is **true**.       | undefined | :white_check_mark:              | :green_circle:      |
| onChange           | function                                        | Callback to set the rating value                                                 | undefined | Only if `readOnly` is **false** | :large_blue_circle: |
| onHoverChange      | function                                        | Callback to set the hovered value                                                | undefined | :x:                             | :large_blue_circle: |
| items              | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 | Number of rating items to display                                                | 5         | :x:                             | :green_circle:      |
| readOnly           | boolean                                         | Whether or not to render an accessible image element                             | false     | :x:                             | :green_circle:      |
| resetOnSecondClick | boolean                                         | Whether or not to reset the rating value if clicking again on the current rating | false     | :x:                             | :large_blue_circle: |

`ref`, `id`, `className` and `style` are also available.

<br />

### :nail_care: Appearance

| Prop                  | Type                                                    | Description                                               | Default       | Required | :thinking:          |
| --------------------- | ------------------------------------------------------- | --------------------------------------------------------- | ------------- | -------- | ------------------- |
| highlightOnlySelected | boolean                                                 | Whether or not to highlight only the selected rating item | false         | :x:      | :green_circle:      |
| halfFillMode          | `svg` \| `box`                                          | Whether to half-fill the SVG or the box                   | `svg`         | :x:      | :purple_circle:     |
| orientation           | `horizontal` \| `vertical`                              | Orientation of the rating items                           | `horizontal`  | :x:      | :green_circle:      |
| spaceInside           | `none` \| `small` \| `medium` \| `large`                | Responsive padding of each rating item                    | `small`       | :x:      | :green_circle:      |
| spaceBetween          | `none` \| `small` \| `medium` \| `large`                | Responsive gap between the rating items                   | `none`        | :x:      | :green_circle:      |
| radius                | `none` \| `small` \| `medium` \| `large` \| `full`      | Radius of each rating item                                | `none`        | :x:      | :green_circle:      |
| transition            | `none` \| `zoom` \| `colors` \| `opacity` \| `position` | Transition to apply when hovering/selecting               | `colors`      | :x:      | :large_blue_circle: |
| itemStyles            | ItemStyle                                               | Custom shapes and colors                                  | defaultStyles | :x:      | :green_circle:      |

Would you like to style it via CSS? Take a look [here](#styling-via-css).

<br />

### :open_umbrella: Accessibility

| Prop                | Type     | Description                                                                                           | Default                                                          | Required | :thinking:          |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------- | ------------------- |
| disableKeyboard     | boolean  | Whether or not to disable keyboard navigation                                                         | false                                                            | :x:      | :large_blue_circle: |
| isRequired          | boolean  | Whether or not to tell assistive technologies that rating is required                                 | true                                                             | :x:      | :large_blue_circle: |
| invisibleLabel      | string   | Accessible label of the rating group / image                                                          | `Rating` or `Rated <value> on <items>` if `readOnly` is **true** | :x:      | :green_circle:      |
| invisibleItemLabels | string[] | Accessible labels of each each rating item                                                            | `Rate 1`, `Rate 2`...                                            | :x:      | :large_blue_circle: |
| visibleLabelId      | string   | Id of the element used as rating group label. Takes precedence over `invisibleLabel`.                 | undefined                                                        | :x:      | :large_blue_circle: |
| visibleItemLabelIds | string[] | Ids of the elements used as labels for each rating item. Takes precedence over `invisibleItemLabels`. | undefined                                                        | :x:      | :large_blue_circle: |

<br />

## Styling

### Rating items

You can pass an object with the following properties to `itemStyles` prop:

```ts
type ItemStyles = {
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

Besides `itemShapes`, **all the properties are optional**. If a property isn't defined, no classes nor CSS variables will be added to the HTML.

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
    <Rating
      style={{ maxWidth: 300 }}
      value={ratingValue}
      onChange={(selectedValue) => setRatingValue(selectedValue)}
      itemStyles={customStyles}
    />
  );
};
```

You can also use the default star coming with this package and customize the colors:

```js
import { Star } from '@smastrom/react-rating';

const customStyles = {
  itemShapes: Star,
  activeFillColor: '#22C55E',
  inactiveFillColor: '#BBF7D0',
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

<details><summary><strong>TypeScript</strong></summary>
<br />

```tsx
import type { ItemStyles } from '@smastrom/react-rating';

const Star = (
  <polygon points="478.53 189 318.53 152.69 239.26 0 160 152.69 0 189 111.02 303.45 84 478.53 239.26 396.63 394.53 478.53 367.51 303.45 478.53 189" />
);

const customStyles: ItemStyles = {
  itemShapes: Star,
  activeFillColor: 'green',
  inactiveFillColor: 'gray',
};
```

<br />

</details>

<br />

### How to create itemShapes elements

All you have to do is to open the SVG with a text editor, grab the <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes">inner shapes</a> and delete any attribute from them (except for <a href="https://www.w3.org/TR/SVG/geometry.html">geometric</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform">transform</a> ones). Then create a new JSX Element that renders the shapes.

The component will take care of rendering a brand-new, responsive SVG for you.

If the SVG comes from quality sources (or you made it) such as [Feather](https://feathericons.com/), [SVG Repo](https://www.svgrepo.com/collections/monocolor/), [Bootstrap Icons](https://icons.getbootstrap.com)
or [css.gg](https://css.gg/) all you have to do is to delete a couple of fill and stroke attributes (if any):

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

```jsx
const CustomStar = (
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
);

const customStyles = {
  itemShapes: CustomStar,
  itemStrokeWidth: 2,
  activeFillColor: 'LightSeaGreen',
  activeStrokeColor: '#99F6E4',
  inactiveFillColor: '#99F6E4',
  inactiveStrokeColor: 'LightSeaGreen',
};

<Rating
  value={ratingValue}
  onChange={(selectedValue) => setRatingValue(selectedValue)}
  itemStyles={customStyles}
/>;
```

<br />

**Quick guide for complex or messy SVGs**

1. Keep only the <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g">groups</a> and the inner shapes of the svg: `g`, `path`, `circle`, `rect`, `polygon`, `ellipse`, `polyline` or `line` and delete any other node (e.g. `<defs>`).

2. If a group is present, check if it has the `transform` attribute set. If the attribute is not set, keep the inner shapes and delete the `g` node.

3. Delete any attribute **except** geometric, draw and <u><a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform">transform</a></u> ones from any group and shape.

4. If present, delete any empty node like `<circle></circle>` or `<g></g>`.

<br />

### Advanced styling

If you wish to style each rating item, you can optionally pass an array of JSX elements to `itemShapes` and an array of valid CSS colors to any **<u>active color</u>** property:

![react-rating](https://i.ibb.co/QXsDp8B/Schermata-2022-06-30-alle-01-30-51.png)

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
    <Rating
      style={{ maxWidth: 200 }}
      value={ratingValue}
      onChange={(selectedValue) => setRatingValue(selectedValue)}
      items={2}
      itemStyles={customStyles}
      highlightOnlySelected
    />
  );
};
```

![react-rating](https://s8.gifyu.com/images/in_AdobeExpress.gif)

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
    <Rating
      style={{ maxWidth: 500 }}
      value={ratingValue}
      onChange={(selectedValue) => setRatingValue(selectedValue)}
      itemStyles={customStyles}
      radius="large"
      spaceInside="large"
    />
  );
};
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

> :warning: The value will only be rounded "internally" for graphical purposes. The accessible label will always display the value you provided.

If necessary, the SVG will be half-filled by default (`halfFillMode = 'svg'`):

![react-rating](https://i.ibb.co/H29m0mQ/Schermata-2022-06-01-alle-23-41-53.png)

All the boxes will have the same background color (inactiveBoxColor) and `activeBoxColor` will have no effect.

You can switch between `svg` and `box`:

```jsx
<Rating readOnly value={2.38} halfFillMode="box" />
```

![react-rating](https://i.ibb.co/sKpybbV/Schermata-2022-06-01-alle-23-43-29.png)

In this case instead, all the SVGs will have the same fill color (inactiveFillColor) and `activeFillColor` will have no effect.

If you don't want the half-fill feature, simply pass an integer to `value`.

> :warning: If `highlightOnlySelected` is set to **true**, no half-fill will take place.

<br />

### Styling via CSS

It is not necessary, however if you want to, you can do it as shown below:

1. Assign a custom class to `<Rating />`:

```jsx
<Rating
  value={ratingValue}
  onChange={(selectedValue) => setRatingValue(selectedValue)}
  className="my-own-class"
/>
```

2. Disable any style you want to replace via props, so that no variables nor classes for that style will be generated/injected:

```jsx
<Rating
  value={ratingValue}
  onChange={(selectedValue) => setRatingValue(selectedValue)}
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

.my-own-class .rr--svg {
  border-radius: 10px;
  padding: 5px;
}

.my-own-class .rr--svg {
  transform: scale(1);
  transition: all 300ms cubic-bezier(0.87, 0, 0.13, 1);
  opacity: 0.5;
}

.my-own-class .rr--on:hover .rr--svg {
  transform: scale(1.5);
  opacity: 1;
}
```

<br />

## Accessibility

### Keyboard navigation

- **Tab** - Default behavior
- **Shift + Tab** - Default behavior
- **Left Arrow | Down Arrow** - Select the next rating item
- **Right Arrow | Up Arrow** - Select the previous rating item
- **Spacebar | Enter** - Set/unset the current selection

### Labels

Check the examples on the [demo website](https://react-rating.onrender.com/).

<br />

## Troubleshooting

### I can see the nodes returned from rendering, but no styles have been applied.

Check that you are importing the CSS as displayed in the [Basic usage](#basic-usage) section.

You can find clean, attribution-free SVG collections at [SVG Repo](https://www.svgrepo.com/collections/monocolor).

### I keep getting the error "itemShapes is not a valid JSX element".

Check that you are passing a JSX element and not a functional component:

:white_check_mark: **Correct**

```jsx
const Star = <path d="M100,10L40 198 190 78 10 78 160 198z" />;
```

:x: **Incorrect**

```jsx
const Star = () => <path d="M100,10L40 198 190 78 10 78 160 198z" />;
```

### I passed an array of shapes but the stroke width looks different for each item.

When passing different shapes for each rating item, this package forces you to use icons from the same collection to keep design consistency. Be sure you are doing that.

### While tapping a rating item on mobile, the browser always highlights it. I don't like it.

Since each rating item is basically a radio button, the browser treats it as a focusable element (such as an anchor or a button) if not `readOnly`. You can "disable" the highlight effect with this CSS:

```css
.rr--box {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
```

<br />

## Local development

The `main` branch contains the latest version of this package. Rating component is imported in a blank React App which runs on a [Vite](https://vitejs.dev/) dev server.

:warning: Vite requires Node.js version >= 12.2.

In `vite/` you can find the app files.

In `src/` you can find the package core files, the build entry point is `src/index.ts`.

Once cloned, just run:

```console
yarn
yarn dev
```

Vite's [Library Mode](https://vitejs.dev/guide/build.html#library-mode) is used to bundle the package. To build it just run:

```console
yarn build
```

:warning: In order to test with Playwright, Node.js version >= 14 is required.

<br />

## License

MIT Licensed. Copyright (c) Simone Mastromattei 2022.
