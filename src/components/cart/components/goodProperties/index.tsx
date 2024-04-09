import React from "react";
import { NavLink } from "react-router-dom";

import { AttributeItem } from "../../../../models/AttributeItem";
import { CartProduct } from "../../../../models/CartProduct";
import ChangeGoodAmountContainer from "../../../sharedComponents/changeGoodAmount";

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
      <div className="good-properties">
        <NavLink to={`/${product.category}/${product.id}`}>
          <p className={"good__name"}>{product.name}</p>
          <p className={"good__name_normal"}>{product.id}</p>
        </NavLink>

        {Object.entries(product.attributes).map(([key, value]) => {
          return (
            <div key={product.id + "_" + key + "_" + value}>
              <p className="good__name_normal"> {key}:</p>

              <div className="good-attribute">
                {value.map((item) => {
                  return (
                    <div
                      key={item.id + item.value}
                      style={{
                        background: item.value,
                        color: item.value,
                        border: `20px solid ${item.value}`,
                        boxShadow: "0 0 4px 0 rgba(50, 50, 50, 1)",
                      }}
                      onClick={() => selectAttribute(product, key, item)}
                      className={`good-attribute__item ${
                        product.values[key] === item.displayValue ||
                        product.values[key] === item.value
                          ? "good-attribute__item_selected"
                          : ""
                      }`}
                    >
                      {CSS.supports("color", item.value) ? "" : item.value}
                    </div>
                  );
                })}
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
    </>
  );
}

export default GoodProperties;
