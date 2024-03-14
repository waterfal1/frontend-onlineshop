import { ReactiveVar } from "@apollo/client";
import { Category } from "../../models/Category";
import { Currency } from "../../models/Currency";
import { GoodId } from "../../models/SelectedGood";
import {
  categoryVar,
  currencyVar,
  productsVar,
  selectedGoodIdVar,
} from "../../cache";
import { Product } from "../../models/Product";

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

function addGood(productsVar: ReactiveVar<{ products: Product[] }>) {
  return (good: Product) => {
    const allGoods = productsVar();
    productsVar({ products: allGoods.products.concat(good) });
  };
}

function deleteGood(productsVar: ReactiveVar<{ products: Product[] }>) {
  return (good: Product) => {
    const allGoods = productsVar();
    productsVar({
      products: allGoods.products.filter((g) => g.id === good.id),
    });
  };
}

export const mutations = {
  setCategory: setCategory(categoryVar),
  setCurrency: setCurrency(currencyVar),
  setGoodId: setGoodId(selectedGoodIdVar),
  addGood: addGood(productsVar),
  deleteGood: deleteGood(productsVar),
};
