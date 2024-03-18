export interface CartProduct {
  id: string;
  category: string;
  name: string;
  prices: { [key: string]: number };
  photo: string[];
  attributeId: string;
  value: string;
  quantity: number;
}
