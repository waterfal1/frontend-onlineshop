import React from "react";

import { CartProduct } from "../../../../models/CartProduct";

import "./styles.css";

type Props = {
  good: CartProduct;
  setProductAmountUp: (item: CartProduct) => void;
  setProductAmountDown: (item: CartProduct) => void;
};

function ChangeGoodAmount(props: Props) {
  const { good, setProductAmountDown, setProductAmountUp } = props;

  return (
    <>
      <div className="goodamount">
        <button
          onClick={() => setProductAmountUp(good)}
          className="goodamount__counterbutton"
        >
          +
        </button>
        {good.quantity}
        <button
          onClick={() => setProductAmountDown(good)}
          className="goodamount__counterbutton"
        >
          -
        </button>
      </div>
    </>
  );
}

export default ChangeGoodAmount;
