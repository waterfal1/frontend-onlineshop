import React, { Dispatch, SetStateAction } from "react";

import { CartProduct } from "../../../../models/CartProduct";
import countCost from "../../../../services/countCost";
import PriceComponent from "../../../sharedComponents/price";
import GoodPropertiesContainer from "../../containers/GoodPropertiesContainer";

import "./styles.css";

type Props = {
  cartItems: CartProduct[];
  currentCurrency: string;
  pageName: string;
  setPreviousImage: (item: CartProduct) => void;
  setCartItems: Dispatch<SetStateAction<CartProduct[]>>;
  setNextImage: (item: CartProduct) => void;
  updateComponent: () => void;
};

function Cart(props: Props) {
  const {
    cartItems,
    currentCurrency,
    pageName,
    setPreviousImage,
    setNextImage,
    setCartItems,
    updateComponent,
  } = props;
  return (
    <div className="home">
      <div className="home__category">{pageName?.toUpperCase()}</div>
      <section>
        {cartItems.length === 0 ? (
          <h1 className="cart__name">You cart is empty</h1>
        ) : (
          <>
            {cartItems.map((item: CartProduct, index: number) => {
              return (
                <div key={item.id + index} className="cart-good">
                  <GoodPropertiesContainer
                    product={item}
                    price={<PriceComponent prices={item.prices} />}
                    setCartItems={setCartItems}
                    updateComponent={updateComponent}
                  />

                  <div className="cart-images">
                    <img
                      className="good__img"
                      src={item.gallery[item.activeImageIndx]}
                      alt=""
                    />
                    {item.gallery.length > 1 && (
                      <>
                        <div
                          onClick={() => setPreviousImage(item)}
                          className="cart__arrow cart__arrow_left"
                        />
                        <div
                          onClick={() => setNextImage(item)}
                          className="cart__arrow cart__arrow_right"
                        />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            <div>Total cost: {countCost(currentCurrency)}</div>
          </>
        )}
      </section>
    </div>
  );
}

export default Cart;
