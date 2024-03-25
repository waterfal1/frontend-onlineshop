import { AttributeItem } from "./AttributeItem";

export interface CartProduct {
  id: string;
  category: string;
  name: string;
  prices: { [key: string]: number };
  photo: string[];
  activeImageIndx: number;
  attributes: { [key: string]: AttributeItem[] };
  values: { [key: string]: string };
  quantity: number;
}
