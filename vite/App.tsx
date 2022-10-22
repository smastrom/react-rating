import { useCallback, useState } from 'react';
import { Profiler } from './Profiler';
import { Rating } from '../src/Rating';
import { ItemStyles } from '../src/exportedTypes';
import { StickerStar } from '../src';

const customStyles: ItemStyles = {
	itemShapes: StickerStar,
	activeFillColor: ['#FEE2E2', '#FFEDD5', '#FEF9C3', '#ECFCCB', '#D1FAE5'],
	activeBoxColor: ['#da1600', '#db711a', '#dcb000', '#61bb00', '#009664'],
	activeBoxBorderColor: ['#c41400', '#d05e00', '#cca300', '#498d00', '#00724c'],
	inactiveFillColor: 'white',
	inactiveBoxColor: '#dddddd',
	inactiveBoxBorderColor: '#a8a8a8',
};

const CUSTOM_GROUP_LABEL = 'Rate - GitHub Plaza Hotel';
const CUSTOM_GROUP_LABEL_ID = 'group_label';

/* const CUSTOM_LABELS = ['Bad', 'Poor', 'Average', 'Very Good', 'Excellent'];
const CUSTOM_LABELS_IDS = ['label_1', 'label_2', 'label_3', 'label_4', 'label_5']; */

export function App() {
	const [rating, setRating] = useState(3);
	const [state, setState] = useState({
		name: '',
		review: '',
		rating: 1,
	});

	const handleHover = useCallback((hoveredValue: number) => {
		console.log(hoveredValue);
	}, []);

	function handleChange(ratingValue: number) {
		setState((prevState) => ({
			...prevState,
			rating: ratingValue,
		}));
	}

	return (
		<div
			// dir="rtl"
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
			<h2 id={CUSTOM_GROUP_LABEL_ID}>Rating Label</h2>

			<Profiler>
				<Rating
					style={{
						maxWidth: 160,
					}}
					// readOnly
					// onHoverChange={handleHover}
					// isDisabled
					// isRequired
					onChange={setRating}
					value={rating}
					// itemStyles={customStyles}
					// highlightOnlySelected
					// orientation="horizontal"
					// radius="small"
				/>
			</Profiler>
			<button
				id="second_button"
				type="button"
				onClick={() => setState((prevState) => ({ ...prevState, rating: 0 }))}
			>
				Second Button
			</button>
		</div>
	);
}
