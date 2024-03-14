import React from "react";
import { Good } from "../../../../models/Product";
import AttributeName from "../attributeName";
import AttributeSelected from "../attributeSelected";

// import AttributeName from "./AttributeName";
// import AttributeSelected from "./AttributeSelected";
// import AttributeNonSelected from "./AttributeNonSelected";

type Props = {
  product: Good;
  //   attributeNonSelected: (
  //     productIndex: number,
  //     attributeIndex: number,
  //     index: number
  //   ) => void;
  //   attributeSelected: (
  //     productIndex: number,
  //     attributeIndex: number,
  //     index: number
  //   ) => void;
  //   loadAttributes: boolean;
  //   productIndex: number;
  //   product: {
  //     attributes: {
  //       id: string;
  //       name: string;
  //       items: { value: string; displayValue: string }[];
  //     }[];
  //   };
};

function AttributesRows(props: Props) {
  const { product } = props;

  return <></>;
}

export default AttributesRows;
