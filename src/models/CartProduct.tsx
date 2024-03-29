import { CartAttribute } from "./Attribute";
import { Price } from "./Price";
export interface CartProduct {
  id: string;
  category: string;
  name: string;
  prices: Price[];
  gallery: string[];
  inStock: boolean;
  description: string;
  activeImageIndx: number;
  attributes: CartAttribute[];
  quantity: number;
}
