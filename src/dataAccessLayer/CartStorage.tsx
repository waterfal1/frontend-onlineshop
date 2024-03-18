import { CartProduct } from "../models/CartProduct";
import { ICartStorage } from "./interfaces/ICartStorage";
import { IStorage } from "./interfaces/IStorage";

export default class CartStorage implements ICartStorage {
  private static readonly CART = "CART";
  private storage: IStorage;

  constructor(storage: IStorage) {
    this.storage = storage;
  }

  public get(): CartProduct[] {
    return this.storage.getItem<CartProduct[]>(CartStorage.CART) || [];
  }

  public getItem(item: CartProduct): CartProduct {
    return (
      this.get().find(
        (e) =>
          e.value === item.value &&
          e.id === item.id &&
          e.attributeId === item.attributeId
      ) || null
    );
  }

  public update(item: CartProduct): void {
    const cart = this.get();

    const existingProductIndex = cart.findIndex((e) => e.value === item.value);
    if (item.quantity === 0) {
      cart.filter((el) => el.quantity > 0);
    } else if (existingProductIndex !== -1) cart[existingProductIndex] = item;
    else cart.push(item);

    this.storage.setItem(CartStorage.CART, cart);
  }

  public reset(): void {
    this.storage.setItem(CartStorage.CART, null);
  }
}
