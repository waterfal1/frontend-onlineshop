import React, { useCallback } from "react";
import { useQuery } from "@apollo/client";
import Home from "../components";
import { GET_LOCAL_CURRENCY } from "../../../operations/queries";
import { GET_CATEGORY } from "../../../api/apiRequests";
import { useParams } from "react-router-dom";
import Loading from "../../../pages/loading";
import DefaultErrorMessage from "../../../errorBoundary/defaultErrorMessage";
import { Product } from "../../../models/Product";
import { cartProductMapper } from "../mappers";
import { cartService } from "../../../businessLayer";
import { useUpdateCart } from "../../../services/useUpdateCartItems";

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
        const cartProduct = cartProductMapper(item);
        cartService.setItemAmountUp(cartProduct);
        updateCartItems();
      }
    },
    [updateCartItems]
  );

  if (error) return <DefaultErrorMessage />;
  if (loading) return <Loading />;

  return (
    <Home
      products={data.category.products}
      currentCurrency={currentCurrency.data.currency}
      addGoodToCart={addGoodToCartHandler}
    />
  );
}

export default HomeContainer;
