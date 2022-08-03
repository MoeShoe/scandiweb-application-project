import { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./CartOverlay.module.css";
import CartOverlayItem from "./CartOverlayItem";
import Button from "../UI/Button";

class CartOverlay extends Component {
  render() {
    return (
      <div
        className={`${styles["cart-overlay-container"]} custom-scrollbar-container`}
        id="overlay"
      >
        {/* Header */}
        <div className={styles["header"]}>
          <span className={styles["bag"]}>My Bag,</span>{" "}
          {this.props.cartData.reduce((acc, item) => acc + item.quantity, 0)}{" "}
          items
        </div>

        {/* Content */}
        <div className={styles["cart-items-container"]}>
          {/* This show when the cart is empty */}
          {this.props.cartData.length === 0 && (
            <div className={styles["empty-cart"]}>Start Shopping Now!</div>
          )}

          {/* Renders products in the cart state into CartOverlayItem components */}
          {this.props.cartData.map((itm) => (
            <CartOverlayItem
              itemData={itm.item}
              itemSelectedAttributes={itm.selectedAttributes}
              quantity={itm.quantity}
              currentCurrency={this.props.currentCurrency}
              itemIncrementHandler={this.props.onCartItemIncrement}
              itemDecrementHandler={this.props.onCartItemDecrement}
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

        {/* Actions section */}
        <div className={styles["actions-container"]}>
          <Link to="/cart">
            <Button className={styles["view-bag-button"]} id="view-bag">
              VIEW BAG
            </Button>
          </Link>
          <Button
            className={styles["checkout-button"]}
            disabled={this.props.cartData.length === 0}
            onClick={this.props.orderSubmitHandler}
          >
            CHECK OUT
          </Button>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
