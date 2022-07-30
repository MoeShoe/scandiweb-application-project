import { Component } from "react";

import styles from "./ProductForm.module.css";
import Button from "../UI/Button";

class ProductForm extends Component {
  render() {
    const {
      brand,
      name,
      attributes,
      prices,
      description,
      currentCurrency,
      inStock,
    } = this.props.formData;
    return (
      <div className={styles["description-list-container"]}>
        <div className={styles["brand"]}>{brand}</div>
        <div className={styles["name"]}>{name}</div>
        <div className={styles["attributes-main-container"]}>
          {attributes?.map((attr) => (
            <div className={styles["attribute-container"]} key={attr.id}>
              <div className={styles["detail-title"]}>
                {attr.name.toUpperCase()}:
              </div>
              <div className={styles["attribute-select-container"]}>
                {attr.type === "text" &&
                  attr.items.map((itm) => (
                    <div className={styles["text-attr-select"]} key={itm.id}>
                      {itm.displayValue}
                    </div>
                  ))}

                {attr.type === "swatch" &&
                  attr.items.map((itm) => (
                    <div
                      className={styles["swatch-attr-select"]}
                      style={{ backgroundColor: itm.value }}
                      key={itm.id}
                    ></div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles["price-container"]}>
          <div className={styles["detail-title"]}>PRICE:</div>
          <div className={styles["price"]}>
            {`${currentCurrency.symbol}${
              prices?.find(
                (cur) => cur.currency.label === currentCurrency.label
              )?.amount
            }`}
          </div>
        </div>
        {inStock && <Button className={styles["button"]}>ADD TO CART</Button>}
        {!inStock && (
          <Button
            className={`${styles["button"]} ${styles["out-of-stock-button"]}`}
          >
            OUT OF STOCK
          </Button>
        )}
        <div
          className={styles["description-container"]}
          /* really only dangerous when inserting from an unknown source */
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        ></div>
      </div>
    );
  }
}

export default ProductForm;
