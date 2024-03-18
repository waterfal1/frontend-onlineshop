export interface IStorage {
  getItem<T>(key: string): T;
  setItem<T>(key: string, value: T): void;
}
