import { gql } from "@apollo/client";

export const GET_LOCAL_CATEGORY = gql`
  query GetCategory {
    category @client {
      category
    }
  }
`;

export const GET_LOCAL_CURRENCY = gql`
  query GetCurrency {
    currency @client {
      currency
    }
  }
`;

export const GET_LOCAL_GOODS = gql`
  query GetGoods {
    goods @client {
      goods
    }
  }
`;

export const GET_LOCAL_SELECTED_GOOD_ID = gql`
  query GetSelectedGoodId {
    selectedGoodId @client {
      selectedGoodId
    }
  }
`;

export const GET_ALL_GOODS = gql`
  query GetAllGoods {
    goods @client {
      id
      name
      inStock
      gallery
      category
      attributes
      prices
    }
  }
`;
