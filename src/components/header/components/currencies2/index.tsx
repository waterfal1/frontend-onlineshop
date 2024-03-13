import React from "react";

type Props = {
  currencies: { __typename: string; currency: string; amount: string }[];
  handleCurrency: (input: string) => void;
};

function HeaderCurrencies(props: Props) {
  const { currencies, handleCurrency } = props;
  const currenciesRender = () => {
    const currenciesSigns = [
      <>&#36;</>,
      <>&#163;</>,
      <>&#36;</>,
      <>&#165;</>,
      <>&#8381;</>,
    ];
    return currencies.map((currency: { currency: string }, index: number) => (
      <div key={index} onClick={() => handleCurrency(String(index))}>
        <span id={String(index)}>{currenciesSigns[index]}</span>
        {currency.currency}
      </div>
    ));
  };

  return <div className="currency-list">{currenciesRender()}</div>;
}

export default HeaderCurrencies;
