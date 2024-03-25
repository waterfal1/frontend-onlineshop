import { cartService } from "../businessLayer";

function CountCost(currency: string) {
  return cartService.totalCost(currency);
}

export default CountCost;
