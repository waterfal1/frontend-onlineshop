import React, { useCallback, useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import { GET_LOCAL_CURRENCY } from "../../../operations/queries";
import { CartProduct } from "../../../models/CartProduct";
import { cartService } from "../../../businessLayer";
import _ from "lodash";

import "./styles.css";
import { NavLink } from "react-router-dom";
import { CurrencyConverter } from "../../../utils/currencyEnum";

function Cart() {
  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  useEffect(() => {
    const cart = cartService.get();
    if (cart) setCartItems(cart);
  }, []);

  const setAmountUp = useCallback((item: CartProduct): void => {
    const cartItem = cartService.getItem(item);
    cartItem.quantity++;
    cartService.update(cartItem);
    setCartItems((state) => {
      return state.map((cartItem: CartProduct) => {
        if (
          cartItem.id === item.id &&
          _.isEqual(item.values, cartItem.values)
        ) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
    });
  }, []);

  const setAmountDown = useCallback((item: CartProduct): void => {
    const cartItem = cartService.getItem(item);
    cartItem.quantity = Math.max(--cartItem.quantity, 0);
    cartService.update(cartItem);
    setCartItems((state) => {
      const updatedCartItems = state.map((cartItem: CartProduct) => {
        if (
          cartItem.id === item.id &&
          _.isEqual(item.values, cartItem.values)
        ) {
          const newQuantity = Math.max(cartItem.quantity - 1, 0);
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });

      const filteredCartItems = updatedCartItems.filter(
        (cartItem: CartProduct) => cartItem.quantity > 0
      );

      return filteredCartItems;
    });
  }, []);

  const countCost = useCallback(() => {
    return cartService.totalCost(currentCurrency.data.currency.currency);
  }, [currentCurrency.data]);

  // {Object.entries(item.values).map(
  //   ([key, value], attrIndex) => {
  //     return (
  //       <>
  //         <div
  //           key={key + value}
  //           style={{
  //             background: value,
  //             color: value,
  //           }}
  //           className="cart-window-attributes"
  //         >
  //           {key}:
  //         </div>
  //         <div
  //           key={key + value}
  //           style={{
  //             background: value,
  //             color: value,
  //           }}
  //           className="cart-window-attributes"
  //         >
  //           {value}
  //         </div>
  //       </>
  //     );
  //   }
  // )}
  console.log(cartItems, "cartItems2");

  return (
    <section>
      <h1 className="cart-name">Cart</h1>
      {!cartItems ? (
        <div className="cart-name">You cart is empty</div>
      ) : (
        cartItems.map((item: CartProduct) => {
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
                    {CurrencyConverter[currentCurrency.data.currency.currency]}
                    {item.prices[currentCurrency.data.currency.currency]}
                  </p>
                </NavLink>

                {Object.entries(item.attributes).map(
                  ([attribute, attrValue]) => {
                    console.log(attribute, attrValue, "eeeend");
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
                                onClick={() => attributeSelected}
                                className={`cart-box ${
                                  item.values[attribute] ===
                                  (val.displayValue || val.value)
                                    ? "cart-selected"
                                    : ""
                                } pointer`}
                              >
                                {/* item.values[attribute] === val.value */}
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
                  onClick={() => setAmountUp(item)}
                  className="cart-window-counter-btn"
                >
                  +
                </button>
                {item.quantity}
                <button
                  onClick={() => setAmountDown(item)}
                  className="cart-window-counter-btn"
                >
                  -
                </button>
              </div>

              <div className="cart-third-flex-element">
                <img
                  className="cart-small-img"
                  src={item.photo[0]}
                  alt="picture1"
                />
                <div
                  onClick={() => imageDown()}
                  className="arrow-rev arrow-left-rev pointer"
                />
                <div
                  onClick={() => imageUp()}
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
