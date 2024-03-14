import React from "react";
import { Link, Outlet, useMatch } from "react-router-dom";
import { useQuery } from "@apollo/client";
import logo from "../../../assets/a-logo.svg";
import cart from "../../../assets/cart.svg";
import { GET_PARTIAL_CATEGORY_DATA } from "../../../api/apiRequests";
import { Product } from "../../../models/Product";
import { useCallback, useRef, useState } from "react";
import {
  GET_LOCAL_CATEGORY,
  GET_LOCAL_CURRENCY,
  GET_LOCAL_GOODS,
  GET_LOCAL_SELECTED_GOOD_ID,
} from "../../../operations/queries";
import { mutations } from "../../../operations/mutations";
import { CustomLink } from "../../customLink.tsx";
import {
  CurrencyConverter,
  CurrencyReConverter,
} from "../../../utils/currencyEnum";

import "./styles.css";
import HeaderCurrencies from "../components/currencies2";
import CartWindowBag from "../components/cartWindowBag";
import GoodsAttributes from "../components/goodsAttributes";
import TotalCost from "../components/totalCost";
import Buttons from "../components/buttons";

function HeaderContainer() {
  const { data, loading, error } = useQuery(GET_PARTIAL_CATEGORY_DATA);
  const currentCategory = useQuery(GET_LOCAL_CATEGORY);
  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);
  const selectedGoodId = useQuery(GET_LOCAL_SELECTED_GOOD_ID);
  const cartGoods = useQuery(GET_LOCAL_GOODS);

  const [cartBar, setCartBar] = useState(false);
  const [cartWindowClose, setCartWindowClose] = useState(false);
  const wrapperRef = useRef(null);

  const { setCurrency, setGoodId } = mutations;

  // console.log(data, "dataaa");

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

  const toggleCartBar = useCallback(() => {
    if (!cartWindowClose) {
      setCartWindowClose(true);
      setCartBar(false);
    } else setCartWindowClose(false);
  }, [cartWindowClose]);

  const toggleCartWindow = useCallback((): void => {
    setCartWindowClose(false);
    setCartBar(false);
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
              src={cart}
              alt="Cart"
            />
            {cartGoods.data.products.length > 0 ? (
              <div className="number">{cartGoods.data.products.length}</div>
            ) : null}

            {cartWindowClose && (
              <div className="cart-window">
                {<CartWindowBag amount={0} />}
                {/* <GoodsAttributes
                // attributeSelected={attributeSelected}
                // goodsAmount={goodsAmount}
                // setAmountUp={this.setAmountUp}
                // setAmountDown={this.setAmountDown}
                // stateCurrency={stateCurrency}
                // productsIndexes={productsIndexes}
                // products={products}
                /> */}
                <div key={goodsNumber} className="cart-window-container">
                  <div className="window-first-container">
                    <GoodsNameAndCost
                      product={products[productIndex]}
                      stateCurrency={stateCurrency}
                    />
                    <div className="cart-window-attribute-row">
                      <div key={index}>
                        {element.name}
                        {element.items.map(
                          (
                            item: { value: string; displayValue: string },
                            attributeNumber: number
                          ) => {
                            // @ts-ignore
                            if (
                              goodsAmount[goodsNumber][1][0][index] ==
                              attributeNumber
                            )
                              return (
                                <Attributes
                                  key={attributeNumber}
                                  attributeSelected={() =>
                                    attributeSelected(attributeNumber)
                                  }
                                  value={item.value}
                                />
                              );
                            return null;
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  <PlusMinusButtons
                    setAmountUp={setAmountUp}
                    setAmountDown={setAmountDown}
                    goodsAmount={goodsAmount}
                    goodsNumber={goodsNumber}
                  />
                  <GoodsImage product={products[productIndex]} />
                </div>
                <TotalCost totalCost={"10000"} />
                <Buttons toggleCartWindow={toggleCartWindow} />
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
