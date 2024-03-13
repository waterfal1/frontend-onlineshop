import React from "react";
import Cart from "../components";
// import { connect } from "react-redux";
// import { setCurrency } from "../../store/Currency/actions";
// import { setGoods } from "../../store/ChoseGoods/actions";

function CartContainer() {
  //   setCurrency: (value: number) => { type: string; payload: number };
  //   stateCurrency: number;
  //   categoryThings: string;
  //   stateSelectedItem: number;
  //   setGoods: (value: number) => { type: string; payload: number };
  return (
    <Cart
    //   setCurrency={this.props.setCurrency}
    //   stateCurrency={this.props.stateCurrency}
    //   setGoods={this.props.setGoods}
    //   stateSelectedItem={this.props.stateSelectedItem}
    />
  );
}

// const mapStateToProps = (state: {
//   currency: { value: number };
//   selectedItem: { value: number };
// }) => {
//   return {
//     stateCurrency: state.currency.value,
//     stateSelectedItem: state.selectedItem.value,
//   };
// };

// const mapDispatchToProps = {
//   setCurrency,
//   setGoods,
// };

export default CartContainer;
