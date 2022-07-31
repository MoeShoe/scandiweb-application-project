import { Component } from "react";

import styles from "./CartList.module.css";
import CartItem from "./CartItem";
import Button from "../UI/Button";

class CartList extends Component {
  $onItemIncrement(itemId) {
    this.props.onItemIncrement(itemId);
  }

  $onItemDecrement(itemId) {
    this.props.onItemDecrement(itemId);
  }

  render() {
    const totalPrice = this.props.cartData
      .reduce(
        (acc, itm) =>
          acc +
          itm.item.prices.find(
            (pri) => pri.currency.label === this.props.currentCurrency.label
          ).amount *
            itm.quantity,
        0
      )
      .toFixed(2);

    const tax = (totalPrice * 0.21).toFixed(2);

    return (
      <div className={styles["cart-list-container"]}>
        <div className={styles["cart-header"]}>CART</div>
        <div className={styles["cart-items-container"]}>
          {this.props.cartData.length === 0 && (
            <div className={styles["no-items"]}>
              There are no Items in the Cart to show!
            </div>
          )}
          {this.props.cartData.map((itm) => (
            <CartItem
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
        <div className={styles["cart-summary-container"]}>
          <div className={styles["data-main-container"]}>
            <div className={styles["fields-container"]}>
              <div>Tax 21%:</div>
              <div>Quantity:</div>
              <div className={styles["total"]}>Total:</div>
            </div>
            <div className={styles["data-container"]}>
              <div>
                {this.props.currentCurrency.symbol}
                {tax}
              </div>
              <div>
                {this.props.cartData.reduce(
                  (acc, itm) => acc + itm.quantity,
                  0
                )}
              </div>
              <div>
                {this.props.currentCurrency.symbol}
                {totalPrice}
              </div>
            </div>
          </div>
          <Button
            className={styles["order-button"]}
            disabled={this.props.cartData.length === 0}
          >
            ORDER
          </Button>
        </div>
      </div>
    );
  }
}

export default CartList;
