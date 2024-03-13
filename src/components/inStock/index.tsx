import React from "react";
import cart from "../../assets/Circle_Icon.svg";
import { NavLink } from "react-router-dom";
import { Good } from "../../models/Good";
import { Attribute } from "../../models/Attribute";

import "./styles.css";
import { CurrencyReConverter } from "../../utils/currencyEnum";

type Props = {
  product: Good;
  attributes: Attribute[];
  currentCurrency: { currency: string };
  increment: (id: string, attributes: number[]) => void;
};

function InStock(props: Props) {
  const { product, currentCurrency, attributes, increment } = props;

  return (
    <div onClick={() => {}} className="product-card">
      <div className={product.inStock ? "in-stock" : "not-in-stock"}>
        <NavLink to="/goods">
          <img className="goods-image" src={product.gallery[0]} alt="Image" />
          {!product.inStock && (
            <div className="out-of-stock-text">Out of Stock</div>
          )}
          <p className="goods-name"></p>
          <p className="goods-cost">
            {/* correct session storage for currency (use apollo) */}
            {CurrencyReConverter[currentCurrency.currency]}
            {
              product.prices.find(
                (el) => el.currency === props.currentCurrency.currency
              )?.amount
            }
          </p>
        </NavLink>
        <img
          onClick={() => {}}
          className="on-hover-cart"
          src={cart}
          alt="Cart"
        />
      </div>
    </div>
  );
}

export default InStock;
