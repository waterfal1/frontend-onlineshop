import React from "react";
import { ApolloClient, ApolloProvider, HttpLink, from } from "@apollo/client";
import ReactDOM from "react-dom/client";
import router from "./router";
import { cache } from "./cache";
import { RouterProvider } from "react-router-dom";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({ uri: "http://0.0.0.0:4000/" });

export const client = new ApolloClient({
  cache,
  link: from([errorLink, httpLink]),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
