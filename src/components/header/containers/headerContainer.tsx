import React, { useEffect } from "react";
import _ from "lodash";
import { Link, NavLink, Outlet, useMatch } from "react-router-dom";
import { useQuery } from "@apollo/client";
import logo from "../../../assets/a-logo.svg";
import cartTop from "../../../assets/cartTop.svg";
import { GET_PARTIAL_CATEGORY_DATA } from "../../../api/apiRequests";
import { Product } from "../../../models/Product";
import { useCallback, useRef, useState } from "react";
import {
  GET_LOCAL_CATEGORY,
  GET_LOCAL_CURRENCY,
} from "../../../operations/queries";
import { mutations } from "../../../operations/mutations";
import { CustomLink } from "../../customLink.tsx";
import {
  CurrencyConverter,
  CurrencyReConverter,
} from "../../../utils/currencyEnum";

import HeaderCurrencies from "../components/currencies2";
import { cartService } from "../../../businessLayer";
import { CartProduct } from "../../../models/CartProduct";
import { cartProductMapper } from "../../home/mappers";

import "./styles.css";

function HeaderContainer() {
  const { data, loading, error } = useQuery(GET_PARTIAL_CATEGORY_DATA);
  const currentCategory = useQuery(GET_LOCAL_CATEGORY);
  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);

  const [cartBar, setCartBar] = useState(false);
  const [cartWindowClose, setCartWindowClose] = useState(false);
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  console.log(cartItems, "cartItems");
  const wrapperRef = useRef(null);

  const { setCurrency } = mutations;
  const match = useMatch({ path: "/", end: true });

  const navbarLinks = useCallback(() => {
    const categories = [
      ...new Set(
        data.category.products.map((product: Product) => product.category)
      ),
    ] as string[];

    return categories.map((category: string) => {
      return (
        <CustomLink key={category} to={`/${category}`}>
          {category.toUpperCase()}
        </CustomLink>
      );
    });
  }, [data]);

  const handleCurrency = (index: string): void => {
    setCurrency({ currency: CurrencyConverter[index] });
    const currency = document.getElementById(index);
    if (currency === null) return;

    setCartBar(false);
    setCurrency({ currency: CurrencyConverter[currency.innerHTML] });
  };

  const changeCurrency = useCallback((): void => {
    if (!cartBar) {
      setCartBar(true);
      setCartWindowClose(false);
    } else setCartBar(false);
  }, [cartBar]);

  // const updateCart = useCallback((item: Product) => {
  //   const cartProduct = cartProductMapper(item);
  //   setCartItems((state) => {
  //     const newCartItemsState = [...state];
  //     const existingProductIndex = newCartItemsState.findIndex(
  //       (e) => _.isEqual(e.values, cartProduct.values)
  //     );

  //     if (existingProductIndex !== -1) {
  //       newCartItemsState[existingProductIndex] = cartProduct;
  //     } else {
  //       newCartItemsState.push(cartProduct);
  //     }

  //     return newCartItemsState;
  //   });
  // }, []);

  useEffect(() => {
    const cart = cartService.get();
    if (cart) setCartItems(cart);
  }, []);

  const toggleCartBar = useCallback(() => {
    if (!cartWindowClose) {
      setCartWindowClose(true);
      const cart = cartService.get();
      if (cart) setCartItems(cart);
      setCartBar(false);
    } else setCartWindowClose(false);
  }, [cartWindowClose]);

  const toggleCartWindow = useCallback((): void => {
    setCartWindowClose(false);
    setCartBar(false);
  }, []);

  const countCost = useCallback(() => {
    return cartService.totalCost(currentCurrency.data.currency.currency);
  }, [currentCurrency.data]);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <>Error {error.toString()}</>;

  return (
    <>
      <header>
        {cartWindowClose ? (
          <div onClick={toggleCartWindow} className="dark-side" />
        ) : null}
        <nav className="header_bar">
          <ul className="nav-list">{navbarLinks()}</ul>
          <Link to="/">
            <img src={logo} alt="Home" />
          </Link>
          <div ref={wrapperRef} className="currency-icons">
            <div className="column-container">
              <div className="currency-container" onClick={changeCurrency}>
                {CurrencyReConverter[currentCurrency.data.currency.currency] +
                  " " +
                  currentCurrency.data.currency.currency}
                <div className="arrow-down" />
              </div>
              {cartBar && (
                <HeaderCurrencies
                  currencies={data.category.products[0].prices}
                  handleCurrency={handleCurrency}
                />
              )}
            </div>
            <img
              onClick={toggleCartBar}
              className="a-number-of"
              src={cartTop}
              alt="Cart"
            />
            {cartItems.length > 0 ? (
              <div className="number">{cartItems.length}</div>
            ) : null}
            {cartWindowClose && (
              <div className="cart-window">
                <p className="cart-window-bag">
                  <strong>My Bag,</strong>
                  {cartItems.length} items
                </p>
                {cartItems &&
                  cartItems.map((item: CartProduct) => {
                    return (
                      <div
                        key={
                          item.id + JSON.stringify(item.values) + Math.random()
                        }
                        className="cart-window-container"
                      >
                        <div className="window-first-container">
                          <p className="cart-window-name">{item.name}</p>
                          <p className="cart-window-name">{item.id}</p>
                          <p className="goods-cost">
                            {
                              CurrencyReConverter[
                                currentCurrency.data.currency.currency
                              ]
                            }
                            {
                              item.prices[
                                currentCurrency.data.currency.currency
                              ]
                            }
                          </p>
                          <div className="cart-window-attribute-row">
                            {Object.entries(item.values).map(
                              ([key, value], attrIndex) => {
                                return (
                                  <React.Fragment
                                    key={key + value + Math.random()}
                                  >
                                    <div
                                      style={{
                                        background: value,
                                        color: value,
                                      }}
                                      className="cart-window-attributes"
                                    >
                                      {key}:
                                    </div>
                                    <div
                                      key={key + value}
                                      style={{
                                        background: value,
                                        color: value,
                                      }}
                                      className="cart-window-attributes"
                                    >
                                      {value}
                                    </div>
                                  </React.Fragment>
                                );
                              }
                            )}
                          </div>
                        </div>
                        <div className="cart-window-center-flex-element">
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
                        <div className="cart-window-last-flex-element">
                          <img
                            className="cart-window-img"
                            src={item.photo[0]}
                            alt="picture1"
                          />
                        </div>
                      </div>
                    );
                  })}

                <div className="cart-window-total-cost">
                  <p>Total</p>
                  <p>{countCost()}</p>
                </div>
                <div className="cart-window-buttons">
                  <NavLink to="/cart">
                    <button
                      onClick={toggleCartWindow}
                      className="cart-window-view-btn"
                    >
                      {" "}
                      VIEW BAG
                    </button>
                  </NavLink>
                  <button className="cart-window-checkout-btn">
                    {" "}
                    CHECK OUT
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
        <div className="category-name">
          {match && currentCategory.data.category.category}
        </div>
      </header>

      <Outlet />
    </>
  );
}



export default HeaderContainer;
