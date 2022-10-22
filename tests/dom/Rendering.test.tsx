import React from 'react';
import {
	render,
	screen,
	GROUP_ID,
	CHILD_ID_1,
	CHILD_ID_2,
	CHILD_ID_3,
	SVGCHILD_ID_1,
	SVGCHILD_ID_2,
	SVGCHILD_ID_3,
} from './testUtils';
import { Rating } from '../../src/Rating';
import { Star } from '../../src/Shapes';

describe('Component rendering', () => {
	test('Should be in the document if value equals to zero', () => {
		const { rerender } = render(<Rating value={0} onChange={() => null} />);
		const group = screen.getByTestId(GROUP_ID);
		expect(group).toBeInTheDocument();

		rerender(<Rating value={0} readOnly />);
		expect(group).toBeInTheDocument();
	});

	test('Should not render the component if value is not a number', () => {
		// @ts-ignore - TEST
		const { rerender } = render(<Rating value="6" />);
		const group = screen.queryByTestId(GROUP_ID);
		expect(group).not.toBeInTheDocument();
		// @ts-ignore - TEST
		rerender(<Rating readOnly value="6" />);
		expect(group).not.toBeInTheDocument();
	});

	test('Should not render the component if items greater than 10', () => {
		// @ts-ignore - TEST
		render(<Rating value={6} items={11} />);
		const group = screen.queryByTestId(GROUP_ID);
		expect(group).not.toBeInTheDocument();
	});

	test('Should not render the component if value greater than items (default: 5)', () => {
		const { rerender } = render(<Rating value={6} />);
		const group = screen.queryByTestId(GROUP_ID);
		expect(group).not.toBeInTheDocument();

		rerender(<Rating value={6} readOnly />);
		expect(group).not.toBeInTheDocument();
	});

	test('Should not render the component if itemShapes is not a valid JSX element', () => {
		const StarComponent = () => Star;

		const { rerender } = render(
			<Rating
				readOnly
				value={1.5}
				// @ts-ignore - TEST
				itemStyles={{ itemShapes: StarComponent }}
				items={3}
				onChange={() => null}
			/>
		);

		const group = screen.queryByTestId(GROUP_ID);
		expect(group).not.toBeInTheDocument();

		rerender(
			<Rating
				readOnly
				value={1.5}
				// @ts-ignore - TEST
				itemStyles={{ itemShapes: [StarComponent, StarComponent, StarComponent] }}
				items={3}
				onChange={() => null}
			/>
		);

		expect(group).not.toBeInTheDocument();
	});

	test('Should not render the component if itemShapes length not equal to items', () => {
		const { rerender } = render(
			<Rating
				readOnly
				value={1.5}
				itemStyles={{ itemShapes: [Star, Star] }}
				items={3}
				onChange={() => null}
			/>
		);

		const group = screen.queryByTestId(GROUP_ID);
		expect(group).not.toBeInTheDocument();

		rerender(
			<Rating
				readOnly
				value={1.5}
				itemStyles={{ itemShapes: [Star, Star, Star, Star] }}
				items={4}
				onChange={() => null}
			/>
		);

		expect(group).not.toBeInTheDocument();
	});

	test('Should not render the component if no itemShapes provided JSX element', () => {
		render(
			<Rating
				readOnly
				value={1.5}
				// @ts-ignore - TEST
				itemStyles={{ activeFillColor: 'red' }}
				items={3}
				onChange={() => null}
			/>
		);

		const group = screen.queryByTestId(GROUP_ID);
		expect(group).not.toBeInTheDocument();
	});

	test('If no onChange provided and readOnly is false (default), it should not render the component', () => {
		render(<Rating value={3} />);
		const group = screen.queryByTestId(GROUP_ID);
		expect(group).not.toBeInTheDocument();
	});

	test('If onChange provided and readOnly is false, it should render the component', () => {
		render(<Rating value={3} onChange={() => null} />);
		const group = screen.queryByTestId(GROUP_ID);
		expect(group).toBeInTheDocument();
	});

	test('If readOnly is false and value provided is not an integer, it should not render the component', () => {
		render(<Rating value={3.6} onChange={() => null} />);
		const group = screen.queryByTestId(GROUP_ID);
		expect(group).not.toBeInTheDocument();
	});

	/* New in v1.1.0 */
	test('If isDisabled, should not render the component if onChange is undefined', () => {
		render(<Rating isDisabled value={5} />);
		const group = screen.queryByTestId(GROUP_ID);
		expect(group).not.toBeInTheDocument();
	});

	test('If readOnly and isDisabled, should render the component if onChange is undefined', () => {
		render(<Rating readOnly isDisabled value={5} />);
		const group = screen.queryByTestId(GROUP_ID);
		expect(group).toBeInTheDocument();
	});
});

describe('Any child element rendering', () => {
	test('It should render 3 boxes and each box should have a non-empty SVG child', () => {
		render(<Rating value={3} items={3} onChange={() => null} />);

		const areChildNodesRendered = (boxId: string, svgId: string) => {
			const box = screen.getByTestId(boxId);
			expect(box).not.toBeEmptyDOMElement();
			const svg = screen.getByTestId(svgId);
			expect(svg).not.toBeEmptyDOMElement();
		};

		areChildNodesRendered(CHILD_ID_1, SVGCHILD_ID_1);
		areChildNodesRendered(CHILD_ID_2, SVGCHILD_ID_2);
		areChildNodesRendered(CHILD_ID_3, SVGCHILD_ID_3);
	});

	test('If halfFillMode equals to svg (default) and deserves half-fill, it should render defs', () => {
		render(<Rating readOnly value={1.5} items={3} onChange={() => null} />);

		const defs = screen.getByTestId('svg-defs-testid');
		expect(defs).toBeInTheDocument();
		expect(defs).not.toBeEmptyDOMElement();
	});
});
