import { CartProduct } from "../../models/CartProduct";

export interface ICartStorage {
  get(): CartProduct[];
  getItem(item: CartProduct): CartProduct;
  addItem(item: CartProduct): void;
  updateSelectedProperties(oldItem: CartProduct, newItem: CartProduct): void;
  update(item: CartProduct): void;
  setItemAmountUp(item: CartProduct): void;
  setItemAmountDown(item: CartProduct): void;
  reset(): void;
}
