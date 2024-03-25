import { gql } from "@apollo/client";

export const GET_LOCAL_CURRENCY = gql`
  query GetCurrency {
    currency @client
  }
`;
