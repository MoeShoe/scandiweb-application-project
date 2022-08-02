import { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./CartOverlay.module.css";
import CartOverlayItem from "./CartOverlayItem";
import Button from "../UI/Button";

class CartOverlay extends Component {
  itemIncrementHandler(productId) {
    this.props.onCartItemIncrement(productId);
  }

  itemDecrementHandler(productId) {
    this.props.onCartItemDecrement(productId);
  }

  render() {
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
          {this.props.cartData.length === 0 && (
            <div className={styles["empty-cart"]}>Start Shopping Now!</div>
          )}
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
        <div className={styles["total-container"]}>
          <div className={styles["total-header"]}>Total</div>
          <div className={styles["price"]}>
            {`${this.props.currentCurrency.symbol}${this.props.cartData
              .reduce(
                (acc, product) =>
                  acc +
                  product.quantity *
                    product.item.prices.find(
                      (pri) =>
                        pri.currency.label === this.props.currentCurrency.label
                    ).amount,
                0
              )
              .toFixed(2)}`}
          </div>
        </div>
        <div className={styles["actions-container"]}>
          <Link to="/cart">
            <Button className={styles["view-bag-button"]} id="view-bag">
              VIEW BAG
            </Button>
          </Link>
          <Button
            className={styles["checkout-button"]}
            disabled={this.props.cartData.length === 0}
          >
            CHECK OUT
          </Button>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
