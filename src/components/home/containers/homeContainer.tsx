import React from "react";
import { useQuery } from "@apollo/client";
import Home from "../components";
import {
  GET_LOCAL_CATEGORY,
  GET_LOCAL_CURRENCY,
  GET_LOCAL_SELECTED_GOOD_ID,
} from "../../../operations/queries";
import { GET_CATEGORY } from "../../../api/apiRequests";
import { useParams } from "react-router-dom";

function HomeContainer() {
  const params = useParams();

  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);
  const currentCategory = useQuery(GET_LOCAL_CATEGORY);
  const selectedGoodId = useQuery(GET_LOCAL_SELECTED_GOOD_ID);

  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { input: { title: params.categoryName || "" } },
  });

  console.log(data, "nothing");

  if (loading) return <>...Loading</>;
  if (error) return <>`Error! ${error.toString()}`</>;

  return (
    <Home
      products={data.category.products}
      currentCurrency={currentCurrency.data.currency}
      currentCategory={currentCategory.data.category}
      selectedGoodId={selectedGoodId.data.selectedGoodId}
    />
  );
}

export default HomeContainer;
