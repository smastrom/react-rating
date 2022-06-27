import React from 'react';

import { render, screen } from '@testing-library/react';
import { beforeEach, afterEach, ID } from './testUtils';

import { Rating } from '../../src/Rating';

beforeEach();
afterEach();

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

test('Should not render the component if limit greater than 10', () => {
  // @ts-ignore
  render(<Rating value={6} limit={11} />);
  const item = screen.queryByTestId(ID);
  expect(item).not.toBeInTheDocument();
});

test('Should not render the component if value greather than limit (default: 5)', () => {
  const { rerender } = render(<Rating value={6} />);
  const item = screen.queryByTestId(ID);
  expect(item).not.toBeInTheDocument();

  rerender(<Rating value={6} readOnly />);
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
