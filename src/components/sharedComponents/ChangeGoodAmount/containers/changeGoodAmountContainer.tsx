import React, { useCallback } from "react";

import ChangeGoodAmount from "../components";
import { CartProduct } from "../../../../models/CartProduct";

type Props = {
  good: CartProduct;
  adjustGoodAmount: boolean;
  increaseCartItem: (item: CartProduct) => void;
  decreaseCartItem: (item: CartProduct) => void;
};

function ChangeGoodAmountContainer(props: Props) {
  const { good, decreaseCartItem, increaseCartItem } = props;

  const setProductAmountUp = useCallback(
    (item: CartProduct) => {
      increaseCartItem(item);
    },
    [increaseCartItem]
  );

  const setProductAmountDown = useCallback(
    (item: CartProduct) => {
      decreaseCartItem(item);
    },
    [decreaseCartItem]
  );

  return (
    <ChangeGoodAmount
      good={good}
      setProductAmountUp={setProductAmountUp}
      setProductAmountDown={setProductAmountDown}
    />
  );
}

export default ChangeGoodAmountContainer;
