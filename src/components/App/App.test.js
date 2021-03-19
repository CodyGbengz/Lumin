import { render, screen } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks'
import client from '../../client';

import App from './App';

test('renders App page', () => {
  render(<ApolloProvider client={client}><App /></ApolloProvider>);
  const textElement = screen.getByText(/All Products/i);
  expect(textElement).toBeInTheDocument();
});
