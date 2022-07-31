import { Component } from "react";

import styles from "./CartList.module.css";
import CartItem from "./CartItem";

class CartList extends Component {
  render() {
    console.log(this.props.cartData);
    return (
      <div className={styles["cart-list-container"]}>
        <div className={styles["cart-header"]}>CART</div>
        <div className={styles["cart-items-container"]}>
          {this.props.cartData.map((itm) => (
            <CartItem
              itemData={itm.item}
              itemSelectedAttributes={itm.selectedAttributes}
              quantity={itm.quantity}
              currentCurrency={this.props.currentCurrency}
              key={itm.item.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default CartList;
