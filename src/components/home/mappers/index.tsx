import { CartProduct } from "../../../models/CartProduct";
import { Price } from "../../../models/Price";
import { Product } from "../../../models/Product";

export const cartProductMapper = (product: Product): CartProduct => {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    photo: product.gallery,
    prices: product.prices.reduce(
      (acc: { [key: string]: number }, curr: Price) => {
        acc[curr.currency] = curr.amount;
        return acc;
      },
      {}
    ),
    attributeId: product.attributes[0].id,
    value: product.attributes[0].items[0].displayValue,
    quantity: 1,
  };
};
