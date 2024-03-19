import { AttributeItem } from "./AttributeItem";

export interface CartProduct {
  id: string;
  category: string;
  name: string;
  prices: { [key: string]: number };
  photo: string[];
  // attributeId: string;
  attributes: { [key: string]: AttributeItem[] };
  // value: string;
  values: { [key: string]: string };
  quantity: number;
}
