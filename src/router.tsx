import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import React from "react";
import Home from "./components/home";
import Notfoundpage from "./pages/notFoundPage";
import Goods from "./components/goods";
import Cart from "./components/cart";
import Header from "./components/header";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="/clothes" element={<Goods route={"clothes"} />} />
      <Route path="/tech" element={<Goods route={"tech"} />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="*" element={<Notfoundpage />} />
    </Route>
  )
);

export default router;
