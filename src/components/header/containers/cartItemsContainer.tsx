import React, { Dispatch, SetStateAction, useCallback } from "react";

import { cartService } from "../../../businessLayer";
import { CartProduct } from "../../../models/CartProduct";
import {
  decreaseCartItem,
  increaseCartItem,
} from "../../../utils/changeItemAmount";
import CartItems from "../components/cartItems";

type Props = {
  product: CartProduct;
  isAddToCartAvailable?: boolean;
  price?: React.ReactNode;
  isSelectAvailable?: boolean;
  adjustGoodAmount?: boolean;
  withDescription?: boolean;
  setCartItems?: Dispatch<SetStateAction<CartProduct[]>>;
};

function CartItemsContainer(props: Props) {
  const { product, price, setCartItems } = props;

  const increaseCartItemHandler = useCallback(
    (item: CartProduct) => {
      cartService.setItemAmountUp(item);
      increaseCartItem(item, setCartItems);
    },
    [setCartItems]
  );

  const decreaseCartItemHandler = useCallback(
    (item: CartProduct) => {
      cartService.setItemAmountDown(item);
      decreaseCartItem(item, setCartItems);
    },
    [setCartItems]
  );

  return (
    <CartItems
      product={product}
      price={price}
      increaseCartItem={increaseCartItemHandler}
      decreaseCartItem={decreaseCartItemHandler}
    />
  );
}

export default React.memo(CartItemsContainer);
