import { useState } from 'react';
import { Profiler } from './Profiler';
import { Rating } from '../src/Rating';

const CUSTOM_GROUP_LABEL_ID = 'group_label';

type Props = { isRequired?: boolean; initialRating?: number };

export function App({ isRequired = false, initialRating = 0 }: Props) {
	const [rating, setRating] = useState(initialRating);

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
					isRequired={isRequired}
					onChange={setRating}
					value={rating}
					// highlightOnlySelected
					// orientation="horizontal"
					// radius="small"
				/>
			</Profiler>
			<button id="second_button" type="button" onClick={() => null}>
				Second Button
			</button>
		</div>
	);
}
