import { useQuery } from "@apollo/client";
import React, { ReactNode } from "react";
import { useParams } from "react-router-dom";

import { IS_VALID_CATEGORY } from "../api/apiRequests";
import Notfoundpage from "../pages/404/NotFoundPage";

interface WithCategoryValidationProps {
  children: ReactNode;
}

const WithCategoryValidation: React.FC<WithCategoryValidationProps> = ({
  children,
}: WithCategoryValidationProps) => {
  const params = useParams();

  const { loading, error, data } = useQuery(IS_VALID_CATEGORY, {
    variables: { input: { title: params.categoryName } },
  });

  if (loading) return;
  if (!data.isValidCategory.isValidCategory || error) {
    return <Notfoundpage />;
  }

  return children;
};

export default WithCategoryValidation;
