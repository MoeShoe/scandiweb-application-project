import { Component } from "react";

import styles from "./CartOutlayItem.module.css";

class CartOutLayItem extends Component {
  render() {
    return (
      <div className={styles["cart-item-container"]}>
        {" "}
        <div className={styles["data-container"]}>
          <div className={styles["header-container"]}>
            {this.props.itemData.brand} <br />
            {this.props.itemData.name}
          </div>
          <div className={styles["price"]}>{`${
            this.props.currentCurrency.symbol
          }${
            this.props.itemData.prices.find(
              (pri) => pri.currency.label === this.props.currentCurrency.label
            ).amount
          }`}</div>
          <div className={styles["attributes-main-container"]}>
            {this.props.itemData.attributes.map((attr) => (
              <div className={styles["attribute-container"]} key={attr.id}>
                <div className={styles["detail-title"]}>{attr.name}:</div>
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
        <div className={styles["image-container"]}></div>
      </div>
    );
  }
}

export default CartOutLayItem;
