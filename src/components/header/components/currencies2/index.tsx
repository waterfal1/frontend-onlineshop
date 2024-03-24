import React from "react";
import { CurrencyReConverter } from "../../../../utils/currencyEnum";

type Props = {
  currencies: { __typename: string; currency: string; amount: string }[];
  handleCurrency: (input: string) => void;
};

function HeaderCurrencies(props: Props) {
  const { currencies, handleCurrency } = props;
  const currenciesRender = () => {
    console.log(currencies, "currenciess");
    return currencies.map((currency: { currency: string }, index: number) => (
      <div key={index} onClick={() => handleCurrency(String(index))}>
        <span id={String(index)}>{CurrencyReConverter[currency.currency]}</span>
        {currency.currency}
      </div>
    ));
  };

  return <div className="currency-list">{currenciesRender()}</div>;
}

export default HeaderCurrencies;
