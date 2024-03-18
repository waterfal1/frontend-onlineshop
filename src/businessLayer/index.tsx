import { cartStorage } from "../dataAccessLayer";
import CartService from "./CartService";
import { ICartService } from "./interfaces/ICartService";

export const cartService: ICartService = new CartService(cartStorage);
