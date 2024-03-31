import CartStorage from "./CartStorage";
import { ICartStorage } from "./interfaces/ICartStorage";
import LocalStorage from "./LocalStorage";

const localStorage = new LocalStorage();

export const cartStorage: ICartStorage = new CartStorage(localStorage);
