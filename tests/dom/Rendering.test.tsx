import React from 'react';

import { render, screen } from '@testing-library/react';
import {
	beforeEach,
	afterEach,
	ID,
	CHILD_ID_1,
	CHILD_ID_2,
	CHILD_ID_3,
	SVGCHILD_ID_1,
	SVGCHILD_ID_2,
	SVGCHILD_ID_3,
} from './testUtils';

import { Rating } from '../../src/Rating';
import { Star } from '../../src/Star';

beforeEach();
afterEach();

describe('Component rendering', () => {
	test('Should be in the document if value equals to zero', () => {
		const { rerender } = render(<Rating value={0} onChange={() => {}} />);
		const item = screen.getByTestId(ID);
		expect(item).toBeInTheDocument();

		rerender(<Rating value={0} readOnly />);
		expect(item).toBeInTheDocument();
	});

	test('Should not render the component if value is not a number', () => {
		// @ts-ignore
		const { rerender } = render(<Rating value="6" />);
		const item = screen.queryByTestId(ID);
		expect(item).not.toBeInTheDocument();
		// @ts-ignore
		rerender(<Rating readOnly value="6" />);
		expect(item).not.toBeInTheDocument();
	});

	test('Should not render the component if items greater than 10', () => {
		// @ts-ignore
		render(<Rating value={6} items={11} />);
		const item = screen.queryByTestId(ID);
		expect(item).not.toBeInTheDocument();
	});

	test('Should not render the component if value greater than items (default: 5)', () => {
		const { rerender } = render(<Rating value={6} />);
		const item = screen.queryByTestId(ID);
		expect(item).not.toBeInTheDocument();

		rerender(<Rating value={6} readOnly />);
		expect(item).not.toBeInTheDocument();
	});

	test('Should not render the component if itemShapes is not a valid JSX element', () => {
		const StarComponent = () => Star;

		const { rerender } = render(
			<Rating
				readOnly
				value={1.5}
				// @ts-ignore
				itemStyles={{ itemShapes: StarComponent }}
				items={3}
				onChange={() => {}}
			/>
		);

		const item = screen.queryByTestId(ID);
		expect(item).not.toBeInTheDocument();

		rerender(
			<Rating
				readOnly
				value={1.5}
				// @ts-ignore
				itemStyles={{ itemShapes: [StarComponent, StarComponent, StarComponent] }}
				items={3}
				onChange={() => {}}
			/>
		);

		expect(item).not.toBeInTheDocument();
	});

	test('Should not render the component if itemShapes length not equal to items', () => {
		const StarComponent = () => Star;

		const { rerender } = render(
			<Rating
				readOnly
				value={1.5}
				itemStyles={{ itemShapes: [Star, Star] }}
				items={3}
				onChange={() => {}}
			/>
		);

		const item = screen.queryByTestId(ID);
		expect(item).not.toBeInTheDocument();

		rerender(
			<Rating
				readOnly
				value={1.5}
				itemStyles={{ itemShapes: [Star, Star, Star, Star] }}
				items={4}
				onChange={() => {}}
			/>
		);

		expect(item).not.toBeInTheDocument();
	});

	test('Should not render the component if no itemShapes provided JSX element', () => {
		const StarComponent = () => Star;

		render(
			<Rating
				readOnly
				value={1.5}
				// @ts-ignore
				itemStyles={{ activeFillColor: 'red' }}
				items={3}
				onChange={() => {}}
			/>
		);

		const item = screen.queryByTestId(ID);
		expect(item).not.toBeInTheDocument();
	});

	test('If no onChange provided and readOnly is false (default), it should not render the component', () => {
		render(<Rating value={3} />);
		const item = screen.queryByTestId(ID);
		expect(item).not.toBeInTheDocument();
	});

	test('If onChange provided and readOnly is false, it should render the component', () => {
		render(<Rating value={3} onChange={() => {}} />);
		const item = screen.queryByTestId(ID);
		expect(item).toBeInTheDocument();
	});

	test('If readOnly is false and value provided is not an integer, it should not render the component', () => {
		render(<Rating value={3.6} onChange={() => {}} />);
		const item = screen.queryByTestId(ID);
		expect(item).not.toBeInTheDocument();
	});
});

describe('Any child element rendering', () => {
	test('It should render 3 boxes and each box should have a non-empty SVG child', () => {
		render(<Rating value={3} items={3} onChange={() => {}} />);

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
		render(<Rating readOnly value={1.5} items={3} onChange={() => {}} />);

		const defs = screen.getByTestId('svg-defs-testid');
		expect(defs).toBeInTheDocument();
		expect(defs).not.toBeEmptyDOMElement();
	});
});
