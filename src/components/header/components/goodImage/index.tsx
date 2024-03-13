import React from "react";

export default class GoodsImage extends React.Component<{
  product: { gallery: string[]; prices: { amount: string }[] };
}> {
  render() {
    const { product } = this.props;
    return (
      <div className="cart-window-last-flex-element">
        <img
          className="cart-window-img"
          src={product.gallery[0]}
          alt="picture1"
        />
      </div>
    );
  }
}
