import { ReactiveVar } from "@apollo/client";
import { currencyVar, updateCurrencyVar } from "../../cache";

function setCurrency(currencyVar: ReactiveVar<string>) {
  return (currency: string) => {
    updateCurrencyVar(currency);
  };
}

export const mutations = {
  setCurrency: setCurrency(currencyVar),
};
