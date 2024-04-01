import React from "react";

import { Product } from "../../../../models/Product";
import PriceComponent from "../../../sharedComponents/price";
import GoodPropertiesContainer from "../../containers/GoodPropertiesContainer";

import "./styles.css";

type Props = {
  imageIndex: number;
  product: Product;
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

        <GoodPropertiesContainer
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
