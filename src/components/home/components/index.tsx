import React from "react";
import InStock from "../../inStock";

import "./styles.css";

type Props = {
  currentCurrency: { currency: string };
  currentCategory: { category: string };
  products: any[];
  selectedGoodId: number;
  actions: any;
  increment: (id: string, attributes: number[]) => void;
};

function Home(props: Props) {
  const { currentCurrency, currentCategory } = props;
  return (
    <main>
      <div className="category-block-on-page">
        {props.products.map((item) => {
          return (
            <InStock
              key={item.id}
              product={item}
              attributes={item.attributes}
              currentCurrency={currentCurrency}
              increment={props.increment}
            />
          );
        })}
      </div>
    </main>
  );
}

export default Home;
