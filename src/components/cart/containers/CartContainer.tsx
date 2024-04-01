import { useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import { useMatch } from "react-router-dom";

import { cartService } from "../../../businessLayer";
import { CartProduct } from "../../../models/CartProduct";
import { GET_LOCAL_CURRENCY } from "../../../operations/queries";
import Cart from "../components/cart";

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
      updateComponent={updateComponent}
    />
  );
}

export default CartContainer;
