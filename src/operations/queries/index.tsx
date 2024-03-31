import { TypedDocumentNode, gql } from "@apollo/client";

interface CurrencyData {
  currency: string;
}

export const GET_LOCAL_CURRENCY: TypedDocumentNode<CurrencyData> = gql`
  query GetCurrency {
    currency @client
  }
`;
