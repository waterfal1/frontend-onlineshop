import React, { useCallback, useEffect, useState } from "react";
import Good from "../components/goods";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../../../api/apiRequests";
import { useParams } from "react-router-dom";
import { GET_LOCAL_CURRENCY } from "../../../operations/queries";
import Loading from "../../../pages/loading";
import DefaultErrorMessage from "../../../errorBoundary/defaultErrorMessage";
import { useUpdateCart } from "../../../services/useUpdateCartItems";
import { Product } from "../../../models/Product";
import { cartProductMapper } from "../../home/mappers";
import { Attribute } from "../../../models/Attribute";
import { cartService } from "../../../businessLayer";

function GoodsContainer() {
  const params = useParams();

  const { updateCartItems } = useUpdateCart();

  const currentCurrency = useQuery(GET_LOCAL_CURRENCY);
  const { loading, data, error } = useQuery(GET_PRODUCT, {
    variables: { input: { id: params.productId } },
  });

  const [imageIndex, setImageIndex] = useState<number>(0);
  const [selectedAttributes, setSelectedAttributes] = useState<number[]>([0]);

  useEffect(() => {
    if (data) {
      setSelectedAttributes(
        new Array(data?.product?.attributes?.length).fill(0)
      );
    }
  }, [data]);

  const changeImage = useCallback((index: number): void => {
    setImageIndex(index);
  }, []);

  const addToCartHandler = useCallback(
    (item: Product): void => {
      const cartProduct = cartProductMapper(item);
      cartProduct.values = item.attributes.reduce(
        (acc: { [key: string]: string }, curr: Attribute, index: number) => {
          acc[curr.id] =
            curr.items[selectedAttributes[index]].value ||
            curr.items[selectedAttributes[index]].displayValue;
          return acc;
        },
        {}
      );
      cartService.setItemAmountUp(cartProduct);
      updateCartItems();
    },
    [selectedAttributes, updateCartItems]
  );

  const selectAttributeHandler = useCallback(
    (attrIndex: number, attrPropertyIndex: number) => {
      setSelectedAttributes((state) => {
        const newState = [...state];
        newState[attrIndex] = attrPropertyIndex;
        return newState;
      });
    },
    []
  );

  if (loading) return <Loading />;
  if (error) return <DefaultErrorMessage />;

  return (
    <Good
      currentCurrency={currentCurrency.data.currency}
      imageIndex={imageIndex}
      product={data.product}
      selectedAttributes={selectedAttributes}
      addToCart={addToCartHandler}
      changeImage={changeImage}
      selectAttribute={selectAttributeHandler}
    />
  );
}

export default GoodsContainer;
