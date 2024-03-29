import React, { useCallback } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import Home from "../components";
import { GET_LOCAL_CURRENCY } from "../../../operations/queries";
import { GET_CATEGORY } from "../../../api/apiRequests";
import Loading from "../../../pages/loading";
import DefaultErrorMessage from "../../../errorBoundary/defaultErrorMessage";
import { Product } from "../../../models/Product";
import { cartProductMapper } from "../mappers";
import { cartService } from "../../../businessLayer";
import { useUpdateCart } from "../../../services/useUpdateCartItems";
import { CartProduct } from "../../../models/CartProduct";

function HomeContainer() {
  const params = useParams();
  const { updateCartItems } = useUpdateCart();

  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);

  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { input: { title: params.categoryName || "" } },
  });

  const addGoodToCartHandler = useCallback(
    (item: CartProduct) => {
      if (item.inStock) {
        cartService.setItemAmountUp(item);
        updateCartItems();
      }
    },
    [updateCartItems]
  );

  if (error && !loading && !data) return <DefaultErrorMessage />;
  if (loading) return <Loading />;

  const renderData = data.category.products.map((d: Product) =>
    cartProductMapper(d)
  );

  return (
    <Home
      products={renderData}
      categoryName={params.categoryName}
      currentCurrency={currentCurrency.data.currency}
      addGoodToCart={addGoodToCartHandler}
    />
  );
}

export default HomeContainer;
