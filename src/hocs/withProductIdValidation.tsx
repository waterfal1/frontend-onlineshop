import React, { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import NotFoundPage from "../pages/404/NotFoundPage";
import { IS_VALID_PRODUCT_ID } from "../api/apiRequests";
import Loading from "../pages/loading";

interface WithProductIdValidationProps {
  children: ReactNode;
}

const WithProductIdValidation: React.FC<WithProductIdValidationProps> = ({
  children,
}: WithProductIdValidationProps) => {
  const params = useParams();

  const { loading, error, data } = useQuery(IS_VALID_PRODUCT_ID, {
    variables: { input: { id: params.productId } },
  });

  if (loading) return <Loading />;

  if (!data.isValidProductId.isValidProductId || error) {
    return <NotFoundPage />;
  }

  return children;
};

export default WithProductIdValidation;
