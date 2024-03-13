import React, { useState } from "react";

import { useQuery } from "@apollo/client";
import CartWindowBag from "../cartWindowBag";
import GoodsAttributes from "../goodsAttributes";
import TotalCost from "../totalCost";
import Buttons from "../buttons";
import { GET_ALL_DATA } from "../../../../api/apiRequests";
import { mutations } from "../../../../operations/mutations";

type Props = {
  stateCurrency: { currency: string };
  setCurrency: (value: { currency: string }) => void;
  toggleCartWindow: () => void;
  stateSelectedItem: number;
  setGoods: (value: { selectedGoodId: number }) => void;
};

function CartMenu(props: Props) {
  const { setGoods, stateCurrency, stateSelectedItem, toggleCartWindow } =
    props;
  const { data, loading, error } = useQuery(GET_ALL_DATA);

  const { deleteGood } = mutations;

  const [attribute, setAttribute] = useState({ attribute: 0 });

  const setAmountUp = (
    productIndexes: (string | number[][] | number)[]
  ): void => {
    // amountUpHelper(productIndexes);
    setGoods({ selectedGoodId: stateSelectedItem + 1 });
  };

  const setAmountDown = (
    productIndexes: (string | number[][] | number)[]
  ): void | undefined => {
    // const goods = deleteGood(productIndexes);
    // sessionStorage.removeItem("Goods");
    // sessionStorage.setItem("Goods", JSON.stringify(goods));
    setGoods({ selectedGoodId: stateSelectedItem + 1 });
  };

  const attributeSelected = (index: number): void => {
    setAttribute({ attribute: index });
  };

  // finding indexes of goods in order to find goods cost and after that cost counting
  //   const totalCost = (goods: (string | number[][] | number)[][]): string => {
  //     const products = this.state.data.data.category.products;
  //     const result = _.flatten(
  //       goods.map((item) => {
  //         return products
  //           .map(
  //             (
  //               el: {
  //                 id: string;
  //                 name: string;
  //                 gallery: string[];
  //                 prices: { amount: string; currency: string }[];
  //               },
  //               index: number
  //             ) => {
  //               if (item[0] === el.id) return index;
  //             }
  //           )
  //           .filter((value: number) => value || value === 0);
  //       })
  //     );
  //     return (
  //       result
  //         // @ts-ignore
  //         .map(
  //           (item: number, index: number) =>
  //             products[item].prices[this.props.stateCurrency].amount *
  //             goods[index][2]
  //         )
  //         .reduce(
  //           (acumulator: number, current: number) => acumulator + current,
  //           0
  //         )
  //         .toFixed(2)
  //     );
  //   };

  // const goodsFromStorage = JSON.parse(
  //   sessionStorage.getItem("Goods") as string
  // );
  // const goodsAmount = goodsCollection(goodsFromStorage);

  // const products = this.state.data.data.category.products;
  // const stateCurrency = this.props.stateCurrency;
  // const totalCost = this.totalCost(goodsAmount);
  // const productsIndexes = searchIndexes(goodsAmount, products);

  if (loading) return "...Loading";

  return (
    <div className="cart-window">
      <CartWindowBag amount={0} />
      <GoodsAttributes
        attributeSelected={attributeSelected}
        // goodsAmount={goodsAmount}
        // setAmountUp={this.setAmountUp}
        // setAmountDown={this.setAmountDown}
        // stateCurrency={stateCurrency}
        // productsIndexes={productsIndexes}
        // products={products}
      />
      <TotalCost totalCost={"10000"} />
      <Buttons toggleCartWindow={toggleCartWindow} />
    </div>
  );
}

export default CartMenu;
