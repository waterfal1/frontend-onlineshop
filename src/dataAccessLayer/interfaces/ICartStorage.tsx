import { CartProduct } from "../../models/CartProduct";

export interface ICartStorage {
  get(): CartProduct[];
  getItem(item: CartProduct): CartProduct;
  addItem(item: CartProduct): void;
  removeItem(item: CartProduct): void;
  updateProperties(oldItem: CartProduct, newItem: CartProduct): void;
  update(item: CartProduct): void;
  reset(): void;
}
