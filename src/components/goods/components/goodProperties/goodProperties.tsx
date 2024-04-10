import parse from "html-react-parser";
import React from "react";

import { Attribute } from "../../../../models/Attribute";
import { Product } from "../../../../models/Product";

import "./styles.css";

type Props = {
  product: Product;
  price?: React.ReactNode;
  selectedAttributes: number[];
  addToCart: (item: Product) => void;
  selectAttribute: (attrIndex: number, attrPropertyIndex: number) => void;
};

function GoodProperties(props: Props) {
  const { price, product, selectedAttributes, addToCart, selectAttribute } =
    props;

  return (
    <div className="good-properties">
      <p className={"good__name"}>{product.name}</p>
      <p className={"good__name_normal"}>{product.id}</p>
      {product.attributes.map((attr: Attribute, attrIndex: number) => {
        return (
          <div key={product.id + attr.id + attrIndex}>
            <p className="good__name_normal"> {attr.name}:</p>

            <div className="good-attribute">
              {attr.items.map((item, index) => {
                return (
                  <div
                    key={item.id + item.value}
                    style={{
                      background: item.value,
                      color: item.value,
                      border: `20px solid ${item.value}`,
                      boxShadow: "0 0 4px 0 rgba(50, 50, 50, 1)",
                    }}
                    onClick={() => selectAttribute(attrIndex, index)}
                    className={`good-attribute__item ${
                      selectedAttributes[attrIndex] === index
                        ? "good-attribute__item_selected"
                        : ""
                    }`}
                  >
                    {CSS.supports("color", item.value) ? "" : item.value}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {price}
      <div className="good-toCart">
        <button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className={
            product.inStock
              ? "good-toCart__button"
              : "good-toCart__button_inActive"
          }
        >
          ADD TO CART
        </button>
      </div>
      <br />
      {parse(product.description)}
    </div>
  );
}

export default GoodProperties;
