import React from "react";
import Good from "../components/goods";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY, GET_PRODUCT } from "../../../api/apiRequests";
import { useMatch, useParams } from "react-router-dom";
import {
  GET_LOCAL_CURRENCY,
  GET_LOCAL_SELECTED_GOOD_ID,
} from "../../../operations/queries";
import { mutations } from "../../../operations/mutations";
// import { connect } from "react-redux";
// import { setCurrency } from "../../store/Currency/actions";
// import { setGoods } from "../../store/ChoseGoods/actions";

// type Props = {
//   route: string;
// };

function GoodsContainer() {
  const params = useParams();

  console.log(params, "params from good");
  // const { loading, error, data } = useQuery(GET_CATEGORY, {
  //   variables: { input: { title: props.route } },
  // });
  const { setCurrency, setGoodId } = mutations;
  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);
  const stateSelectedItem = useQuery(GET_LOCAL_SELECTED_GOOD_ID);
  const { loading, data } = useQuery(GET_PRODUCT, {
    variables: { input: { id: params.productId } },
  });
  // id: "huarache-x-stussy-le"

  if (loading) return <>...Loading</>;
  console.log(data, "data000");

  return (
    <Good
      product={data.product.product}
      setCurrency={setCurrency}
      stateCurrency={currentCurrency.data.currency}
      stateSelectedItem={stateSelectedItem.data}
      setGoods={setGoodId}
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
