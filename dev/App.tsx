import React, { Profiler, ProfilerOnRenderCallback, useEffect, useRef, useState } from 'react';

import { Rating } from '../src/Rating';
import { StrangeFace } from './TestShapes';

import { ItemStylesProp } from '../src/exportedTypes';

import '../src/css/utils.css';
import '../src/css/core.css';
import '../src/css/colors.css';
import '../src/css/transitions.css';
import '../src/css/half-fill.css';

const testStylesArr: ItemStylesProp = {
  // svgChildNodes: [Heart, Heart, Heart, Heart, Heart],
  svgChildNodes: StrangeFace,

  itemStrokeWidth: 2,
  boxBorderWidth: 3,

  activeStrokeColor: ['#c41400', '#d05e00', '#cca300', '#498d00', '#00724c'],
  inactiveStrokeColor: 'white',

  activeBoxColor: ['#da1600', '#db711a', '#dcb000', '#61bb00', '#009664'],
  inactiveBoxColor: '#dddddd',

  activeBoxBorderColor: ['#c41400', '#d05e00', '#cca300', '#498d00', '#00724c'],
  inactiveBoxBorderColor: '#a8a8a8',
};

const displayRating = (value: any) => {
  switch (value) {
    case 1:
      return 'Poor';
    case 2:
      return 'Nothing Special';
    case 3:
      return 'Average';
    case 4:
      return 'Very Good';
    case 5:
      return 'Excellent';
    default:
      return 'None';
  }
};

const onRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  startTime,
  commitTime
) => {
  const performanceData = [
    `id: ${id}`,
    `phase: ${phase}`,
    `actualDuration: ${actualDuration}`,
    `startTime: ${startTime}`,
    `commitTime: ${commitTime}`,
  ].join(', ');
  console.log(performanceData);
};

const App = () => {
  const ratingInputRef = useRef(null);

  const [value, setValue] = useState<number>(3);
  const [hoveredValue, setHoveredValue] = useState<number>(0);

  // @ts-ignore
  const onClickOutside = (event) => {
    // @ts-ignore
    if (value > 0 && !ratingInputRef.current.contains(event.target)) {
      setValue(0);
    }
  };

  useEffect(() => {
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, []);

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
      <button onClick={() => setValue(0)}>Reset</button>
      <div
        style={{
          maxWidth: '430px',
          width: '100%',
        }}
      >
        <Profiler onRender={onRender} id="rating">
          <Rating
            readOnly
            ref={ratingInputRef}
            limit={5} // Rename to items
            aria-label="Ciao"
            onChange={(value) => setValue(value)}
            value={0.5}
            itemStyles={testStylesArr}
            transition="colors"
            // highlightOnlySelected
            orientation="horizontal"
            spaceBetween="small"
            spaceInside="small"
            radius="none"
            // enableKeyboard={false}
            accessibleLabels={['One', 'Two', 'Three', 'Four', 'Five']}
            halfFillMode="box"
            onHoverChange={(hoveredVal: number): void => setHoveredValue(hoveredVal)}
          />
        </Profiler>
      </div>

      <h3>Selected: {displayRating(value)}</h3>
      <h3>Hovered: {displayRating(hoveredValue)}</h3>
      <h3>Selected + Hovered: {displayRating(hoveredValue === 0 ? value : hoveredValue)}</h3>
      <button onClick={() => setValue(0)}>Reset</button>
    </div>
  );
};

export default App;
