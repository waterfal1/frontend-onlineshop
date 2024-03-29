import { AttributeItem } from "./AttributeItem";
import { CartAttributeItem } from "./CartAttributeItem";

export interface Attribute {
  id: string;
  name: string;
  items: AttributeItem[];
  __typename: string;
}

export interface CartAttribute extends Attribute {
  items: CartAttributeItem[];
}
