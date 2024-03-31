import { useQuery } from "@apollo/client";
import React from "react";

import { Price } from "../../../models/Price";
import { GET_LOCAL_CURRENCY } from "../../../operations/queries";
import { CurrencyReConverter } from "../../../utils/currencyEnum";

import "./styles.css";

type Props = {
  prices: Price[];
};

function PriceComponent(props: Props) {
  const { prices } = props;
  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);

  return (
    <p className="price">
      Price:{" "}
      {CurrencyReConverter[currentCurrency.data.currency] +
        prices.find(
          (el: Price) => el.currency === currentCurrency.data.currency
        )?.amount}
    </p>
  );
}

export default PriceComponent;
