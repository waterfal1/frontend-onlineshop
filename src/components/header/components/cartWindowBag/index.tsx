import React from "react";

export default class CartWindowBag extends React.Component<{ amount: number }> {
  render() {
    return (
      <p className="cart-window-bag">
        <strong>My Bag,</strong>
        {this.props.amount} items
      </p>
    );
  }
}
