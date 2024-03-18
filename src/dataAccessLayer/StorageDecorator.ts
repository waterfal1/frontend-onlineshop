import { IStorage } from "./interfaces/IStorage";

export default class StorageDecorator implements IStorage {
  protected storage: IStorage;

  public constructor(storage: IStorage) {
    this.storage = storage;
  }

  public getItem<T>(key: string): T {
    return this.storage.getItem(key);
  }

  public setItem<T>(key: string, value: T): void {
    this.storage.setItem(key, value);
  }
}
