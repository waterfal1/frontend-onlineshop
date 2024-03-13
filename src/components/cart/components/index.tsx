import React from "react";
import "./styles.css";
// import { query } from "../Home/getData";
// import GoodsInCart from "../../Components/Cart/Cart";
// import { goodsCollection } from "../../Components/functions";
// import { MyGoods } from "../Home/ProductsClass";

interface CartProps {
  stateCurrency: number;
  setCurrency: (value: number) => { type: string; payload: number };
  stateSelectedItem: number;
  setGoods: (value: number) => { type: string; payload: number };
}

function Cart() {
  //   constructor(props: CartProps) {
  //     super(props)
  //     this.state = {data: new MyGoods( {
  //           category: {
  //             __typename: '',
  //             name: '',
  //             products: [{
  //               id: '',
  //               name: '',
  //               inStock: '',
  //               gallery: [''],
  //               category: '',
  //               description: '',
  //               attributes: [{
  //                 id: '',
  //                 name: '',
  //                 items: [{
  //                   value: '',
  //                   displayValue: ''
  //                 }]
  //               }],
  //               prices: [{
  //                 __typename: '',
  //                 currency: '',
  //                 amount: '' }]
  //             }]
  //           }
  //         }), loading: false}
  //   }

  //   componentDidMount(): void {
  //     query(`
  //       query {
  //         category {
  //           products {
  //             id
  //             name
  //             gallery
  //             attributes {
  //               name
  //               items {
  //                 value
  //                 displayValue
  //               }
  //             }
  //             prices {
  //               currency
  //               amount
  //             }
  //           }
  //         }
  //       }
  //     `)
  //       .then(result => {
  //         this.setState({loading: true, data: new MyGoods(result.data)})
  //       })
  //   }

  const renderGoodsInCart = (length: number) => {
    if (length === 0) return <div className="cart-name">You cart is empty</div>;
    return (
      <GoodsInCart
        stateCurrency={this.props.stateCurrency}
        stateSelectedItem={this.props.stateSelectedItem}
        setGoods={this.props.setGoods}
        data={this.state.data.data.category}
      />
    );
  };

  //   if (!this.state.loading) return "....Loading";
  //   const goodsFromStorage = JSON.parse(
  //     sessionStorage.getItem("Goods") as string
  //   );
  //   const goodsAmount = goodsCollection(goodsFromStorage);
  return (
    <section>
      <div className="cart-name">Cart</div>
      {/* <div>{this.renderGoodsInCart(goodsAmount.length)}</div> */}
    </section>
  );
}

export default Cart;
