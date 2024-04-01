import React, { Dispatch, SetStateAction, useCallback } from "react";

import { cartService } from "../../../businessLayer";
import { AttributeItem } from "../../../models/AttributeItem";
import { CartProduct } from "../../../models/CartProduct";
import { useUpdateCart } from "../../../services/useUpdateCartItems";
import {
  decreaseCartItem,
  increaseCartItem,
} from "../../../utils/changeItemAmount";
import GoodProperties from "../components/goodProperties";

type Props = {
  product: CartProduct;
  isAddToCartAvailable?: boolean;
  price?: React.ReactNode;
  isSelectAvailable?: boolean;
  adjustGoodAmount?: boolean;
  withDescription?: boolean;
  setCartItems?: Dispatch<SetStateAction<CartProduct[]>>;
  updateComponent: () => void;
};

function GoodPropertiesContainer(props: Props) {
  const { product, price, setCartItems, updateComponent } = props;

  const { updateCartItems } = useUpdateCart();

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
      updateCartItems();
    },
    [setCartItems, updateCartItems]
  );

  const selectAttributeHandler = useCallback(
    (item: CartProduct, attribute: string, value: AttributeItem) => {
      const cartItem = cartService.getItem(item);
      if (cartItem) {
        cartItem.values[attribute] = value.value || value.displayValue;
        cartService.updateSelectedProperties(item, cartItem);
        updateComponent();
        updateCartItems();
      }
    },
    [updateCartItems, updateComponent]
  );

  return (
    <GoodProperties
      product={product}
      price={price}
      increaseCartItem={increaseCartItemHandler}
      decreaseCartItem={decreaseCartItemHandler}
      selectAttribute={selectAttributeHandler}
    />
  );
}

export default React.memo(GoodPropertiesContainer);
