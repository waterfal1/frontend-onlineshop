import { InMemoryCache, makeVar, ReactiveVar } from "@apollo/client";
import { GoodId } from "./models/SelectedGood";
import { Category } from "./models/Category";
import { Currency } from "./models/Currency";
import { Good } from "./models/Good";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        selectedGoodId: {
          read() {
            return selectedGoodIdVar();
          },
        },
        category: {
          read() {
            return categoryVar();
          },
        },
        currency: {
          read() {
            return currencyVar();
          },
        },
        goods: {
          read() {
            return goodsVar();
          },
        },
      },
    },
  },
});

export const selectedGoodIdVar: ReactiveVar<GoodId> = makeVar<GoodId>({
  selectedGoodId: 0,
});
export const categoryVar = makeVar<Category>({ category: "All" });
export const currencyVar = makeVar<Currency>({ currency: "USD" });
export const goodsVar = makeVar<{ goods: Good[] }>({ goods: [] });
