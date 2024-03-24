import React, { ReactNode } from "react";
import { useParams } from "react-router-dom";
import Notfoundpage from "../pages/NotFoundPage";
import { IS_VALID_CATEGORY, IS_VALID_PRODUCT_ID } from "../api/apiRequests";
import { useQuery } from "@apollo/client";

interface WithProductIdValidationProps {
  children: ReactNode;
}

const WithProductIdValidation: React.FC<WithProductIdValidationProps> = ({
  children,
}: WithProductIdValidationProps) => {
  const params = useParams();
  console.log(params, "pppararams");

  const { loading, error, data } = useQuery(IS_VALID_PRODUCT_ID, {
    variables: { input: { id: params.productId } },
  });

  if (loading) return;
  console.log(params.productId, "222", data);
  if (!data.isValidProductId.isValidProductId || error) {
    return <Notfoundpage />;
  }

  return children;
};

export default WithProductIdValidation;
