import React from "react";

export default class TotalCost extends React.Component<{ totalCost: string }> {
  render() {
    return (
      <div className="cart-window-total-cost">
        <p>Total</p>
        <p>
          {/* {sessionStorage.getItem("Currency") ? (
            sessionStorage.getItem("Currency")
          ) : (
            <>&#36;</>
          )} */}
          {this.props.totalCost}
        </p>
      </div>
    );
  }
}
