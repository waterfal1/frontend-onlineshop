import React, { useState } from "react";
import "./styles.css";
import GoodsInCart from "../../goods/components/goodsInCart";
// import { query } from "../Home/getData";
// import GoodsInCart from "../../Components/Cart/Cart";
// import { goodsCollection } from "../../Components/functions";
// import { MyGoods } from "../Home/ProductsClass";

interface CartProps {
  stateCurrency: number;
  setCurrency: (value: number) => { type: string; payload: number };
  stateSelectedItem: number;
  setGoods: (value: number) => { type: string; payload: number };
}

function Cart() {
  //   if (!this.state.loading) return "....Loading";
  //   const goodsFromStorage = JSON.parse(
  //     sessionStorage.getItem("Goods") as string
  //   );
  //   const goodsAmount = goodsCollection(goodsFromStorage);

  return (
    <section>
      <div className="cart-name">Cart</div>
      {false ? (
        <div className="cart-name">You cart is empty</div>
      ) : (
        <GoodsInCart />
      )}
    </section>
  );
}

export default Cart;
