import React, { useState } from 'react';

import { Rating } from '../src/Rating';
import { StrangeFace } from './Shapes';

import { ItemStylesProp } from '../src/exportedTypes';
import { Profiler } from './Profiler';

const testStylesArr: ItemStylesProp = {
  itemShapes: StrangeFace,

  itemStrokeWidth: 2,
  boxBorderWidth: 3,

  activeStrokeColor: ['#c41400', '#d05e00', '#cca300', '#498d00', '#00724c'],
  inactiveStrokeColor: 'white',

  activeBoxColor: ['#da1600', '#db711a', '#dcb000', '#61bb00', '#009664'],
  inactiveBoxColor: '#dddddd',

  activeBoxBorderColor: ['#c41400', '#d05e00', '#cca300', '#498d00', '#00724c'],
  inactiveBoxBorderColor: '#a8a8a8',
};

const App = () => {
  const [value, setValue] = useState<number>(3);

  return (
    <div
      style={{
        width: '100%',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        flexDirection: 'column',
      }}
    >
      <button id="first_button" type="button" onClick={() => {}}>
        First Button
      </button>
      <div
        style={{
          maxWidth: '430px',
          width: '100%',
        }}
      >
        <Profiler>
          <Rating
            id="rating"
            resetOnSecondClick
            items={5} // Rename to items
            aria-label="Ciao"
            onChange={(value) => setValue(value)}
            value={value}
            itemStyles={testStylesArr}
            transition="colors"
            // highlightOnlySelected
            orientation="horizontal"
            spaceBetween="small"
            spaceInside="small"
            radius="none"
            isRequired={false}
            accessibleLabels={['One', 'Two', 'Three', 'Four', 'Five']}
            halfFillMode="box"
          />
        </Profiler>
      </div>
      <button id="second_button" type="button" onClick={() => {}}>
        Second Button
      </button>
    </div>
  );
};

export default App;
