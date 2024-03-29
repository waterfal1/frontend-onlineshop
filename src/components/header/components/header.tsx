import React, { Dispatch, SetStateAction } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

import logo from "../../../assets/a-logo.svg";
import cartTop from "../../../assets/cartTop.svg";
import { CustomLink } from "../../customLink";
import { CurrencyReConverter } from "../../../utils/currencyEnum";
import { CartProduct } from "../../../models/CartProduct";
import { Product } from "../../../models/Product";
import SelectPropertiesContainer from "../../sharedComponents/selectProperties/containers/selectPropertiesContainer";
import PriceComponent from "../../sharedComponents/price";

import "./styles.css";

type Props = {
  cartItems: CartProduct[];
  isCartOpen: Boolean;
  isCurrencyOpen: Boolean;
  currentCurrency: string;
  products: Product[];
  cartVisibilityHandler: () => void;
  changeCurrency: (index: string) => void;
  countCost: () => string;
  currencyVisibility: () => void;
  navbarLinks: () => React.ReactNode;
  setCartItems: Dispatch<SetStateAction<CartProduct[]>>;
  updateCartItems: () => void;
};

function Header(props: Props) {
  const {
    currentCurrency,
    cartItems,
    isCartOpen,
    isCurrencyOpen,
    products,
    cartVisibilityHandler,
    changeCurrency,
    countCost,
    currencyVisibility,
    navbarLinks,
    setCartItems,
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
                        key={Math.random()}
                        className="cart-window-container"
                      >
                        <div className="window-first-container">
                          <SelectPropertiesContainer
                            product={item}
                            isSelectAvailable={false}
                            isAddToCartAvailable={false}
                            price={<PriceComponent prices={item.prices} />}
                            setCartItems={setCartItems}
                          />
                        </div>
                        <div className="cart-window-last-flex-element">
                          <img
                            className="cart-window-img"
                            src={item.gallery[0]}
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
                  <Link to="/cart">
                    <button
                      onClick={cartVisibilityHandler}
                      className="cart-window-view-btn"
                    >
                      {" "}
                      VIEW BAG
                    </button>
                  </Link>
                  <button className="cart-window-checkout-btn">
                    {" "}
                    CHECK OUT
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>

      <Outlet context={{ updateCartItems }} />
    </>
  );
}

export default Header;
