import { Link, NavLink, Outlet } from "react-router-dom";
import "./styles.css";
import { useQuery } from "@apollo/client";
import logo from "../../../assets/a-logo.svg";
import { GET_PARTIAL_CATEGORY_DATA } from "../../../api/apiRequests";
import { GoodId } from "../../../models/SelectedGood";
import { Good } from "../../../models/Good";
import { ReactNode, useCallback, useRef, useState } from "react";
import {
  GET_LOCAL_CATEGORY,
  GET_LOCAL_CURRENCY,
  GET_LOCAL_GOODS,
  GET_LOCAL_SELECTED_GOOD_ID,
} from "../../../operations/queries";
import { mutations } from "../../../operations/mutations";
import CurrenciesAndCart from "../components/currencies";
import { CustomLink } from "../../customLink.tsx";
import { CurrencyConverter } from "../../../utils/currencyEnum";

function HeaderContainer() {
  const { data, loading, error } = useQuery(GET_PARTIAL_CATEGORY_DATA);
  const currentCategory = useQuery(GET_LOCAL_CATEGORY);
  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);
  const selectedGoodId = useQuery(GET_LOCAL_SELECTED_GOOD_ID);
  const cartGoods = useQuery(GET_LOCAL_GOODS);
  console.log(cartGoods, currentCategory, currentCurrency, "qqqq");
  const [cartBar, setCartBar] = useState(false);
  const [cartWindowClose, setCartWindowClose] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  const wrapperRef = useRef(null);

  const { setCategory, setCurrency, setGoodId } = mutations;

  console.log(data, "dataaa");

  const handleClickOutside = (event: { target: any }): void => {
    if (wrapperRef.current === null) {
      return;
    }
    if (wrapperRef) {
      setCartBar(false);
      setCartWindowClose(false);
    }
  };

  const navbarLinks = useCallback(() => {
    const categories = [
      ...new Set(data.category.products.map((good: Good) => good.category)),
    ] as string[];

    return categories.map((category: string) => {
      return (
        <CustomLink key={category} to={`/${category}`}>
          {category.toUpperCase()}
        </CustomLink>
      );
    });
  }, [data]);

  const backButton = useCallback((): void => {
    setCategory({ category: "All" });
  }, []);

  const handleCurrency = (index: string): void => {
    setCurrency({ currency: CurrencyConverter[index] });
    const currency = document.getElementById(index);
    if (currency === null) {
      return;
    }
    setCartBar(false);
    setCurrency({ currency: CurrencyConverter[currency.innerHTML] });
    sessionStorage.setItem("Currency", currency.innerHTML);
  };

  const changeCurrency = useCallback((): void => {
    if (!cartBar) {
      setCartBar(true);
      setCartWindowClose(false);
    } else setCartBar(false);
  }, [cartBar]);

  const toggleCartBar = () => {
    if (!cartWindowClose) {
      setCartWindowClose(true);
      setCartBar(false);
    } else setCartWindowClose(false);
  };

  const toggleCartWindow = useCallback((): void => {
    setCartWindowClose(false);
    setCartBar(false);
  }, []);

  if (loading) return "Loading....";

  return (
    <>
      <header>
        {cartWindowClose ? (
          <div onClick={toggleCartWindow} className="dark-side" />
        ) : null}
        <nav className="header_bar">
          <ul className="nav-list">{navbarLinks()}</ul>
          <Link to="/">
            <img onClick={backButton} src={logo} alt="Back Button" />
          </Link>
          <div ref={wrapperRef} className="currency-icons">
            <CurrenciesAndCart
              changeCurrency={changeCurrency}
              cartWindowClose={cartWindowClose}
              currencies={data.category.products[0].prices}
              goodsAmount={cartGoods.data.goods.length}
              currentCurrency={currentCurrency.data.currency}
              handleCurrency={handleCurrency}
              setCurrency={setCurrency}
              setGoods={setGoodId}
              toggleCartBar={toggleCartBar}
              stateSelectedItem={selectedGoodId.data}
              toggleCartWindow={toggleCartWindow}
              cartBar={cartBar}
            />
          </div>
        </nav>
        <div className="category-name">
          {currentCategory.data.category.category}
        </div>
      </header>

      <Outlet />
    </>
  );
}

export default HeaderContainer;
