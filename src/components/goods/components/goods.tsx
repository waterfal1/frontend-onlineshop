import React, { useState } from "react";
import "./styles.css";
import { addGoodsToStorage } from "../../../utils/goodsHelpers";
import { mutations } from "../../../operations/mutations";
import { useQuery } from "@apollo/client";
import {
  GET_LOCAL_CATEGORY,
  GET_LOCAL_CURRENCY,
  GET_LOCAL_SELECTED_GOOD_ID,
} from "../../../operations/queries";
import PhotoColumn from "../../photoColumn";
// import { query } from "../Home/getData";
// import PhotoColumn from "../../Components/Goods/PhotoColumn";
// import AttributesRows from "../../Components/Goods/AtrributesRows";
// import {
//   addGoodsToStorage,
//   productsAttributes,
// } from "../../Components/functions";
// import CurrentCurrency from "../../Components/Cart/CurrentCurrency";
// import MainPhoto from "../../Components/Header/MainPhoto";
// import { MyGoods } from "../Home/ProductsClass";

type Props = {
  stateCurrency: number;
  stateSelectedItem: number;
  setGoods: (value: number) => { type: string; payload: number };
};

function Goods(props: Props) {
  const { stateCurrency, stateSelectedItem } = props;

  const { setGoodId, setCurrency } = mutations;
  const [imageState, setImageState] = useState(0);
  const [counter, setCounter] = useState(0);
  const [attributes, setAttributes] = useState({
    attributeNumber: 0,
    attributes: [],
  });

  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);
  const currentCategory = useQuery(GET_LOCAL_CATEGORY);
  const selectedGoodId = useQuery(GET_LOCAL_SELECTED_GOOD_ID);

  const

  const changeImage = (index: number): void => {
    setImageState(index);
  };

  const attributeSelected = (
    productIndex: number,
    attributeIndex: number,
    index: number
  ): void => {
    // attributes[productIndex][attributeIndex] = index;
    setAttributes({ attributeNumber: index, attributes: [] });
  };

  const attributeNonSelected = (
    productIndex: number,
    attributeIndex: number,
    index: number
  ): void => {
    // const newState = this.state.attributes;
    // newState[productIndex][attributeIndex] = index;
    setAttributes({ attributeNumber: index, attributes: [] });
  };

  const addToCart = (id: string, attributes: number[]): void => {
    setCounter((state) => state + 1);
    // addGoodsToStorage(id, attributes);
    setGoodId();
  };

  const productAttributes = (): void => {};

  const findProductIndex = (
    productId: string | null,
    products: {
      id: string;
      name: string;
      gallery: string[];
      prices: { amount: string; currency: string }[];
    }[]
  ): number => {
    // @ts-ignore
    return products
      .map(
        (
          el: {
            id: string;
            name: string;
            gallery: string[];
            prices: { amount: string; currency: string }[];
          },
          index: number
        ) => {
          if (productId === el.id) return index;
        }
      )
      .filter((value) => value || value === 0)[0];
  };

  const renderButton = (
    products: { id: string; inStock: string }[],
    productIndex: number,
    attributes: number[][]
  ) => {
    if (products[productIndex].inStock)
      return (
        <button
          onClick={() =>
            addToCart(products[productIndex].id, attributes[productIndex])
          }
          className="add-to-cart-btn pointer"
        >
          ADD TO CART
        </button>
      );
    return <p>Out of Stock</p>;
  };


  return (
    <div className="goods-page-container">
       <PhotoColumn
        changeImage={changeImage}
        product={products[productIndex]}
      />
      <MainPhoto product={products[productIndex]} imageState={imageState} /> */}
      <div className="goods-description">
        {/* <p className="goods-name"> {products[productIndex].name}</p>
        <p className="goods-name weight-normal"> {products[productIndex].id}</p>

        <AttributesRows
          attributes={attributes}
          product={products[productIndex]}
          productIndex={productIndex}
          loadAttributes={loadAttributes}
          attributeNonSelected={this.attributeNonSelected}
          attributeSelected={this.attributeSelected}
        />

        <p className="price">
          {products[productIndex].prices[this.props.stateCurrency].__typename}:
        </p>
        <p className="price price-padding">
          <CurrentCurrency />
          {products[productIndex].prices[this.props.stateCurrency].amount}
        </p>
        {this.renderButton(products, productIndex, attributes)}
        {products[productIndex].description} */}
      </div>
    </div>
  );
}

export default Goods;
