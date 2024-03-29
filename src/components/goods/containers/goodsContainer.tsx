import React, { useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import Good from "../components/goods";
import { GET_PRODUCT } from "../../../api/apiRequests";
import Loading from "../../../pages/loading";
import DefaultErrorMessage from "../../../errorBoundary/defaultErrorMessage";
import { cartProductMapper } from "../../home/mappers";

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
