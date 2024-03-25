import React, { useCallback, useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import _ from "lodash";
import { GET_LOCAL_CURRENCY } from "../../../operations/queries";
import { CartProduct } from "../../../models/CartProduct";
import { cartService } from "../../../businessLayer";
import Cart from "../components";

function CartContainer() {
  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const updateComponent = useCallback(() => {
    const cart = cartService.get();
    if (cart) setCartItems(cart);
  }, []);

  useEffect(() => {
    updateComponent();
  }, [updateComponent]);

  const setProductAmountUp = useCallback((item: CartProduct) => {
    cartService.setItemAmountUp(item);
    setCartItems((state) => {
      return state.map((cartItem: CartProduct) => {
        if (
          cartItem.id === item.id &&
          _.isEqual(item.values, cartItem.values)
        ) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
    });
  }, []);

  const setProductAmountDown = useCallback((item: CartProduct) => {
    cartService.setItemAmountDown(item);
    setCartItems((state) => {
      const updatedCartItems = state.map((cartItem: CartProduct) => {
        if (
          cartItem.id === item.id &&
          _.isEqual(item.values, cartItem.values)
        ) {
          const newQuantity = Math.max(cartItem.quantity - 1, 0);
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });

      const filteredCartItems = updatedCartItems.filter(
        (cartItem: CartProduct) => cartItem.quantity > 0
      );

      return filteredCartItems;
    });
  }, []);

  const selectAttributeHandler = useCallback(
    (
      item: CartProduct,
      attribute: string,
      value: string,
      displayValue: string
    ) => {
      const cartItem = cartService.getItem(item);
      if (cartItem) {
        cartItem.values[attribute] = value || displayValue;
        cartService.updateSelectedProperties(item, cartItem);
      }
      updateComponent();
    },
    [updateComponent]
  );

  const setNextImage = useCallback(
    (item: CartProduct) => {
      const cartItem = cartService.getItem(item);
      if (cartItem.activeImageIndx < cartItem.photo.length - 1) {
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
        cartItem.activeImageIndx = cartItem.photo.length - 1;
      }
      cartService.update(cartItem);
      updateComponent();
    },
    [updateComponent]
  );

  return (
    <Cart
      cartItems={cartItems}
      currentCurrency={currentCurrency.data.currency}
      setPreviousImage={setPreviousImage}
      setNextImage={setNextImage}
      setProductAmountUp={setProductAmountUp}
      setProductAmountDown={setProductAmountDown}
      selectAttributeHandler={selectAttributeHandler}
    />
  );
}

export default CartContainer;
