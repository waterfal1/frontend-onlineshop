import { CartProduct } from "../../models/CartProduct";

export interface ICartService {
  get(): CartProduct[];
  update(item: CartProduct): void;
  reset(): void;
  totalCost: (currency: any) => string;
  getItem(item: CartProduct): CartProduct;
}
