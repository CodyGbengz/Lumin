import { render, screen } from '@testing-library/react';


import Products from './Products';

test('renders products component', () => {
  render(<Products />);
  const textElement = screen.getByText(/All Products/i);
  expect(textElement).toBeInTheDocument();
});
