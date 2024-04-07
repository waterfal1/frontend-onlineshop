import React from "react";
import { NavLink } from "react-router-dom";

import cart from "../../../assets/cart.svg";
import { Product } from "../../../models/Product";
import { CurrencyReConverter } from "../../../utils/currencyEnum";

import "./styles.css";

type Props = {
  categoryName: string;
  currentCurrency: string;
  products: Product[];
  addGoodToCart: (item: Product) => void;
};

function Home(props: Props) {
  const { categoryName, currentCurrency, products, addGoodToCart } = props;

  return (
    <div className="home">
      <div className="home__category">{categoryName?.toUpperCase()}</div>
      <main>
        <div className="home-goods">
          {products.map((item) => (
            <div
              key={item.id}
              className={`home-goods__good ${
                item.inStock ? "inStock" : "notInStock"
              }`}
            >
              <NavLink to={`/${item.category}/${item.id}`}>
                <img
                  className="home-goods__image"
                  src={item.gallery[0]}
                  alt="Good"
                />
                {!item.inStock && (
                  <div className="outOfStock">Out of Stock</div>
                )}
                <p className="home-goods_goodName">{item.name}</p>
                <p className="home-goods_cost">
                  {CurrencyReConverter[currentCurrency]}
                  {
                    item.prices.find((el) => el.currency === currentCurrency)
                      ?.amount
                  }
                </p>
              </NavLink>
              <img
                onClick={() => addGoodToCart(item)}
                className="home-goods__cart"
                src={cart}
                alt="Cart"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
