import React, { useState } from "react";
import parse from "html-react-parser";
import "./styles.css";
import { mutations } from "../../../operations/mutations";
import { useQuery } from "@apollo/client";
import {
  GET_LOCAL_CATEGORY,
  GET_LOCAL_CURRENCY,
  GET_LOCAL_SELECTED_GOOD_ID,
} from "../../../operations/queries";
import PhotoColumn from "../../photoColumn";
import { GET_PRODUCT } from "../../../api/apiRequests";
import { useParams } from "react-router-dom";
import MainPhoto from "./mainPhoto";
import AttributesRows from "./attributesRows";
import {
  CurrencyConverter,
  CurrencyReConverter,
} from "../../../utils/currencyEnum";
import AttributeName from "./attributeName";
import AttributeSelected from "./attributeSelected";
import { Product } from "../../../models/Product";
import { Attribute } from "../../../models/Attribute";
import { Price } from "../../../models/Price";
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
  stateCurrency: { currency: string };
  setCurrency: (value: { currency: string }) => void;
  stateSelectedItem: { selectedItemId: number };
  setGoods: (value: number) => void;
  product: Product;
};

function Goods(props: Props) {
  const { stateCurrency, stateSelectedItem, product } = props;

  const { setGoodId, setCurrency } = mutations;
  const [imageState, setImageState] = useState(0);
  const [counter, setCounter] = useState(0);
  // const [attributes, setAttributes] = useState({
  //   attributeNumber: 0,
  //   attributes: [],
  // });
  const [attributesSelected, setAttributesSelected] = useState(
    new Array(product.attributes.length).fill(0)
  );

  const params = useParams();
  console.log(params, "pparamss");

  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);
  const currentCategory = useQuery(GET_LOCAL_CATEGORY);
  const selectedGoodId = useQuery(GET_LOCAL_SELECTED_GOOD_ID);
  // const { loading, data } = useQuery(GET_PRODUCT, {
  //   variables: { input: { id: params.productId } },
  // });

  const changeImage = (index: number): void => {
    setImageState(index);
  };

  const addToCart = (id: string, attributes: number[]): void => {
    // setCounter((state) => state + 1);
    // addGoodsToStorage(id, attributes);
    // setGoodId();
  };

  // if (loading) return <>...Loading</>;
  // console.log(data, "dddd", stateCurrency.currency);
  console.log(product, "product123");

  return (
    <div className="goods-page-container">
      <PhotoColumn changeImage={changeImage} product={product} />
      <MainPhoto product={product} imageState={imageState} />
      <div className="goods-description">
        <p className="goods-name">{product.name}</p>
        <p className="goods-name weight-normal"> {product.id}</p>

        {product.attributes.map((attr: Attribute, attrIndex: number) => (
          <div key={attr.id} className="attributes-columns">
            <p className="goods-attribute"> {attr.name}:</p>

            <div className="goods-attribute-row">
              {attr.items.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    style={{
                      background: item.value,
                      color: item.value,
                      border: `10px solid ${item.value}`,
                      boxShadow: "0 0 4px 0 rgba(50, 50, 50, 1)",
                    }}
                    onClick={() => {}}
                    className={`goods-attribute-box ${
                      attributesSelected[attrIndex] === index
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

        <p className="price">{product.prices[0].__typename}:</p>
        <p className="price price-padding">
          {CurrencyReConverter[currentCurrency.data.currency.currency] +
            product.prices.reduce(
              (acc: { [key: string]: number }, curr: Price) => {
                acc[curr.currency] = curr.amount;
                return acc;
              },
              {}
            )[currentCurrency.data.currency.currency]}
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
