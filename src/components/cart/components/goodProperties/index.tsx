import React from "react";
import { NavLink } from "react-router-dom";

import { AttributeItem } from "../../../../models/AttributeItem";
import { CartProduct } from "../../../../models/CartProduct";
import GoodAmountContainer from "../../containers/GoodAmountContainer";

import "./styles.css";

type Props = {
  product: CartProduct;
  price?: React.ReactNode;
  increaseCartItem: (item: CartProduct) => void;
  decreaseCartItem: (item: CartProduct) => void;
  selectAttribute: (
    item: CartProduct,
    attribute: string,
    value: AttributeItem
  ) => void;
};

function GoodProperties(props: Props) {
  const {
    price,
    product,
    increaseCartItem,
    decreaseCartItem,
    selectAttribute,
  } = props;

  return (
    <>
      <div className="cart-goods-container">
        <div className="goods-description">
          <NavLink to={`/${product.category}/${product.id}`}>
            <p className={"goods-name"}>{product.name}</p>
            <p className={"goods-name weight-normal"}>{product.id}</p>
          </NavLink>

          {Object.entries(product.attributes).map(([key, value]) => {
            return (
              <div
                key={product.id + "_" + key + "_" + value}
                className="attributes-columns"
              >
                <p className="goods-attribute"> {key}:</p>

                <div className="goods-attribute-row">
                  {value.map((item, index) => {
                    return (
                      <div
                        key={item.id + item.value}
                        style={{
                          background: item.value,
                          color: item.value,
                          border: `30px solid ${item.value}`,
                          boxShadow: "0 0 4px 0 rgba(50, 50, 50, 1)",
                        }}
                        onClick={() => selectAttribute(product, key, item)}
                        className={`goods-attribute-box ${
                          product.values[key] === item.displayValue ||
                          product.values[key] === item.value
                            ? "goods-selected"
                            : ""
                        } pointer`}
                      >
                        {item.value}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {price}
        </div>
      </div>

      <GoodAmountContainer
        good={product}
        increaseCartItem={increaseCartItem}
        decreaseCartItem={decreaseCartItem}
      />
    </>
  );
}

export default GoodProperties;
