import { useQuery } from "@apollo/client";
import React, { useCallback } from "react";
import { useParams } from "react-router-dom";

import { GET_CATEGORY } from "../../../api/apiRequests";
import { cartService } from "../../../businessLayer";
import DefaultErrorMessage from "../../../errorBoundary/defaultErrorMessage";
import { Product } from "../../../models/Product";
import { GET_LOCAL_CURRENCY } from "../../../operations/queries";
import Loading from "../../../pages/loading";
import { useUpdateCart } from "../../../services/useUpdateCartItems";
import Home from "../components";
import { cartProductMapper } from "../mappers";

function HomeContainer() {
  const params = useParams();
  const { updateCartItems } = useUpdateCart();

  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);

  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { input: { title: params.categoryName || "" } },
  });

  const addGoodToCartHandler = useCallback(
    (item: Product) => {
      if (item.inStock) {
        const cartItem = cartProductMapper(item);
        cartService.setItemAmountUp(cartItem);
        updateCartItems();
      }
    },
    [updateCartItems]
  );

  if (error && !loading && !data) return <DefaultErrorMessage />;
  if (loading) return <Loading />;

  return (
    <Home
      products={data.category.products}
      categoryName={params.categoryName}
      currentCurrency={currentCurrency.data.currency}
      addGoodToCart={addGoodToCartHandler}
    />
  );
}

export default HomeContainer;
