import { IStorage } from "./interfaces/IStorage";

export default class LocalStorage implements IStorage {
  public getItem<T>(key: string): T {
    const data = localStorage.getItem(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }

  public setItem<T>(key: string, value: T): void {
    if (value === undefined || value === null) {
      localStorage.removeItem(key);
    } else {
      const data = JSON.stringify(value);

      localStorage.setItem(key, data);
    }
  }
}
