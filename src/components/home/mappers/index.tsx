import { Attribute } from "../../../models/Attribute";
import { AttributeItem } from "../../../models/AttributeItem";
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
    // attributeId: product.attributes[0].id,
    attributes: product.attributes.reduce(
      (acc: { [key: string]: AttributeItem[] }, curr: Attribute) => {
        acc[curr.id] = curr.items;
        return acc;
      },
      {}
    ),
    values: product.attributes.reduce(
      (acc: { [key: string]: string }, curr: Attribute) => {
        acc[curr.id] = curr.items[0].displayValue;
        return acc;
      },
      {}
    ),
    // value: product.attributes[0].items[0].displayValue,
    quantity: 1,
  };
};
