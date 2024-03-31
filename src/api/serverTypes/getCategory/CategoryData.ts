import { Product } from "../../../models/Product";

export default interface CategoryData {
  category: {
    name: string;
    products: Product[];
  };
}
