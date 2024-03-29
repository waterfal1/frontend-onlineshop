import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query product($input: ProductInput) {
    product(input: $input) {
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
        }
      }
      prices {
        currency
        amount
      }
    }
  }
`;

export const GET_CURRENCIES = gql`
  query {
    currencies
  }
`;

export const IS_VALID_CATEGORY = gql`
  query isValidCategory($input: CategoryInput) {
    isValidCategory(input: $input) {
      isValidCategory
    }
  }
`;

export const IS_VALID_PRODUCT_ID = gql`
  query isValidProductId($input: ProductInput) {
    isValidProductId(input: $input) {
      isValidProductId
    }
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

export const GET_CATEGORY = gql`
  query category($input: CategoryInput) {
    category(input: $input) {
      name
      products {
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
