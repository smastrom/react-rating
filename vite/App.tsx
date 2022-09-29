import React, { useState } from 'react';
import { Profiler } from './Profiler';

import { Rating } from '../src/Rating';

import { ItemStyles } from '../src/exportedTypes';
import { ThinStar } from '../src';

const customStyles: ItemStyles = {
	itemShapes: ThinStar,
	activeFillColor: '#ff4136',
	inactiveFillColor: '#cdecff',
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
			<Profiler>
				<Rating
					style={{
						maxWidth: 150,
					}}
					// readOnly
					resetOnSecondClick
					isDisabled
					items={5}
					aria-label="Ciao"
					onChange={(value) => setValue(value)}
					value={value}
					itemStyles={customStyles}
					transition="zoom"
					// highlightOnlySelected
					orientation="horizontal"
					spaceBetween="none"
					spaceInside="small"
					radius="small"
					isRequired={false}
					visibleLabelId={CUSTOM_GROUP_LABEL_ID}
					visibleItemLabelIds={CUSTOM_LABELS_IDS}
					invisibleLabel={CUSTOM_GROUP_LABEL}
					invisibleItemLabels={CUSTOM_LABELS}
				/>
			</Profiler>
		</div>
	);
};

export default App;
