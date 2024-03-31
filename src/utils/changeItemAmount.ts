import _ from "lodash";

import { CartProduct } from "../models/CartProduct";

export const increaseCartItem = (
  item: CartProduct,
  setCartItems: React.Dispatch<React.SetStateAction<CartProduct[]>>
) => {
  setCartItems((state) => {
    return state.map((cartItem: CartProduct) => {
      if (
        cartItem.id === item.id &&
        _.isEqual(item.attributes, cartItem.attributes)
      ) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
  });
};

export const decreaseCartItem = (
  item: CartProduct,
  setCartItems: React.Dispatch<React.SetStateAction<CartProduct[]>>
) => {
  setCartItems((state) => {
    const updatedCartItems = state.map((cartItem: CartProduct) => {
      if (
        cartItem.id === item.id &&
        _.isEqual(item.attributes, cartItem.attributes)
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
};
