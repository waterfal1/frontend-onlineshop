import { useQuery, gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query product($input: ProductInput) {
    product(input: $input) {
      product {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency
          amount
        }
      }
    }
  }
`;

export const GET_CATEGORY = gql`
  query category($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        inStock
        gallery
        category
        attributes {
          id
          name
          items {
            displayValue
          }
        }
        prices {
          currency
          amount
        }
      }
    }
  }
`;

export const GET_CURRENCIES = gql`
  query {
    currencies
  }
`;

export const GET_PARTIAL_CATEGORY_DATA = gql`
  query {
    category {
      name
      products {
        category
        prices {
          currency
          amount
        }
      }
    }
  }
`;

export const GET_ALL_DATA = gql`
  query {
    category {
      name
      products {
        id
        name
        gallery
        attributes {
          name
          items {
            displayValue
            value
          }
        }
        prices {
          currency
          amount
        }
      }
    }
  }
`;
