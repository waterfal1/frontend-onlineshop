import { AttributeItem } from "./AttributeItem";

export interface Attribute {
  id: string;
  name: string;
  items: AttributeItem[];
  __typename: string;
}
