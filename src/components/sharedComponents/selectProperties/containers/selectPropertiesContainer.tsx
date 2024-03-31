import React, { Dispatch, SetStateAction, useCallback, useState } from "react";

import { cartService } from "../../../../businessLayer";
import { CartAttribute } from "../../../../models/Attribute";
import { CartProduct } from "../../../../models/CartProduct";
import {
  decreaseCartItem,
  increaseCartItem,
} from "../../../../utils/changeItemAmount";
import SelectProperties from "../components/selectProperties";

type Props = {
  product: CartProduct;
  isAddToCartAvailable?: boolean;
  price?: React.ReactNode;
  isSelectAvailable?: boolean;
  adjustGoodAmount?: boolean;
  withDescription?: boolean;
  setCartItems?: Dispatch<SetStateAction<CartProduct[]>>;
};

function initSelectedAttributes(product: CartProduct) {
  let attrSelected: number[] = [];
  product.attributes.forEach((el) =>
    el.items.forEach((e, index) => {
      if (e?.isSelected) {
        attrSelected.push(index);
      }
    })
  );

  return attrSelected;
}

function SelectPropertiesContainer(props: Props) {
  const {
    product,
    isAddToCartAvailable = true,
    adjustGoodAmount = true,
    price,
    isSelectAvailable = true,
    withDescription = false,
    setCartItems,
  } = props;

  const [selectedAttributes, setSelectedAttributes] = useState<number[]>(
    initSelectedAttributes(product)
  );
  const getAttributes = useCallback(
    (item: CartProduct) => {
      const newItem = { ...item };
      newItem.attributes = item.attributes.map(
        (e: CartAttribute, index: number) => {
          e.items = e.items.map((element, elementIndex) => {
            if (selectedAttributes[index] === elementIndex) {
              element.isSelected = true;
            } else {
              element.isSelected = false;
            }
            return element;
          });
          return e;
        }
      );
      return newItem;
    },
    [selectedAttributes]
  );

  const increaseCartItemHandler = useCallback(
    (item: CartProduct) => {
      let newItem = getAttributes(item);
      cartService.setItemAmountUp(newItem);
      increaseCartItem(item, setCartItems);
    },
    [getAttributes, setCartItems]
  );

  const decreaseCartItemHandler = useCallback(
    (item: CartProduct) => {
      let newItem = getAttributes(item);
      cartService.setItemAmountDown(newItem);
      decreaseCartItem(item, setCartItems);
    },
    [getAttributes, setCartItems]
  );

  const selectAttributeHandler = useCallback(
    (attrIndex: number, attrPropertyIndex: number, item: CartProduct) => {
      setSelectedAttributes((state) => {
        const newState = [...state];
        newState[attrIndex] = attrPropertyIndex;
        return newState;
      });
      const cartItem = cartService.getItem(item);
      if (cartItem) {
        cartItem.attributes[attrIndex].items = cartItem.attributes[
          attrIndex
        ].items.map((el) => {
          return { ...el, isSelected: false };
        });
        cartItem.attributes[attrIndex].items[attrPropertyIndex].isSelected =
          true;
        cartService.updateSelectedProperties(item, cartItem);
      }
    },
    []
  );

  const addToCartHandler = useCallback(
    (item: CartProduct) => {
      if (item.inStock) {
        let newItem = getAttributes(item);

        cartService.setItemAmountUp(newItem);
      }
    },
    [getAttributes]
  );

  return (
    <SelectProperties
      product={product}
      isAddToCartAvailable={isAddToCartAvailable}
      price={price}
      selectedAttributes={selectedAttributes}
      isSelectAvailable={isSelectAvailable}
      withDescription={withDescription}
      adjustGoodAmount={adjustGoodAmount}
      addToCart={addToCartHandler}
      increaseCartItem={increaseCartItemHandler}
      decreaseCartItem={decreaseCartItemHandler}
      selectAttribute={selectAttributeHandler}
    />
  );
}

export default React.memo(SelectPropertiesContainer);
