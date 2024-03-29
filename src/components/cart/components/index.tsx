import React, { Dispatch, SetStateAction } from "react";

import { CartProduct } from "../../../models/CartProduct";
import PriceComponent from "../../sharedComponents/price";
import ChangeGoodAmountContainer from "../../sharedComponents/ChangeGoodAmount/containers/changeGoodAmountContainer";
import SelectPropertiesContainer from "../../sharedComponents/selectProperties/containers/selectPropertiesContainer";

import "./styles.css";

type Props = {
  cartItems: CartProduct[];
  currentCurrency: string;
  pageName: string;
  setPreviousImage: (item: CartProduct) => void;
  setCartItems: Dispatch<SetStateAction<CartProduct[]>>;
  setNextImage: (item: CartProduct) => void;
};

function Cart(props: Props) {
  const {
    cartItems,
    pageName,
    currentCurrency,
    setPreviousImage,
    setNextImage,
    setCartItems,
  } = props;

  return (
    <>
      <div className="category-name">{pageName}</div>
      <section>
        {cartItems.length === 0 ? (
          <h1 className="cart-name">You cart is empty</h1>
        ) : (
          cartItems.map((item: CartProduct) => {
            return (
              <div
                key={item.id + Math.random()}
                className="cart-common-container"
              >
                <SelectPropertiesContainer
                  product={item}
                  price={<PriceComponent prices={item.prices} />}
                  isAddToCartAvailable={false}
                  setCartItems={setCartItems}
                />

                <div className="cart-third-flex-element">
                  <img
                    className="cart-small-img"
                    src={item.gallery[item.activeImageIndx]}
                    alt="picture1"
                  />
                  <div
                    onClick={() => setPreviousImage(item)}
                    className="arrow-rev arrow-left-rev pointer"
                  />
                  <div
                    onClick={() => setNextImage(item)}
                    className="arrow-rev arrow-right-rev pointer"
                  />
                </div>
              </div>
            );
          })
        )}
      </section>
    </>
  );
}

export default Cart;
