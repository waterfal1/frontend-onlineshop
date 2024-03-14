import React from "react";

type Props = {
  product: { gallery: string[] };
  imageState: number;
};

function MainPhoto(props: Props) {
  const { product, imageState } = props;
  return (
    <div className="goods-page-main-photo">
      <img
        className="goods-page-main-photo-flex"
        src={product.gallery[imageState]}
        alt="picture2"
      />
    </div>
  );
}

export default MainPhoto;
