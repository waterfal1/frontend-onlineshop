import React, { useCallback } from "react";

import { CartProduct } from "../../../../models/CartProduct";
import ChangeGoodAmount from "../components";

type Props = {
  good: CartProduct;
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

export default React.memo(ChangeGoodAmountContainer);
