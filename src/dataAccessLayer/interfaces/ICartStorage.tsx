import { CartProduct } from "../../models/CartProduct";

export interface ICartStorage {
  get(): CartProduct[];
  getItem(item: CartProduct): CartProduct;
  update(item: CartProduct): void;
  reset(): void;
}
