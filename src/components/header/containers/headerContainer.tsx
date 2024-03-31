import { useQuery } from "@apollo/client";
import React, { useEffect, useCallback, useState } from "react";

import { GET_PARTIAL_CATEGORY_DATA } from "../../../api/apiRequests";
import { cartService } from "../../../businessLayer";
import DefaultErrorMessage from "../../../errorBoundary/defaultErrorMessage";
import { CartProduct } from "../../../models/CartProduct";
import { Product } from "../../../models/Product";
import { mutations } from "../../../operations/mutations";
import { GET_LOCAL_CURRENCY } from "../../../operations/queries";
import { CurrencyConverter } from "../../../utils/currencyEnum";
import { CustomLink } from "../../customLink";
import Header from "../components/header";

function HeaderContainer() {
  const { data, loading, error } = useQuery(GET_PARTIAL_CATEGORY_DATA);
  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);

  const [isCurrencyOpen, setIsCurrencyOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const { setCurrency } = mutations;

  const navbarLinks = useCallback(() => {
    const categories = [
      ...new Set<string>(
        data.category.products.map((product: Product) => product.category)
      ),
    ];

    return categories.map((category: string) => (
      <CustomLink key={category} to={`/${category}`}>
        {category.toUpperCase()}
      </CustomLink>
    ));
  }, [data]);

  const changeCurrency = useCallback(
    (index: string) => {
      const currency = document.getElementById(index);
      if (currency === null) return;

      setIsCurrencyOpen(false);
      setCurrency(CurrencyConverter[currency.innerHTML]);
    },
    [setCurrency]
  );

  const currencyVisibilityHandler = useCallback(() => {
    setIsCurrencyOpen((state) => !state);
  }, []);

  const updateCartItems = useCallback(() => {
    const cart = cartService.get();
    if (cart) setCartItems(cart);
  }, []);

  useEffect(() => {
    updateCartItems();
  }, [updateCartItems]);

  const cartVisibilityHandler = useCallback(() => {
    setIsCartOpen((state) => !state);
    updateCartItems();
  }, [updateCartItems]);

  if (error) return <DefaultErrorMessage />;
  if (loading) return null;

  return (
    <Header
      cartItems={cartItems}
      currentCurrency={currentCurrency.data.currency}
      isCartOpen={isCartOpen}
      isCurrencyOpen={isCurrencyOpen}
      products={data.category.products}
      cartVisibilityHandler={cartVisibilityHandler}
      changeCurrency={changeCurrency}
      currencyVisibility={currencyVisibilityHandler}
      navbarLinks={navbarLinks}
      setCartItems={setCartItems}
      updateCartItems={updateCartItems}
    />
  );
}

export default HeaderContainer;
