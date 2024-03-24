import { CartProduct } from "../../models/CartProduct";

export interface ICartService {
  get(): CartProduct[];
  update(item: CartProduct): void;
  reset(): void;
  totalCost: (currency: any) => string;
  updateProperties(oldItem: CartProduct, newItem: CartProduct): void;
  getItem(item: CartProduct): CartProduct;
  removeItem(item: CartProduct): void;
  addItem(item: CartProduct): void;
}
