import { useQuery } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import { GET_PRODUCT } from "../../../api/apiRequests";
import DefaultErrorMessage from "../../../errorBoundary/defaultErrorMessage";
import Loading from "../../../pages/loading";
import { cartProductMapper } from "../../home/mappers";
import Good from "../components/goods";

function GoodsContainer() {
  const params = useParams();

  const { loading, data, error } = useQuery(GET_PRODUCT, {
    variables: { input: { id: params.productId } },
  });

  const [imageIndex, setImageIndex] = useState<number>(0);

  const changeImage = useCallback((index: number): void => {
    setImageIndex(index);
  }, []);

  if (loading) return <Loading />;
  if (error) return <DefaultErrorMessage />;

  const renderData = cartProductMapper(data.product);

  return (
    <Good
      imageIndex={imageIndex}
      product={renderData}
      changeImage={changeImage}
    />
  );
}

export default GoodsContainer;
