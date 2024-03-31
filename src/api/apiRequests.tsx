import { TypedDocumentNode, gql } from "@apollo/client";

import CategoryInput from "./serverTypes/checkIsValidCategory/CategoryInput";
import IsValidCategoryInput from "./serverTypes/checkIsValidCategory/CategoryInput";
import IsValidCategoryData from "./serverTypes/checkIsValidCategory/IsValidCategoryData";
import IsValidProductIdData from "./serverTypes/checkIsValidProductid/IsValidProductIdData";
import IsValidProductInput from "./serverTypes/checkIsValidProductid/isValidProductInput";
import CategoryData from "./serverTypes/getCategory/CategoryData";
import CurrenciesData from "./serverTypes/getCurrencies/CurrenciesData";
import ProductData from "./serverTypes/getProduct/ProductData";
import ProductInput from "./serverTypes/getProduct/ProductInput";

export const GET_PRODUCT: TypedDocumentNode<ProductData, ProductInput> = gql`
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

export const GET_CURRENCIES: TypedDocumentNode<CurrenciesData> = gql`
  query {
    currencies
  }
`;

export const IS_VALID_CATEGORY: TypedDocumentNode<
  IsValidCategoryData,
  IsValidCategoryInput
> = gql`
  query isValidCategory($input: CategoryInput) {
    isValidCategory(input: $input) {
      isValidCategory
    }
  }
`;

export const IS_VALID_PRODUCT_ID: TypedDocumentNode<
  IsValidProductIdData,
  IsValidProductInput
> = gql`
  query isValidProductId($input: ProductInput) {
    isValidProductId(input: $input) {
      isValidProductId
    }
  }
`;

export const GET_PARTIAL_CATEGORY_DATA: TypedDocumentNode<CategoryData> = gql`
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

export const GET_CATEGORY: TypedDocumentNode<CategoryData, CategoryInput> = gql`
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
