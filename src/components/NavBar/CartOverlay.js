import { Component } from "react";

import styles from "./CartOverlay.module.css";
import CartOverlayItem from "./CartOverlayItem";

class CartOverlay extends Component {
  itemIncrementHandler(productId) {
    this.props.onCartItemIncrement(productId);
  }

  itemDecrementHandler(productId) {
    this.props.onCartItemDecrement(productId);
  }

  render() {
    console.log(this.props);
    return (
      <div
        className={`${styles["cart-overlay-container"]} custom-scrollbar-container`}
        id="overlay"
      >
        <div className={styles["header"]}>
          <div className={styles["bag"]}>My Bag,</div>{" "}
          {this.props.cartData.reduce((acc, item) => acc + item.quantity, 0)}{" "}
          items
        </div>
        <div className={styles["cart-items-container"]}>
          {this.props.cartData.map((itm) => (
            <CartOverlayItem
              itemData={itm.item}
              itemSelectedAttributes={itm.selectedAttributes}
              quantity={itm.quantity}
              currentCurrency={this.props.currentCurrency}
              itemIncrementHandler={this.itemIncrementHandler.bind(this)}
              itemDecrementHandler={this.itemDecrementHandler.bind(this)}
              key={itm.item.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default CartOverlay;
