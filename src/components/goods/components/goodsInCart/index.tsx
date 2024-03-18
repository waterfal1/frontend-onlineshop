import React, { useCallback, useEffect, useState } from "react";
import * as _ from "lodash";

import { GET_PARTIAL_CATEGORY_DATA } from "../../../../api/apiRequests";
import { useQuery } from "@apollo/client";
import {
  GET_LOCAL_CATEGORY,
  GET_LOCAL_CURRENCY,
} from "../../../../operations/queries";
import { CartProduct } from "../../../../models/CartProduct";
import { cartService } from "../../../../businessLayer";
import { NavLink } from "react-router-dom";
import { CurrencyConverter } from "../../../../utils/currencyEnum";

type Props = {};

function GoodsInCart(props: Props) {
  const { data, loading, error } = useQuery(GET_PARTIAL_CATEGORY_DATA);
  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);

  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [currentImage, setCurrentImage] = useState();

  const attributeSelected = (): void => {};

  const imageUp = (index: number, length: number): void => {
    const picture = this.state.imagesState;
    if (picture[index] < length - 1)
      picture[index] = this.state.imagesState[index] + 1;
    else picture[index] = 0;
    this.setState({ imagesState: picture });
  };

  const imageDown = (index: number, length: number): void => {
    const picture = this.state.imagesState;
    if (picture[index] > 0) picture[index] = this.state.imagesState[index] - 1;
    else picture[index] = length - 1;
    this.setState({ imagesState: picture });
  };

  useEffect(() => {
    const cart = cartService.get();
    if (cart) setCartItems(cart);
  }, []);

  const setImagesState = (images: number[]): void => {
    this.setState({ imagesState: images });
  };

  //   const choseGoods = (goodsId: string): void => {
  //     localStorage.setItem("goodsSelected", goodsId);
  //   };

  const setAmountUp = useCallback((item: CartProduct): void => {
    const cartItem = cartService.getItem(item);
    cartItem.quantity++;
    cartService.update(cartItem);
    setCartItems((state) => {
      return state.map((cartItem: CartProduct) => {
        if (
          cartItem.id === item.id &&
          cartItem.attributeId === item.attributeId
        ) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
    });
  }, []);

  const setAmountDown = useCallback((item: CartProduct): void => {
    const cartItem = cartService.getItem(item);
    cartItem.quantity = Math.max(--cartItem.quantity, 0);
    cartService.update(cartItem);
    setCartItems((state) => {
      const updatedCartItems = state.map((cartItem: CartProduct) => {
        if (
          cartItem.id === item.id &&
          cartItem.attributeId === item.attributeId
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

  if (loading) return <div>Loading...</div>;
  if (error) return <>Error {error.toString()}</>;

  return cartItems.map((item: CartProduct) => {
    return (
      <div key={item.id} className="cart-common-container">
        <div className="cart-goods-container">
          <NavLink to={`/${item.category}/${item.id}`}>
            <p className="cart-first-text">{item.name}</p>
            <p className="cart-first-text weight-normal">{item.id}</p>
            <p className="cart-goods-padding">
              {CurrencyConverter[currentCurrency.data.currency.currency]}
              {item.prices[currentCurrency.data.currency.currency]}
            </p>
          </NavLink>

          <div className="attributes-columns">
            <p className="cart-goods-attribute">{item.attributeId}:</p>
            <div className="cart-attribute-row">
              <div
                style={{
                  background: "black",
                  color: "white",
                  border: `30px solid ${"white"}`,
                  boxShadow: "0 0 4px 0 rgba(50, 50, 50, 1)",
                }}
                onClick={() => attributeSelected}
                className="cart-box cart-selected pointer"
              >
                {item.value}
              </div>
            </div>
          </div>
        </div>

        <div className="cart-center-flex-element">
          <button
            onClick={() => setAmountUp(item)}
            className="cart-window-counter-btn"
          >
            +
          </button>
          {item.quantity}
          <button
            onClick={() => setAmountDown(item)}
            className="cart-window-counter-btn"
          >
            -
          </button>
        </div>

        <div className="cart-third-flex-element">
          <img className="cart-small-img" src={item.photo[0]} alt="picture1" />
          <div
            onClick={() => imageDown()}
            className="arrow-rev arrow-left-rev pointer"
          />
          <div
            onClick={() => imageUp()}
            className="arrow-rev arrow-right-rev pointer"
          />
        </div>
        {/* <Images
          imagesState={this.state.imagesState}
          imageDown={this.imageDown}
          imageUp={this.imageUp}
          product={products[productIndex]}
          goodsCounter={goodsCounter}
        /> */}
      </div>
    );
  });
}

export default GoodsInCart;
