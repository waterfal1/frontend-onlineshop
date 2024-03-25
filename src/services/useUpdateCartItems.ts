import { useOutletContext } from "react-router-dom";

export function useUpdateCart() {
  return useOutletContext<{ updateCartItems: () => void }>();
}
