import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/home";
import NotFoundPage from "./pages/NotFoundPage";
import Goods from "./components/goods";
import Cart from "./components/cart";
import Header from "./components/header";
import WithCategoryValidation from "./hocs/withCategoryValidation";
import WithProductIdValidation from "./hocs/withProductIdValidation";
import ErrorBoundary from "./errorBoundary";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
      }
    >
      <Route
        index
        element={
          <ErrorBoundary>
            <Home />
          </ErrorBoundary>
        }
      />
      <Route
        path="/:categoryName"
        element={
          <ErrorBoundary>
            <WithCategoryValidation>
              <Home />
            </WithCategoryValidation>
          </ErrorBoundary>
        }
      />
      <Route
        path="/:categoryName/:productId"
        element={
          <ErrorBoundary>
            <WithCategoryValidation>
              <WithProductIdValidation>
                <Goods />
              </WithProductIdValidation>
            </WithCategoryValidation>
          </ErrorBoundary>
        }
      />
      <Route
        path="/cart"
        element={
          <ErrorBoundary>
            <Cart />
          </ErrorBoundary>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;
