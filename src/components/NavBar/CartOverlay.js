import { Component } from "react";

import styles from "./CartOverlay.module.css";
import CartOutlayItem from "./CartOutlayItem";

class CartOverlay extends Component {
  $onItemIncrement() {}
  $onItemDecrement() {}
  render() {
    console.log(this.props);
    return (
      <div className={styles["cart-overlay-container"]} data-isoverlay>
        <div className={styles["header"]}>
          <div className={styles["bag"]}>My Bag,</div>{" "}
          {this.props.cartData.reduce((acc, item) => acc + item.quantity, 0)}{" "}
          items
        </div>
        <div className={styles["cart-items-container"]}>
          {this.props.cartData.map((itm) => (
            <CartOutlayItem
              itemData={itm.item}
              itemSelectedAttributes={itm.selectedAttributes}
              quantity={itm.quantity}
              currentCurrency={this.props.currentCurrency}
              itemIncrementHandler={this.$onItemIncrement.bind(this)}
              itemDecrementHandler={this.$onItemDecrement.bind(this)}
              key={itm.item.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default CartOverlay;
