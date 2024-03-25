import React from "react";

import { CartProduct } from "../../../models/CartProduct";
import { NavLink } from "react-router-dom";
import { CurrencyReConverter } from "../../../utils/currencyEnum";

import "./styles.css";

type Props = {
  cartItems: CartProduct[];
  currentCurrency: string;
  setPreviousImage: (item: CartProduct) => void;
  setNextImage: (item: CartProduct) => void;
  setProductAmountUp: (item: CartProduct) => void;
  setProductAmountDown: (item: CartProduct) => void;
  selectAttributeHandler: (
    item: CartProduct,
    attribute: string,
    value: string,
    displayValue: string
  ) => void;
};

function Cart(props: Props) {
  const {
    cartItems,
    currentCurrency,
    setPreviousImage,
    setNextImage,
    setProductAmountDown,
    setProductAmountUp,
    selectAttributeHandler,
  } = props;

  return (
    <section>
      {cartItems.length === 0 ? (
        <h1 className="cart-name">You cart is empty</h1>
      ) : (
        cartItems.map((item: CartProduct, index: number) => {
          return (
            <div
              key={item.id + Object.entries(item.values)}
              className="cart-common-container"
            >
              <div className="cart-goods-container">
                <NavLink to={`/${item.category}/${item.id}`}>
                  <p className="cart-first-text">{item.name}</p>
                  <p className="cart-first-text weight-normal">{item.id}</p>
                  <p className="cart-goods-padding">
                    {CurrencyReConverter[currentCurrency]}
                    {item.prices[currentCurrency]}
                  </p>
                </NavLink>

                {Object.entries(item.attributes).map(
                  ([attribute, attrValue]) => {
                    return (
                      <div
                        key={
                          attribute + attrValue + Object.entries(item.values)
                        }
                        className="attributes-columns"
                      >
                        <p className="cart-goods-attribute">{attribute}:</p>
                        <div className="cart-attribute-row">
                          {attrValue.map((val) => {
                            return (
                              <div
                                key={
                                  val.id +
                                  val.value +
                                  Object.entries(item.values) +
                                  Math.random()
                                }
                                style={{
                                  background: CSS.supports(
                                    "color",
                                    val.displayValue
                                  )
                                    ? val.displayValue
                                    : val.value,
                                  color: CSS.supports("color", val.displayValue)
                                    ? val.displayValue
                                    : val.value,
                                  border: `30px solid ${
                                    CSS.supports("color", val.displayValue)
                                      ? val.displayValue
                                      : val.value
                                  }`,
                                  boxShadow: "0 0 4px 0 rgba(50, 50, 50, 1)",
                                }}
                                onClick={() =>
                                  selectAttributeHandler(
                                    item,
                                    attribute,
                                    val.value,
                                    val.displayValue
                                  )
                                }
                                className={`cart-box ${
                                  item.values[attribute] === val.displayValue ||
                                  item.values[attribute] === val.value
                                    ? "cart-selected"
                                    : ""
                                } pointer`}
                              >
                                {val.displayValue}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              <div className="cart-center-flex-element">
                <button
                  onClick={() => setProductAmountUp(item)}
                  className="cart-window-counter-btn"
                >
                  +
                </button>
                {item.quantity}
                <button
                  onClick={() => setProductAmountDown(item)}
                  className="cart-window-counter-btn"
                >
                  -
                </button>
              </div>

              <div className="cart-third-flex-element">
                <img
                  className="cart-small-img"
                  src={item.photo[item.activeImageIndx]}
                  alt="picture1"
                />
                <div
                  onClick={() => setPreviousImage(item)}
                  className="arrow-rev arrow-left-rev pointer"
                />
                <div
                  onClick={() => setNextImage(item)}
                  className="arrow-rev arrow-right-rev pointer"
                />
              </div>
            </div>
          );
        })
      )}
    </section>
  );
}

export default Cart;
