interface CurrencyMap {
    [key: string]: string;
}


export const CurrencyConverter: CurrencyMap = {
    "$": "USD",
    "£": "GBP",
    "A$": "AUD",
    "¥": "JPY",
    "₽": "RUB",
};


export const CurrencyReConverter: CurrencyMap = {
  "USD": "$",
  "GBP": "£",
  "AUD": "A$",
  "JPY": "¥",
  "RUB": "₽",
};
