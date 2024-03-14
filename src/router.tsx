import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/home";
import NotFoundPage from "./pages/notFoundPage";
import Goods from "./components/goods";
import Cart from "./components/cart";
import Header from "./components/header";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="/:categoryName" element={<Home />} />
      <Route path="/:categoryName/:productId" element={<Goods />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;
