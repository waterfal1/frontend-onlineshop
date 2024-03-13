import React from "react";

interface PlusMinusButtonsProps {
  setAmountUp: (productIndexes: (string | number[][] | number)[]) => void;
  setAmountDown: (
    productIndexes: (string | number[][] | number)[]
  ) => void | undefined;
  goodsAmount: (string | number[][] | number)[][];
  goodsNumber: number;
}

export default class PlusMinusButtons extends React.Component<PlusMinusButtonsProps> {
  render() {
    const { setAmountUp, setAmountDown, goodsAmount, goodsNumber } = this.props;
    return (
      <div className="cart-window-center-flex-element">
        <button
          onClick={() => setAmountUp(goodsAmount[goodsNumber])}
          className="cart-window-counter-btn"
        >
          +
        </button>
        {goodsAmount[goodsNumber][2]}
        <button
          onClick={() => setAmountDown(goodsAmount[goodsNumber])}
          className="cart-window-counter-btn"
        >
          -
        </button>
      </div>
    );
  }
}
