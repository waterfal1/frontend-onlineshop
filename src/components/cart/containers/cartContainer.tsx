import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useMatch } from "react-router-dom";

import { GET_LOCAL_CURRENCY } from "../../../operations/queries";
import { CartProduct } from "../../../models/CartProduct";
import { cartService } from "../../../businessLayer";
import Cart from "../components";
import {
  decreaseCartItem,
  increaseCartItem,
} from "../../../utils/changeItemAmount";

function CartContainer() {
  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const match = useMatch({
    path: "cart",
  });

  const updateComponent = useCallback(() => {
    const cart = cartService.get();
    if (cart) setCartItems(cart);
  }, []);

  useEffect(() => {
    updateComponent();
  }, [updateComponent]);

  // const increaseCartItemHandler = useCallback((item: CartProduct) => {
  //   increaseCartItem(item, setCartItems);
  // }, []);

  // const decreaseCartItemHandler = useCallback((item: CartProduct) => {
  //   decreaseCartItem(item, setCartItems);
  // }, []);

  const setNextImage = useCallback(
    (item: CartProduct) => {
      const cartItem = cartService.getItem(item);
      if (cartItem.activeImageIndx < cartItem.gallery.length - 1) {
        cartItem.activeImageIndx++;
      } else {
        cartItem.activeImageIndx = 0;
      }
      cartService.update(cartItem);
      updateComponent();
    },
    [updateComponent]
  );

  const setPreviousImage = useCallback(
    (item: CartProduct) => {
      const cartItem = cartService.getItem(item);
      if (cartItem.activeImageIndx > 0) {
        cartItem.activeImageIndx--;
      } else {
        cartItem.activeImageIndx = cartItem.gallery.length - 1;
      }
      cartService.update(cartItem);
      updateComponent();
    },
    [updateComponent]
  );

  return (
    <Cart
      cartItems={cartItems}
      pageName={match.pattern.path}
      currentCurrency={currentCurrency.data.currency}
      setPreviousImage={setPreviousImage}
      setCartItems={setCartItems}
      setNextImage={setNextImage}
      // increaseCartItem={increaseCartItemHandler}
      // decreaseCartItem={decreaseCartItemHandler}
    />
  );
}

export default CartContainer;
