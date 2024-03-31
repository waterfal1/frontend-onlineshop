import parse from "html-react-parser";
import React from "react";
import { NavLink } from "react-router-dom";

import { CartAttribute } from "../../../../models/Attribute";
import { CartProduct } from "../../../../models/CartProduct";
import ChangeGoodAmountContainer from "../../ChangeGoodAmount";

import "./styles.css";

type Props = {
  product: CartProduct;
  price?: React.ReactNode;
  selectedAttributes: number[];
  adjustGoodAmount: boolean;
  isAddToCartAvailable: boolean;
  isSelectAvailable: boolean;
  withDescription: boolean;
  addToCart: (item: CartProduct) => void;
  increaseCartItem: (item: CartProduct) => void;
  decreaseCartItem: (item: CartProduct) => void;
  selectAttribute: (
    attrIndex: number,
    attrPropertyIndex: number,
    product: CartProduct
  ) => void;
};

function SelectProperties(props: Props) {
  const {
    price,
    product,
    selectedAttributes,
    isAddToCartAvailable,
    adjustGoodAmount,
    isSelectAvailable,
    withDescription,
    addToCart,
    increaseCartItem,
    decreaseCartItem,
    selectAttribute,
  } = props;

  return (
    <>
      <div className="cart-goods-container">
        <div className="goods-description">
          <NavLink to={`/${product.category}/${product.id}`}>
            <p
              className={isSelectAvailable ? "goods-name" : "cart-window-name"}
            >
              {product.name}
            </p>
            <p
              className={
                isSelectAvailable
                  ? "goods-name weight-normal"
                  : "cart-window-name"
              }
            >
              {product.id}
            </p>
          </NavLink>

          {product.attributes.map((attr: CartAttribute, attrIndex: number) => (
            <div
              key={product.id + attr.items.map((el) => el.isSelected).join("_")}
              className="attributes-columns"
            >
              <p className="goods-attribute"> {attr.name}:</p>

              <div className="goods-attribute-row">
                {attr.items.map((item, index) => {
                  if (!isSelectAvailable && !item?.isSelected) {
                    return null;
                  }

                  return (
                    <div
                      key={product.id + item.id + item.isSelected.toString()}
                      style={{
                        background: item.value,
                        color: item.value,
                        border: `30px solid ${item.value}`,
                        boxShadow: "0 0 4px 0 rgba(50, 50, 50, 1)",
                      }}
                      onClick={() =>
                        isSelectAvailable
                          ? selectAttribute(attrIndex, index, product)
                          : {}
                      }
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
          {price}
          {isAddToCartAvailable && (
            <button
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
              className="add-to-cart-btn pointer"
            >
              ADD TO CART
            </button>
          )}
          {withDescription && parse(product.description)}
        </div>
      </div>

      {adjustGoodAmount && (
        <ChangeGoodAmountContainer
          good={product}
          adjustGoodAmount={adjustGoodAmount}
          increaseCartItem={increaseCartItem}
          decreaseCartItem={decreaseCartItem}
        />
      )}
    </>
  );
}

export default SelectProperties;
