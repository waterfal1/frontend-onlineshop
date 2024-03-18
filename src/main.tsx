import React from "react";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";
import router from "./router";
import { cache } from "./cache";
import { RouterProvider } from "react-router-dom";

export const client = new ApolloClient({
  cache,
  uri: "http://0.0.0.0:4000/",
});

//@ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
