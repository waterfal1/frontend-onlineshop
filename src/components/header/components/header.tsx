import React from "react";
import { Link, NavLink, Outlet, PathMatch } from "react-router-dom";

import logo from "../../../assets/a-logo.svg";
import cartTop from "../../../assets/cartTop.svg";
import { CustomLink } from "../../customLink";
import { CurrencyReConverter } from "../../../utils/currencyEnum";
import { CartProduct } from "../../../models/CartProduct";
import { Product } from "../../../models/Product";

import "./styles.css";

type Props = {
  categoryName: string;
  cartItems: CartProduct[];
  isCartOpen: Boolean;
  isCurrencyOpen: Boolean;
  isHomeRoute: PathMatch<string>;
  currentCurrency: string;
  products: Product[];
  cartVisibilityHandler: () => void;
  changeCurrency: (index: string) => void;
  countCost: () => string;
  currencyVisibility: () => void;
  navbarLinks: () => React.ReactNode;
  setProductAmountUp: (item: CartProduct) => void;
  setProductAmountDown: (item: CartProduct) => void;
  updateCartItems: () => void;
};

function Header(props: Props) {
  const {
    categoryName,
    currentCurrency,
    isHomeRoute,
    cartItems,
    isCartOpen,
    isCurrencyOpen,
    products,
    cartVisibilityHandler,
    changeCurrency,
    countCost,
    currencyVisibility,
    navbarLinks,
    setProductAmountUp,
    setProductAmountDown,
    updateCartItems,
  } = props;
  return (
    <>
      <header>
        {isCartOpen ? (
          <div onClick={cartVisibilityHandler} className="dark-side" />
        ) : null}
        <nav className="header_bar">
          <ul className="nav-list">
            {navbarLinks()}
            <CustomLink to={`/cart`}>CART</CustomLink>
          </ul>
          <Link to="/">
            <img src={logo} alt="Home" />
          </Link>
          <div className="currency-icons">
            <div className="column-container">
              <div className="currency-container" onClick={currencyVisibility}>
                {CurrencyReConverter[currentCurrency]}
                <div className="arrow-down" />
              </div>

              {isCurrencyOpen && (
                <div className="currency-list">
                  {products[0].prices.map(
                    (currency: { currency: string }, index: number) => (
                      <div
                        key={index}
                        onClick={() => changeCurrency(String(index))}
                      >
                        <span id={String(index)}>
                          {CurrencyReConverter[currency.currency]}
                        </span>
                        {currency.currency}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
            <img
              onClick={cartVisibilityHandler}
              className="a-number-of"
              src={cartTop}
              alt="Cart"
            />
            {cartItems.length > 0 ? (
              <div className="number">{cartItems.length}</div>
            ) : null}
            {isCartOpen && (
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
                            {CurrencyReConverter[currentCurrency]}
                            {item.prices[currentCurrency]}
                          </p>
                          <div className="cart-window-attribute-row">
                            {Object.entries(item.values).map(([key, value]) => {
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
                            })}
                          </div>
                        </div>
                        <div className="cart-window-center-flex-element">
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
                      onClick={cartVisibilityHandler}
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
          {categoryName ? categoryName.toUpperCase() : isHomeRoute && "All"}
        </div>
      </header>

      <Outlet context={{ updateCartItems }} />
    </>
  );
}

export default Header;
