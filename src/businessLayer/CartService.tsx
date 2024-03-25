import { ICartStorage } from "../dataAccessLayer/interfaces/ICartStorage";
import { CartProduct } from "../models/CartProduct";
import { CurrencyReConverter } from "../utils/currencyEnum";
import { ICartService } from "./interfaces/ICartService";

export default class CartService implements ICartService {
  private cartStorage: ICartStorage;

  constructor(cartStorage: ICartStorage) {
    this.cartStorage = cartStorage;
  }

  public get(): CartProduct[] {
    return this.cartStorage.get();
  }

  public getItem(item: CartProduct): CartProduct {
    return this.cartStorage.getItem(item);
  }

  public totalCost(currency: string): string {
    const cart = this.cartStorage.get();
    const cost = cart.reduce((acc: number, curr: CartProduct) => {
      let newAcc = acc + curr.quantity * curr.prices[currency];
      return newAcc;
    }, 0);
    return CurrencyReConverter[currency] + cost.toFixed(2);
  }

  public setItemAmountUp(item: CartProduct): void {
    this.cartStorage.setItemAmountUp(item);
  }

  public setItemAmountDown(item: CartProduct): void {
    this.cartStorage.setItemAmountDown(item);
  }

  public update(item: CartProduct): void {
    this.cartStorage.update(item);
  }

  public updateSelectedProperties(
    oldItem: CartProduct,
    newItem: CartProduct
  ): void {
    this.cartStorage.updateSelectedProperties(oldItem, newItem);
  }

  public addItem(item: CartProduct): void {
    this.cartStorage.addItem(item);
  }

  public reset(): void {
    this.cartStorage.reset();
  }
}
