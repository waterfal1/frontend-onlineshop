import React, { useCallback } from "react";

import { CartProduct } from "../../../models/CartProduct";
import GoodAmount from "../components/goodAmount";

type Props = {
  good: CartProduct;
  increaseCartItem: (item: CartProduct) => void;
  decreaseCartItem: (item: CartProduct) => void;
};

function GoodAmountContainer(props: Props) {
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
    <GoodAmount
      good={good}
      setProductAmountUp={setProductAmountUp}
      setProductAmountDown={setProductAmountDown}
    />
  );
}

export default React.memo(GoodAmountContainer);
