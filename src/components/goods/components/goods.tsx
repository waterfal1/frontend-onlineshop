import React from "react";

import { CartProduct } from "../../../models/CartProduct";
import PriceComponent from "../../sharedComponents/price";
import SelectPropertiesContainer from "../../sharedComponents/selectProperties";

import "./styles.css";

type Props = {
  imageIndex: number;
  product: CartProduct;
  changeImage: (index: number) => void;
};

function Goods(props: Props) {
  const { imageIndex, product, changeImage } = props;
  return (
    <>
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

        <SelectPropertiesContainer
          product={product}
          withDescription={true}
          adjustGoodAmount={false}
          price={<PriceComponent prices={product.prices} />}
        />
      </div>
    </>
  );
}

export default Goods;
