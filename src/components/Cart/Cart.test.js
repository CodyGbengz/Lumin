import { render, screen, fireEvent } from '@testing-library/react';

import Cart from './Cart';

import products from './mock';

test('renders cart page', () => {
    const { getByText } = render(<Cart items={products} />);
    const headerElement = getByText(/Your cart/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders cart empty state', () => {
    const { getByText } = render(<Cart />);
    const emptyState = getByText(/Your cart is empty/)
    expect(emptyState).toBeInTheDocument();
  });

test('calls onClick prop when increment is clicked', () => {
  const handleClick = jest.fn();
  render(<Cart items={products} increaseQuantity={handleClick} />);
  fireEvent.click(screen.getAllByText(/\+/i)[0]);
  expect(handleClick).toHaveBeenCalledTimes(1);
})

test('renders correct subtotal amount', () => {
  const { getByText } = render(<Cart items={products} />);
  const subTotal = getByText(/55/i);
  expect(subTotal).toBeInTheDocument(55);

})