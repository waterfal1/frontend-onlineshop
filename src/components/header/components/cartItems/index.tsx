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
    <>
      <div className="cart-goods-container">
        <div className="goods-description">
          <p className={"cart-window-name"}>{product.name}</p>
          <p className={"cart-window-name"}>{product.id}</p>

          {Object.entries(product.values).map(([key, value]) => {
            return (
              <div
                key={product.id + "_" + key + "_" + value}
                className="attributes-columns"
              >
                <p className="goods-attribute"> {key}:</p>

                <div className="goods-attribute-row">
                  <div
                    key={product.id + key + value}
                    style={{
                      background: value,
                      color: value,
                      border: `30px solid ${value}`,
                      boxShadow: "0 0 4px 0 rgba(50, 50, 50, 1)",
                    }}
                    className={`goods-attribute-box goods-selected pointer`}
                  >
                    {value}
                  </div>
                </div>
              </div>
            );
          })}
          {price}
        </div>
      </div>

      <ChangeGoodAmountContainer
        good={product}
        increaseCartItem={increaseCartItem}
        decreaseCartItem={decreaseCartItem}
      />
    </>
  );
}

export default CartItems;
