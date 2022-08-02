import { Component } from "react";

import styles from "./CartOverlayItem.module.css";

class CartOverLayItem extends Component {
  onItemIncrement() {
    this.props.itemIncrementHandler(this.props.itemData.id);
  }

  onItemDecrement() {
    this.props.itemDecrementHandler(this.props.itemData.id);
  }

  render() {
    const { brand, name, prices, attributes, gallery } = this.props.itemData;

    return (
      <div className={styles["cart-item-container"]}>
        <div className={styles["data-container"]}>
          {/* Name and Brand */}
          <div className={styles["header-container"]}>
            {brand} <br />
            {name}
          </div>

          {/* Price */}
          <div className={styles["price"]}>{`${
            this.props.currentCurrency.symbol
          }${
            prices.find(
              (pri) => pri.currency.label === this.props.currentCurrency.label
            ).amount
          }`}</div>

          {/* Attributes rendered dynamically */}
          <div className={styles["attributes-main-container"]}>
            {/* Attribute title */}
            {attributes.map((attr) => (
              <div className={styles["attribute-container"]} key={attr.id}>
                <div className={styles["detail-title"]}>{attr.name}:</div>

                {/* if Text attribute */}
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
                        {/* If the visibleText property is too long, 
                        it gets refactored into something more managable here */}
                        {(!parseInt(itm.displayValue) &&
                          itm.displayValue.length > 3 &&
                          itm.displayValue
                            .split(" ")
                            .map((str) => str[0])
                            .join("")
                            .toUpperCase()) ||
                          itm.displayValue}
                      </div>
                    ))}

                  {/* if Swatch attribute */}
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
          {/* Increment and Decrement actions */}
          <div className={styles["actions-container"]}>
            <button onClick={this.onItemIncrement.bind(this)}>
              <div className={styles["button-text"]}>+</div>
            </button>
            <div className={styles["quantity"]}>{this.props.quantity}</div>
            <button onClick={this.onItemDecrement.bind(this)}>
              <div
                className={styles["button-text"]}
                style={{ transform: "translateY(-2px)" }}
              >
                -
              </div>
            </button>
          </div>

          {/* Image */}
          <div className={styles["image-container"]}>
            <img src={gallery[0]} alt={name} />
          </div>
        </div>
      </div>
    );
  }
}

export default CartOverLayItem;
