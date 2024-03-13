import React from "react";
import "../../Pages/Goods/Goods.styles.scss";

type Props = {
  product: { gallery: string[] };
  changeImage: (index: number) => void;
};

function PhotoColumn(props: Props) {
  const { product, changeImage } = props;

  const renderImages = (
    gallery: string[],
    changeImage: (index: number) => void
  ) => {
    return gallery.map((item: string, pictureIndex: number) => (
      <img
        key={pictureIndex}
        className="small-img pointer"
        onClick={() => changeImage(pictureIndex)}
        src={item}
        alt="picture1"
      />
    ));
  };

  //   const { product, changeImage } = this.props;
  return (
    <div className="goods-page-photo-column">
      {renderImages(product.gallery, changeImage)}
    </div>
  );
}

export default PhotoColumn;
