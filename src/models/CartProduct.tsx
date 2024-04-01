import { AttributeItem } from "./AttributeItem";
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
  attributes: { [key: string]: AttributeItem[] };
  values: { [key: string]: string };
  quantity: number;
}
