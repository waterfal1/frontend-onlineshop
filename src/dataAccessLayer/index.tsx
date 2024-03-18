import CartStorage from "./CartStorage";
import LocalStorage from "./LocalStorage";
import { ICartStorage } from "./interfaces/ICartStorage";

const localStorage = new LocalStorage();

export const cartStorage: ICartStorage = new CartStorage(localStorage);
