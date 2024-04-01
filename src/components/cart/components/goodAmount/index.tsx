import React from "react";

import { CartProduct } from "../../../../models/CartProduct";

type Props = {
  good: CartProduct;
  setProductAmountUp: (item: CartProduct) => void;
  setProductAmountDown: (item: CartProduct) => void;
};

function ChangeGoodAmount(props: Props) {
  const { good, setProductAmountDown, setProductAmountUp } = props;

  return (
    <>
      <div className="cart-center-flex-element">
        <button
          onClick={() => setProductAmountUp(good)}
          className="cart-window-counter-btn"
        >
          +
        </button>
        {good.quantity}
        <button
          onClick={() => setProductAmountDown(good)}
          className="cart-window-counter-btn"
        >
          -
        </button>
      </div>
    </>
  );
}

export default ChangeGoodAmount;
