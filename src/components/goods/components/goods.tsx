import React from "react";
import parse from "html-react-parser";

import { CurrencyReConverter } from "../../../utils/currencyEnum";
import { Product } from "../../../models/Product";
import { Attribute } from "../../../models/Attribute";

import "./styles.css";

type Props = {
  currentCurrency: string;
  imageIndex: number;
  product: Product;
  selectedAttributes: number[];
  addToCart: (item: Product) => void;
  changeImage: (index: number) => void;
  selectAttribute: (attrIndex: number, attrPropertyIndex: number) => void;
};

function Goods(props: Props) {
  const {
    currentCurrency,
    imageIndex,
    product,
    selectedAttributes,
    addToCart,
    changeImage,
    selectAttribute,
  } = props;

  return (
    <div className="goods-page-container">
      <div className="goods-page-photo-column">
        {product.gallery.map((item: string, pictureIndex: number) => (
          <img
            key={pictureIndex}
            className="small-img pointer"
            onClick={() => changeImage(pictureIndex)}
            src={item}
            alt="picture1"
          />
        ))}
      </div>
      <div className="goods-page-main-photo">
        <img
          className="goods-page-main-photo-flex"
          src={product.gallery[imageIndex]}
          alt="picture2"
        />
      </div>
      <div className="goods-description">
        <p className="goods-name">{product.name}</p>
        <p className="goods-name weight-normal"> {product.id}</p>

        {product.attributes.map((attr: Attribute, attrIndex: number) => (
          <div key={attr.id + Math.random()} className="attributes-columns">
            <p className="goods-attribute"> {attr.name}:</p>

            <div className="goods-attribute-row">
              {attr.items.map((item, index) => {
                return (
                  <div
                    key={item.id + Math.random()}
                    style={{
                      background: item.value,
                      color: item.value,
                      border: `10px solid ${item.value}`,
                      boxShadow: "0 0 4px 0 rgba(50, 50, 50, 1)",
                    }}
                    onClick={() => selectAttribute(attrIndex, index)}
                    className={`goods-attribute-box ${
                      selectedAttributes[attrIndex] === index
                        ? "goods-selected"
                        : ""
                    } pointer`}
                  >
                    {item.value}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <p className="price">Price:</p>
        <p className="price price-padding">
          {CurrencyReConverter[currentCurrency] +
            product.prices.find((el) => el.currency === currentCurrency)
              ?.amount || "Contact us to ask price for this good"}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="add-to-cart-btn pointer"
        >
          ADD TO CART
        </button>
        {parse(product.description)}
      </div>
    </div>
  );
}

export default Goods;
