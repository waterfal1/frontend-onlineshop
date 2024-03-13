import React from "react";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";
import router from "./router.tsx";
import { cache } from "./cache.tsx";
import { RouterProvider } from "react-router-dom";

const client = new ApolloClient({
  cache,
  uri: "http://0.0.0.0:4000/",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
