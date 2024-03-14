import { InMemoryCache, makeVar, ReactiveVar } from "@apollo/client";
import { GoodId } from "./models/SelectedGood";
import { Category } from "./models/Category";
import { Currency } from "./models/Currency";
import { Product } from "./models/Product";

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
        products: {
          read() {
            return productsVar();
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
export const productsVar = makeVar<{ products: Product[] }>({ products: [] });
