import _ from "lodash";

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
      this.get().find((el) => {
        return el.id === item.id && _.isEqual(el.values, item.values);
      }) || null
    );
  }

  public addItem(item: CartProduct): void {
    let cart = this.get();
    cart.push(item);
    this.storage.setItem(CartStorage.CART, cart);
  }

  public setItemAmountUp(item: CartProduct): void {
    const cartItem = this.getItem(item);

    if (cartItem) {
      cartItem.quantity++;
      this.update(cartItem);
    } else {
      this.addItem(item);
    }
  }

  public setItemAmountDown(item: CartProduct): void {
    const cartItem = this.getItem(item);
    cartItem.quantity = Math.max(--cartItem.quantity, 0);
    this.update(cartItem);
  }

  public updateSelectedProperties(
    oldItem: CartProduct,
    newItem: CartProduct
  ): void {
    let cart = this.get();

    const oldIndex = cart.findIndex(
      (e) => _.isEqual(oldItem.values, e.values) && e.id === oldItem.id
    );
    const newIndex = cart.findIndex(
      (e) => _.isEqual(newItem.values, e.values) && e.id === newItem.id
    );

    if (newIndex !== -1 && oldIndex !== -1 && oldIndex !== newIndex) {
      cart[newIndex].quantity =
        cart[newIndex].quantity + cart[oldIndex].quantity;
      cart.splice(oldIndex, 1);
    } else if (oldIndex !== -1) {
      cart[oldIndex].values = newItem.values;
    }
    this.storage.setItem(CartStorage.CART, cart);
  }

  public update(item: CartProduct): void {
    let cart = this.get();

    const existingProductIndex = cart.findIndex(
      (e) => _.isEqual(item.values, e.values) && e.id === item.id
    );

    if (item.quantity === 0) {
      cart.splice(existingProductIndex, 1);
    } else if (existingProductIndex !== -1) {
      cart[existingProductIndex] = item;
    }

    this.storage.setItem(CartStorage.CART, cart);
  }

  public reset(): void {
    this.storage.setItem(CartStorage.CART, null);
  }
}
