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
    <div className="good">
      <div className="good-photoColumn">
        {product.gallery.map((item: string, pictureIndex: number) => (
          <img
            key={pictureIndex}
            className="good-photoColumn__image"
            onClick={() => changeImage(pictureIndex)}
            src={item}
            alt=""
          />
        ))}
      </div>
      <img
        className="goods__mainPhoto"
        src={product.gallery[imageIndex]}
        alt=""
      />

      <GoodPropertiesContainer
        product={product}
        withDescription={true}
        adjustGoodAmount={false}
        price={<PriceComponent prices={product.prices} />}
      />
    </div>
  );
}

export default Goods;
