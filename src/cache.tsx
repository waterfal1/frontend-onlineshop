import { InMemoryCache, makeVar } from "@apollo/client";

const initializeCurrencyVar = () => {
  const storedCurrency = localStorage.getItem("currency");
  return storedCurrency ? JSON.parse(storedCurrency) : "USD";
};

export const updateCurrencyVar = (newCurrency: string) => {
  currencyVar(newCurrency);
  localStorage.setItem("currency", JSON.stringify(newCurrency));
};

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        currency: {
          read() {
            return currencyVar();
          },
        },
      },
    },
  },
});

export { cache };

export const currencyVar = makeVar<string>(initializeCurrencyVar());
