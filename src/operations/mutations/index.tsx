import { ReactiveVar } from "@apollo/client";
import { Category } from "../../models/Category";
import { Currency } from "../../models/Currency";
import { GoodId } from "../../models/SelectedGood";
import { categoryVar, currencyVar, selectedGoodIdVar } from "../../cache";

function setCategory(categoryVar: ReactiveVar<Category>) {
  return (category: Category) => {
    categoryVar(category);
  };
}

function setCurrency(currencyVar: ReactiveVar<Currency>) {
  return (currency: Currency) => {
    currencyVar(currency);
  };
}

function setGoodId(selectedGoodIdVar: ReactiveVar<GoodId>) {
  return () => {
    const good = selectedGoodIdVar();
    selectedGoodIdVar({ selectedGoodId: ++good.selectedGoodId });
  };
}

export const mutations = {
  setCategory: setCategory(categoryVar),
  setCurrency: setCurrency(currencyVar),
  setGoodId: setGoodId(selectedGoodIdVar),
};
