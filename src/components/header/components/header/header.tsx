import React, { Dispatch, SetStateAction } from "react";
import { Link, Outlet } from "react-router-dom";

import logo from "../../../../assets/a-logo.svg";
import cartTop from "../../../../assets/cartTop.svg";
import { CartProduct } from "../../../../models/CartProduct";
import { Product } from "../../../../models/Product";
import CountCost from "../../../../services/countCost";
import { CurrencyReConverter } from "../../../../utils/currencyEnum";
import { CustomLink } from "../../../customLink";
import PriceComponent from "../../../sharedComponents/price";
import CartItemsContainer from "../../containers/cartItemsContainer";

import "./styles.css";

type Props = {
  cartItems: CartProduct[];
  isCartOpen: Boolean;
  isCurrencyOpen: Boolean;
  currentCurrency: string;
  products: Product[];
  cartVisibilityHandler: () => void;
  changeCurrency: (index: string) => void;
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
    currencyVisibility,
    navbarLinks,
    setCartItems,
    updateCartItems,
  } = props;
  return (
    <>
      <header>
        {isCartOpen ? (
          <div onClick={cartVisibilityHandler} className="header__darkTheme" />
        ) : null}
        <nav className="header">
          <ul>
            {navbarLinks()}
            <CustomLink to={`/cart`}>CART</CustomLink>
          </ul>
          <div className="header-centerContent">
            <Link to="/">
              <img src={logo} alt="Home" />
            </Link>
          </div>
          <div className="header-rightContent">
            <div className="header-rightContent-currency">
              <div className="currency" onClick={currencyVisibility}>
                {CurrencyReConverter[currentCurrency]}
                <div className={`arrow ${isCurrencyOpen ? "down" : "up"}`} />
              </div>

              <div
                className={`currency__list ${
                  isCurrencyOpen && "currency__list_active"
                }`}
              >
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
            </div>
            <div className="header-cartIcon">
              <img onClick={cartVisibilityHandler} src={cartTop} alt="Cart" />
              {cartItems.length > 0 ? (
                <div className="header-cartIcon__number">
                  {cartItems.length}
                </div>
              ) : null}
            </div>

            <div
              className={`header-cartWindow ${
                isCartOpen && "header-cartWindow_active"
              }`}
            >
              <p className="header-cartWindow-title">
                <strong>My Bag,</strong> {cartItems.length} items
              </p>

              {cartItems.map((item: CartProduct, index) => {
                return (
                  <CartItemsContainer
                    product={item}
                    key={item.id + "_" + index}
                    price={<PriceComponent prices={item.prices} />}
                    setCartItems={setCartItems}
                  />
                );
              })}

              <div className="header-cartWindow__totalCost">
                <p>Total</p>
                <p>{CountCost(currentCurrency)}</p>
              </div>
              <div className="header-cartWindow-buttons">
                <Link to="/cart">
                  <button
                    onClick={cartVisibilityHandler}
                    className="header-cartWindow-buttons__viewBag "
                  >
                    VIEW BAG
                  </button>
                </Link>
                <button className="header-cartWindow-buttons__checkout">
                  {" "}
                  CHECK OUT
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <Outlet context={{ updateCartItems }} />
    </>
  );
}

export default Header;
