import { CartProduct } from "../../models/CartProduct";

export interface ICartService {
  get(): CartProduct[];
  update(item: CartProduct): void;
  reset(): void;
  totalCost: (currency: string) => string;
  updateSelectedProperties(oldItem: CartProduct, newItem: CartProduct): void;
  getItem(item: CartProduct): CartProduct;
  setItemAmountUp(item: CartProduct): void;
  setItemAmountDown(item: CartProduct): void;
  addItem(item: CartProduct): void;
}
