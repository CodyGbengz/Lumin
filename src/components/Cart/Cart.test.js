import { render, screen } from '@testing-library/react';

import Cart from './Cart';

test('renders products page', () => {
    render(<Cart />);
    const headerElement = screen.getByText(/Your cart/i);
    const emptyState = screen.getByText(/Your cart is empty/)
    expect(headerElement).toBeInTheDocument();
    expect(emptyState).toBeInTheDocument();
  });