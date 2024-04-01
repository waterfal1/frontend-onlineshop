import React, { Dispatch, SetStateAction, useCallback, useState } from "react";

import { cartService } from "../../../businessLayer";
import { Attribute } from "../../../models/Attribute";
import { CartProduct } from "../../../models/CartProduct";
import { Product } from "../../../models/Product";
import { useUpdateCart } from "../../../services/useUpdateCartItems";
import { cartProductMapper } from "../../home/mappers";
import GoodProperties from "../components/goodProperties/selectProperties";

type Props = {
  product: Product;
  isAddToCartAvailable?: boolean;
  price?: React.ReactNode;
  isSelectAvailable?: boolean;
  adjustGoodAmount?: boolean;
  withDescription?: boolean;
  setCartItems?: Dispatch<SetStateAction<CartProduct[]>>;
};

function GoodPropertiesContainer(props: Props) {
  const { product, price } = props;

  const updateCart = useUpdateCart();

  const [selectedAttributes, setSelectedAttributes] = useState<number[]>(
    new Array(product.attributes.length).fill(0)
  );

  const selectAttributeHandler = useCallback(
    (attrIndex: number, attrPropertyIndex: number) => {
      setSelectedAttributes((state) => {
        const newState = [...state];
        newState[attrIndex] = attrPropertyIndex;
        return newState;
      });
    },
    []
  );

  const addToCartHandler = useCallback(
    (item: Product) => {
      if (item.inStock) {
        const cartProduct = cartProductMapper(item);
        cartProduct.values = item.attributes.reduce(
          (acc: { [key: string]: string }, curr: Attribute, index: number) => {
            acc[curr.id] =
              curr.items[selectedAttributes[index]].value ||
              curr.items[selectedAttributes[index]].displayValue;
            return acc;
          },
          {}
        );
        cartService.setItemAmountUp(cartProduct);
        updateCart?.updateCartItems?.();
      }
    },
    [selectedAttributes, updateCart]
  );

  return (
    <GoodProperties
      product={product}
      price={price}
      selectedAttributes={selectedAttributes}
      addToCart={addToCartHandler}
      selectAttribute={selectAttributeHandler}
    />
  );
}

export default React.memo(GoodPropertiesContainer);
