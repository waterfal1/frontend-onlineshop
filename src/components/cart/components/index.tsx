import React, { useCallback, useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import _ from "lodash";
import { GET_LOCAL_CURRENCY } from "../../../operations/queries";
import { CartProduct } from "../../../models/CartProduct";
import { cartService } from "../../../businessLayer";
import { NavLink } from "react-router-dom";
import { CurrencyReConverter } from "../../../utils/currencyEnum";

import "./styles.css";

function Cart() {
  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const updateComponent = useCallback(() => {
    const cart = cartService.get();
    if (cart) setCartItems(cart);
  }, []);

  useEffect(() => {
    updateComponent();
  }, [updateComponent]);

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

  const selectAttributeHandler = useCallback(
    (
      item: CartProduct,
      attribute: string,
      value: string,
      displayValue: string
    ) => {
      const cartItem = cartService.getItem(item);
      if (cartItem) {
        cartItem.values[attribute] = value || displayValue;
        cartService.updateProperties(item, cartItem);
      }
      updateComponent();
    },
    [updateComponent]
  );

  const setNextImage = useCallback(
    (item: CartProduct, index: number) => {
      const cartItem = cartService.getItem(item);
      if (cartItem.activeImageIndx < cartItem.photo.length - 1) {
        cartItem.activeImageIndx++;
      } else {
        cartItem.activeImageIndx = 0;
      }
      cartService.update(cartItem);
      updateComponent();
    },
    [updateComponent]
  );

  const setPreviousImage = useCallback(
    (item: CartProduct, index: number) => {
      const cartItem = cartService.getItem(item);
      if (cartItem.activeImageIndx > 0) {
        cartItem.activeImageIndx--;
      } else {
        cartItem.activeImageIndx = cartItem.photo.length - 1;
      }
      cartService.update(cartItem);
      updateComponent();
    },
    [updateComponent]
  );

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
                    {
                      CurrencyReConverter[
                        currentCurrency.data.currency.currency
                      ]
                    }
                    {item.prices[currentCurrency.data.currency.currency]}
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
                  src={item.photo[item.activeImageIndx]}
                  alt="picture1"
                />
                <div
                  onClick={() => setPreviousImage(item, index)}
                  className="arrow-rev arrow-left-rev pointer"
                />
                <div
                  onClick={() => setNextImage(item, index)}
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
