import { CartAttribute } from "../../../models/Attribute";
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
    attributes: product.attributes.map((el) => {
      const newElement = { ...el };
      newElement.items = el.items.map((item, index) => {
        const newItem = { ...item, isSelected: index === 0 ? true : false };
        return newItem;
      });
      return newElement as CartAttribute;
    }),
    quantity: 1,
  };
};
