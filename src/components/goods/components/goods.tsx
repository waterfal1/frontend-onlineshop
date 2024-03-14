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
import { GET_PRODUCT } from "../../../api/apiRequests";
import { useParams } from "react-router-dom";
import MainPhoto from "./mainPhoto";
import AttributesRows from "./attributesRows";
import { CurrencyConverter } from "../../../utils/currencyEnum";
import AttributeName from "./attributeName";
import AttributeSelected from "./attributeSelected";
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

  const params = useParams();
  console.log(params, "pparamss");

  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);
  const currentCategory = useQuery(GET_LOCAL_CATEGORY);
  const selectedGoodId = useQuery(GET_LOCAL_SELECTED_GOOD_ID);
  const { loading, data } = useQuery(GET_PRODUCT, {
    variables: { input: { id: params.productId } },
  });

  const changeImage = (index: number): void => {
    setImageState(index);
  };

  const addToCart = (id: string, attributes: number[]): void => {
    setCounter((state) => state + 1);
    // addGoodsToStorage(id, attributes);
    setGoodId();
  };

  if (loading) return <>...Loading</>;
  console.log(data, "dddd", stateCurrency.currency);

  return (
    <div className="goods-page-container">
      <PhotoColumn changeImage={changeImage} product={data.product.product} />
      <MainPhoto product={data.product.product} imageState={imageState} />
      <div className="goods-description">
        <p className="goods-name">{data.product.product.name}</p>
        <p className="goods-name weight-normal"> {data.product.product.id}</p>

        {data.product.product.attributes.map((attr) => (
          <div key={attr.id} className="attributes-columns">
            <div
              style={{ background: attr.value, color: attr.value }}
              onClick={() => {}}
              className="goods-attribute-box pointer"
            >
              {attr.value}
            </div>
            <div className="goods-attribute-row">
              <div
                style={{
                  background: attr.value,
                  color: attr.value,
                  border: `10px solid ${attr.value}`,
                  boxShadow: "0 0 4px 0 rgba(50, 50, 50, 1)",
                }}
                onClick={() => {}}
                className="goods-attribute-box goods-selected pointer"
              >
                {attr.value}
              </div>
            </div>
          </div>
        ))}

        <p className="price">{data.product.product.prices[0].__typename}:</p>
        <p className="price price-padding">
          {stateCurrency.currency}
          {data.product.product.prices[0].amount}
        </p>

        <button
          onClick={() =>
            addToCart(
              data.product.product.id,
              data.product.product.attributes[0]
            )
          }
          className="add-to-cart-btn pointer"
        >
          ADD TO CART
        </button>
        {data.product.product.description}
      </div>
    </div>
  );
}

export default Goods;
