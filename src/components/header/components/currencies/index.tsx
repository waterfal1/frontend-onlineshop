import React from "react";

import cart from "../../../../assets/cart.svg";
import CartMenu from "../cartMenu";
import { Currency } from "../../../../models/Currency";
import { GoodId } from "../../../../models/SelectedGood";
import HeaderCurrencies from "../currencies2";
import {
  CurrencyConverter,
  CurrencyReConverter,
} from "../../../../utils/currencyEnum";

type Props = {
  changeCurrency: () => void;
  cartWindowClose: boolean;
  currentCurrency: { currency: string };
  currencies: { __typename: string; currency: string; amount: string }[];
  handleCurrency: (index: string) => void;
  goodsAmount: number;
  toggleCartBar: () => void;
  toggleCartWindow: () => void;
  setCurrency: (currency: Currency) => void;
  stateSelectedItem: { selectedGoodId: number };
  setGoods: (value: GoodId) => void;
  cartBar: boolean;
};

function CurrenciesAndCart(props: Props) {
  const {
    cartBar,
    goodsAmount,
    currentCurrency,
    stateSelectedItem,
    cartWindowClose,
    currencies,
    toggleCartWindow,
    setCurrency,
    handleCurrency,
    setGoods,
    toggleCartBar,
    changeCurrency,
  } = props;

  const cartRendering = (
    cartWindowClose: boolean,
    toggleCartWindow: () => void
  ) => {
    if (cartWindowClose)
      return (
        <CartMenu
          toggleCartWindow={toggleCartWindow}
          stateCurrency={currentCurrency}
          setCurrency={setCurrency}
          stateSelectedItem={stateSelectedItem.selectedGoodId}
          setGoods={setGoods}
        />
      );
    return null;
  };

  return (
    <>
      <div className="column-container">
        <div className="currency-container" onClick={changeCurrency}>
          {CurrencyReConverter[currentCurrency.currency] +
            " " +
            currentCurrency.currency}
          <div className="arrow-down" />
        </div>
        {cartBar && (
          <HeaderCurrencies
            currencies={currencies}
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
      {goodsAmount > 0 ? <div className="number">{goodsAmount}</div> : null}
      {cartRendering(cartWindowClose, toggleCartWindow)}
    </>
  );
}

export default CurrenciesAndCart;
