import { render, screen, fireEvent } from '@testing-library/react';


import Products from './Products';
import productsMock from '../Cart/mock'

test('renders products component', () => {
  render(<Products />);
  const textElement = screen.getByText(/All Products/i);
  expect(textElement).toBeInTheDocument();
});

test('renders product empty state', () => {
    const { getByText } = render(<Products />);
    const emptyState = getByText(/loading.../i);
    expect(emptyState).toBeInTheDocument();
});

test('calls onClick prop when the add-to-cart button is clicked', () => {
    const handleClick = jest.fn();
    render(<Products
        products={productsMock}
        addItemToCart={handleClick} 
        toggleCartSideBar={handleClick}
        />);
    fireEvent.click(screen.getAllByText(/add to cart/i)[0]);
    expect(handleClick).toHaveBeenCalledTimes(2);
})