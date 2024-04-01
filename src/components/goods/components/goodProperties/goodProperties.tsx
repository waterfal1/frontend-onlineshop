import parse from "html-react-parser";
import React from "react";
import { NavLink } from "react-router-dom";

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
    <>
      <div className="cart-goods-container">
        <div className="goods-description">
          <NavLink to={`/${product.category}/${product.id}`}>
            <p className={"goods-name"}>{product.name}</p>
            <p className={"goods-name weight-normal"}>{product.id}</p>
          </NavLink>
          {product.attributes.map((attr: Attribute, attrIndex: number) => {
            return (
              <div
                key={product.id + attr.id + attrIndex}
                className="attributes-columns"
              >
                <p className="goods-attribute"> {attr.name}:</p>

                <div className="goods-attribute-row">
                  {attr.items.map((item, index) => {
                    return (
                      <div
                        key={item.id + item.value}
                        style={{
                          background: item.value,
                          color: item.value,
                          border: `30px solid ${item.value}`,
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
            );
          })}
          {price}
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="add-to-cart-btn pointer"
          >
            ADD TO CART
          </button>
          {parse(product.description)}
        </div>
      </div>
    </>
  );
}

export default GoodProperties;
