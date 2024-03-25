import React, { useEffect, useCallback, useState } from "react";
import _ from "lodash";
import { useMatch, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_PARTIAL_CATEGORY_DATA } from "../../../api/apiRequests";
import { Product } from "../../../models/Product";
import { GET_LOCAL_CURRENCY } from "../../../operations/queries";
import { mutations } from "../../../operations/mutations";
import { CustomLink } from "../../customLink";
import { CurrencyConverter } from "../../../utils/currencyEnum";
import DefaultErrorMessage from "../../../errorBoundary/defaultErrorMessage";
import { cartService } from "../../../businessLayer";
import { CartProduct } from "../../../models/CartProduct";
import Header from "../components/header";

function HeaderContainer() {
  const match = useMatch({ path: "/", end: true });
  const params = useParams();

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

  const countCost = useCallback(() => {
    return cartService.totalCost(currentCurrency.data.currency);
  }, [currentCurrency.data]);

  const setProductAmountUp = useCallback((item: CartProduct) => {
    cartService.setItemAmountUp(item);
    setCartItems((state) => {
      return state.map((cartItem: CartProduct) => {
        if (
          cartItem.id === item.id &&
          _.isEqual(item.values, cartItem.values)
        ) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
    });
  }, []);

  const setProductAmountDown = useCallback((item: CartProduct) => {
    cartService.setItemAmountDown(item);
    setCartItems((state) => {
      const updatedCartItems = state.map((cartItem: CartProduct) => {
        if (
          cartItem.id === item.id &&
          _.isEqual(item.values, cartItem.values)
        ) {
          const newQuantity = Math.max(cartItem.quantity - 1, 0);
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });

      const filteredCartItems = updatedCartItems.filter(
        (cartItem: CartProduct) => cartItem.quantity > 0
      );

      return filteredCartItems;
    });
  }, []);

  if (error) return <DefaultErrorMessage />;
  if (loading) return null;

  return (
    <Header
      categoryName={params.categoryName}
      cartItems={cartItems}
      currentCurrency={currentCurrency.data.currency}
      isCartOpen={isCartOpen}
      isCurrencyOpen={isCurrencyOpen}
      isHomeRoute={match}
      products={data.category.products}
      cartVisibilityHandler={cartVisibilityHandler}
      changeCurrency={changeCurrency}
      countCost={countCost}
      currencyVisibility={currencyVisibilityHandler}
      navbarLinks={navbarLinks}
      setProductAmountUp={setProductAmountUp}
      setProductAmountDown={setProductAmountDown}
      updateCartItems={updateCartItems}
    />
  );
}

export default HeaderContainer;
