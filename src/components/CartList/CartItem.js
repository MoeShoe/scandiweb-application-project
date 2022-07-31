import { Component } from "react";
import { ReactComponent as ArrowHead } from "../../assets/arrow-head.svg";

import styles from "./CartItem.module.css";

class CartItem extends Component {
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
            <button>
              <span>+</span>
            </button>
            <div className={styles["quantity"]}>{this.props.quantity}</div>
            <button>
              <span style={{ transform: "translateY(-5px)" }}>-</span>
            </button>
          </div>
          <div className={styles["image-container"]}>
            <img
              src={this.props.itemData.gallery[0]}
              alt={this.props.itemData.name}
            />
            <button className={styles["button-left"]}>
              <ArrowHead />
            </button>
            <button className={styles["button-right"]}>
              <ArrowHead />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
