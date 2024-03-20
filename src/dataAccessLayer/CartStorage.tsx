import { CartProduct } from "../models/CartProduct";
import { ICartStorage } from "./interfaces/ICartStorage";
import { IStorage } from "./interfaces/IStorage";
import _ from "lodash";

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
        (e) => _.isEqual(item.values, e.values) && e.id === item.id
      ) || null
    );
  }

  public update(item: CartProduct): void {
    let cart = this.get();

    const existingProductIndex = cart.findIndex(
      (e) => _.isEqual(item.values, e.values) && e.id === item.id
    );
    if (item.quantity === 0) {
      console.log("111");
      cart.splice(existingProductIndex, 1);
    } else if (existingProductIndex !== -1) {
      cart[existingProductIndex] = item;
      console.log("222");
    } else if (item.quantity !== 0) {
      console.log("333");
      cart.push(item);
    }

    this.storage.setItem(CartStorage.CART, cart);
  }

  public reset(): void {
    this.storage.setItem(CartStorage.CART, null);
  }
}
