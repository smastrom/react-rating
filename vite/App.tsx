import React, { useState } from 'react';
import { Profiler } from './Profiler';

import { Rating } from '../src/Rating';
import { SimpleStar } from './Shapes';

import { ItemStyles } from '../src/exportedTypes';

const customStyles: ItemStyles = {
	itemShapes: SimpleStar,
	boxBorderWidth: 2,

	activeFillColor: ['#FEE2E2', '#FFEDD5', '#FEF9C3', '#ECFCCB', '#D1FAE5'],
	activeBoxColor: ['#da1600', '#db711a', '#dcb000', '#61bb00', '#009664'],
	activeBoxBorderColor: ['#c41400', '#d05e00', '#cca300', '#498d00', '#00724c'],

	inactiveFillColor: 'white',
	inactiveBoxColor: '#dddddd',
	inactiveBoxBorderColor: '#a8a8a8',
};

const CUSTOM_GROUP_LABEL = 'Rate - GitHub Plaza Hotel';
const CUSTOM_GROUP_LABEL_ID = 'group_label';

const CUSTOM_LABELS = ['Bad', 'Poor', 'Average', 'Very Good', 'Excellent'];
const CUSTOM_LABELS_IDS = ['label_1', 'label_2', 'label_3', 'label_4', 'label_5'];

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
			<button id="first_button" type="button" onClick={() => null}>
				First Button
			</button>
			<div>
				<h2 id="rating_label">Rating Label</h2>
				<Profiler>
					<Rating
						style={{
							maxWidth: 300,
						}}
						// readOnly
						resetOnSecondClick
						items={5}
						aria-label="Ciao"
						onChange={(value) => setValue(value)}
						value={value}
						itemStyles={customStyles}
						transition="zoom"
						// highlightOnlySelected
						orientation="horizontal"
						spaceBetween="small"
						spaceInside="large"
						radius="small"
						isRequired={false}
						visibleLabelId={CUSTOM_GROUP_LABEL_ID}
						visibleItemLabelIds={CUSTOM_LABELS_IDS}
						invisibleLabel={CUSTOM_GROUP_LABEL}
						invisibleItemLabels={CUSTOM_LABELS}
					/>
				</Profiler>
			</div>
			<button id="second_button" type="button" onClick={() => null}>
				Second Button
			</button>
		</div>
	);
};

export default App;
