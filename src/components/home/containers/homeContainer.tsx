import { useQuery } from "@apollo/client";
import React, { useState } from "react";

import Home from "../components";
import { addGoodsToStorage } from "../../../utils/goodsHelpers";
import { mutations } from "../../../operations/mutations";
import {
  GET_LOCAL_CATEGORY,
  GET_LOCAL_CURRENCY,
  GET_LOCAL_SELECTED_GOOD_ID,
} from "../../../operations/queries";
import { GET_CATEGORY } from "../../../api/apiRequests";

function HomeContainer() {
  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);
  const currentCategory = useQuery(GET_LOCAL_CATEGORY);
  const selectedGoodId = useQuery(GET_LOCAL_SELECTED_GOOD_ID);

  const [counter, setCounter] = useState(0);
  const [attributes, setAttributes] = useState([]);
  const { setCategory, setCurrency, setGoodId, addGood } = mutations;

  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { input: { title: "" } },
  });

  console.log(data, loading, error);

  const increment = (id: string, attributes: number[]): void => {
    addGoodsToStorage(id, attributes);
    setCounter((state) => state + 1);
    setGoodId();
  };

  const choseGoods = (input: string): void => {
    localStorage.setItem("goodsSelected", input);
    setCategory({ category: "" });
  };

  const productAttributes = (): void => {
    const products = data.category.products;
    // this.setState({ loadAttributes: true });
    // const result = productsAttributes(products);
    // setAttributes(result);
  };

  const changeClass = (): void => {
    const classChange = document.querySelector(".text-active");
    if (classChange === null) return;
    classChange.className = "navbar-link-block";
  };

  if (loading) return "...Loading";
  if (error) return `Error! ${error}`;

  return (
    <Home
      products={data.category.products}
      currentCurrency={currentCurrency.data.currency}
      currentCategory={currentCategory.data.category}
      selectedGoodId={selectedGoodId.data.selectedGoodId}
      actions={{
        setCurrency,
        setCategory,
        setGoodId,
      }}
      increment={increment}
    />
  );
}

export default HomeContainer;
