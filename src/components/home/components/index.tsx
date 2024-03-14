import React from "react";

import cart from "../../../assets/cart.svg";
import { Product } from "../../../models/Product";
import { NavLink } from "react-router-dom";
import { CurrencyReConverter } from "../../../utils/currencyEnum";

import "./styles.css";

type Props = {
  currentCurrency: { currency: string };
  currentCategory: { category: string };
  products: Product[];
  selectedGoodId: number;
};

function Home(props: Props) {
  const { currentCurrency } = props;

  return (
    <main>
      <div className="category-block-on-page">
        {props.products.map((item) => (
          <div key={item.id} onClick={() => {}} className="product-card">
            <div className={item.inStock ? "in-stock" : "not-in-stock"}>
              <NavLink to={`/${item.category}/${item.id}`}>
                <img className="goods-image" src={item.gallery[0]} alt="Good" />
                {!item.inStock && (
                  <div className="out-of-stock-text">Out of Stock</div>
                )}
                <p className="goods-name">{item.name}</p>
                <p className="goods-cost">
                  {CurrencyReConverter[currentCurrency.currency]}
                  {
                    item.prices.find(
                      (el) => el.currency === currentCurrency.currency
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
        ))}
      </div>
    </main>
  );
}

export default Home;
