import React from "react";

import { CartProduct } from "../../../../models/CartProduct";
import ChangeGoodAmountContainer from "../../containers/changeGoodAmountContainer";

import "./styles.css";

type Props = {
  product: CartProduct;
  price?: React.ReactNode;
  increaseCartItem: (item: CartProduct) => void;
  decreaseCartItem: (item: CartProduct) => void;
};

function CartItems(props: Props) {
  const { price, product, increaseCartItem, decreaseCartItem } = props;

  return (
    <div className="header-cartwindow-good">
      <div>
        <p className={"good__name_small"}>{product.name}</p>

        {Object.entries(product.values).map(([key, value]) => {
          return (
            <div key={product.id + "_" + key + "_" + value}>
              <p className="good__attribute_name">{key}:</p>

              <div
                key={product.id + key + value}
                style={{
                  background: value,
                  color: value,
                  border: `10px solid ${value}`,
                  boxShadow: "0 0 4px 0 rgba(50, 50, 50, 1)",
                }}
                className={`good__attribute_value good__attribute_selected`}
              >
                {CSS.supports("color", value) ? "" : value}
              </div>
            </div>
          );
        })}
        {price}
      </div>

      <ChangeGoodAmountContainer
        good={product}
        increaseCartItem={increaseCartItem}
        decreaseCartItem={decreaseCartItem}
      />

      <img className="good__img" src={product.gallery[0]} alt="Good" />
    </div>
  );
}

export default CartItems;
