import React from "react";
import "../../Pages/Goods/Goods.styles.scss";

type Props = {
  attributeSelected: (input1: number, input2: number, input3: number) => void;
  value: string;
  productIndex: number;
  attributeIndex: number;
  itemIndex: number;
};

function AttributeName(props: Props) {
  const { productIndex, attributeIndex, itemIndex, value } = props;
  const divStyle = {
    background: value,
    color: value,
    border: `10px solid ${value}`,
    boxShadow: "0 0 4px 0 rgba(50, 50, 50, 1)",
  };
  return (
    <div
      style={{
        background: value,
        color: value,
        border: `10px solid ${value}`,
        boxShadow: "0 0 4px 0 rgba(50, 50, 50, 1)",
      }}
      onClick={() => {}}
      className="goods-attribute-box goods-selected pointer"
    >
      {value}
    </div>
  );
}

export default AttributeName;
