import { Attribute } from "./Attribute";
import { Price } from "./Price";

export interface Product {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  category: string;
  description: string;
  attributes: Attribute[];
  prices: Price[];
}
