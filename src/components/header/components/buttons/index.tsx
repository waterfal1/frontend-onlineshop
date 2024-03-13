import React from "react";
import { NavLink } from "react-router-dom";

export default class Buttons extends React.Component<{
  toggleCartWindow: () => void;
}> {
  render() {
    return (
      <div className="cart-window-buttons">
        <NavLink to="/cart">
          <button
            onClick={this.props.toggleCartWindow}
            className="cart-window-view-btn"
          >
            {" "}
            VIEW BAG
          </button>
        </NavLink>
        <button className="cart-window-checkout-btn"> CHECK OUT</button>
      </div>
    );
  }
}
