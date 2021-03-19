import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
  query getProducts($currency: Currency) {
    products {
      id
      title
      image_url
      price(currency: $currency)
      product_options {
        title
        prefix
        suffix
        options {
          id
          value
        }
      }
    }
  }
`;

export const GET_CURRENCY = gql`
  query getCurrency {
    currency
  }
`