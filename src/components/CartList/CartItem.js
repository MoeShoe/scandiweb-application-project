import { Component } from "react";
import { ReactComponent as ArrowHead } from "../../assets/arrow-head.svg";

import styles from "./CartItem.module.css";

class CartItem extends Component {
  constructor() {
    super();
    this.state = { displayedImageIndex: 0 };
  }

  $itemIncrementHandler() {
    this.props.itemIncrementHandler(this.props.itemData.id);
  }

  $itemDecrementHandler() {
    this.props.itemDecrementHandler(this.props.itemData.id);
  }

  leftClickHandler() {
    this.setState((prevState) => ({
      displayedImageIndex:
        prevState.displayedImageIndex - 1 >= 0
          ? prevState.displayedImageIndex - 1
          : this.props.itemData.gallery.length - 1,
    }));
  }

  rightClickHandler() {
    this.setState((prevState) => ({
      displayedImageIndex:
        prevState.displayedImageIndex + 1 !== this.props.itemData.gallery.length
          ? prevState.displayedImageIndex + 1
          : 0,
    }));
  }

  render() {
    return (
      <div className={styles["cart-item-container"]}>
        <div className={styles["attributes-details-container"]}>
          <div className={styles["brand-name"]}>
            {this.props.itemData.brand}
          </div>
          <div className={styles["item-name"]}>{this.props.itemData.name}</div>
          <div className={styles["item-price"]}>
            {`${this.props.currentCurrency.symbol}${
              this.props.itemData.prices.find(
                (pri) => pri.currency.label === this.props.currentCurrency.label
              ).amount
            }`}
          </div>
          <div className={styles["attributes-main-container"]}>
            {this.props.itemData.attributes.map((attr) => (
              <div className={styles["attribute-container"]} key={attr.id}>
                <div className={styles["detail-title"]}>
                  {attr.name.toUpperCase()}:
                </div>
                <div className={styles["attribute-select-container"]}>
                  {attr.type === "text" &&
                    attr.items.map((itm) => (
                      <div
                        className={`${styles["text-attr-select"]} ${
                          itm.id ===
                          this.props.itemSelectedAttributes.find(
                            (at) => at.id === attr.id
                          )?.selectedAttribute?.id
                            ? styles["text-attr-selected"]
                            : ""
                        }`}
                        key={itm.id}
                      >
                        {itm.displayValue}
                      </div>
                    ))}

                  {attr.type === "swatch" &&
                    attr.items.map((itm) => (
                      <div
                        className={`${styles["swatch-attr-select"]} ${
                          itm.id ===
                          this.props.itemSelectedAttributes.find(
                            (at) => at.id === attr.id
                          )?.selectedAttribute?.id
                            ? styles["swatch-attr-selected"]
                            : ""
                        }`}
                        style={{ backgroundColor: itm.value }}
                        key={itm.id}
                      ></div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles["image-main-container"]}>
          <div className={styles["actions-container"]}>
            <button onClick={this.$itemIncrementHandler.bind(this)}>
              <span>+</span>
            </button>
            <div className={styles["quantity"]}>{this.props.quantity}</div>
            <button onClick={this.$itemDecrementHandler.bind(this)}>
              <span style={{ transform: "translateY(-3.5px)" }}>-</span>
            </button>
          </div>
          <div className={styles["image-container"]}>
            <img
              src={this.props.itemData.gallery[this.state.displayedImageIndex]}
              alt={this.props.itemData.name}
            />
            <button
              className={styles["button-left"]}
              onClick={this.leftClickHandler.bind(this)}
              disabled={this.props.itemData.gallery.length === 1}
            >
              <ArrowHead />
            </button>
            <button
              className={styles["button-right"]}
              onClick={this.rightClickHandler.bind(this)}
              disabled={this.props.itemData.gallery.length === 1}
            >
              <ArrowHead />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
