import { ReactiveVar } from "@apollo/client";
import { Category } from "../../models/Category";
import { Currency } from "../../models/Currency";
import { GoodId } from "../../models/SelectedGood";
import {
  categoryVar,
  currencyVar,
  goodsVar,
  selectedGoodIdVar,
} from "../../cache";
import { Good } from "../../models/Good";

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

function addGood(goodsVar: ReactiveVar<{ goods: Good[] }>) {
  return (good: Good) => {
    const allGoods = goodsVar();
    goodsVar({ goods: allGoods.goods.concat(good) });
  };
}

function deleteGood(goodsVar: ReactiveVar<{ goods: Good[] }>) {
  return (good: Good) => {
    const allGoods = goodsVar();
    goodsVar({ goods: allGoods.goods.filter((g) => g.id === good.id) });
  };
}

export const mutations = {
  setCategory: setCategory(categoryVar),
  setCurrency: setCurrency(currencyVar),
  setGoodId: setGoodId(selectedGoodIdVar),
  addGood: addGood(goodsVar),
  deleteGood: deleteGood(goodsVar),
};
