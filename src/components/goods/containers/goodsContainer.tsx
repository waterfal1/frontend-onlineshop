import React from "react";
import Good from "../components/goods";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY } from "../../../api/apiRequests";
import { useMatch } from "react-router-dom";
// import { connect } from "react-redux";
// import { setCurrency } from "../../store/Currency/actions";
// import { setGoods } from "../../store/ChoseGoods/actions";

type Props = {
  route: string;
};

function GoodsContainer(props: Props) {
  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { input: { title: props.route } },
  });

  return (
    <Good
    //   setCurrency={this.props.setCurrency}
    //   stateCurrency={this.props.stateCurrency}
    //   stateSelectedItem={this.props.stateSelectedItem}
    //   setGoods={this.props.setGoods}
    />
  );
}

export default GoodsContainer;

// const mapStateToProps = (state: {
//   currency: { value: number };
//   categoryChanging: { value: string };
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

// export default connect(mapStateToProps, mapDispatchToProps)(GoodsContainer);
