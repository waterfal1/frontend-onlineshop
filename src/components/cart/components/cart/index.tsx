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
          <h1 className="cart-name">You cart is empty</h1>
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

                  <div className="cart-third-flex-element">
                    <img
                      className="cart-small-img"
                      src={item.gallery[item.activeImageIndx]}
                      alt=""
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
            })}
            <div>Total cost: {countCost(currentCurrency)}</div>
          </>
        )}
      </section>
    </div>
  );
}

export default Cart;
