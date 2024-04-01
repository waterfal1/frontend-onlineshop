import { Attribute } from "../../../models/Attribute";
import { AttributeItem } from "../../../models/AttributeItem";
import { CartProduct } from "../../../models/CartProduct";
import { Product } from "../../../models/Product";

export const cartProductMapper = (product: Product): CartProduct => {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    gallery: product.gallery,
    inStock: product.inStock,
    description: product.description,
    prices: product.prices,
    activeImageIndx: 0,
    attributes: product.attributes.reduce(
      (acc: { [key: string]: AttributeItem[] }, curr: Attribute) => {
        acc[curr.id] = curr.items;
        return acc;
      },
      {}
    ),
    values: product.attributes.reduce(
      (acc: { [key: string]: string }, curr: Attribute) => {
        acc[curr.id] = curr.items[0].value || curr.items[0].displayValue;
        return acc;
      },
      {}
    ),
    quantity: 1,
  };
};
