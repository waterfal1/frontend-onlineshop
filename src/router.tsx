import React, { Suspense } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Cart from "./components/cart";
import Header from "./components/header";
import Home from "./components/home";
import ErrorBoundary from "./errorBoundary";
import WithCategoryValidation from "./hocs/withCategoryValidation";
import WithProductIdValidation from "./hocs/withProductIdValidation";
import NotFoundPage from "./pages/404/NotFoundPage";
import Loading from "./pages/loading";

const LazyGoods = React.lazy(() => import("./components/goods"));

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
      <Route index element={<Home />} />
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
            <Suspense fallback={<Loading />}>
              <WithCategoryValidation>
                <WithProductIdValidation>
                  <LazyGoods />
                </WithProductIdValidation>
              </WithCategoryValidation>
            </Suspense>
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
