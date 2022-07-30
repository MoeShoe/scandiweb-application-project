import { Component } from "react";
import { connect } from "react-redux";

import styles from "./ProductDesc.module.css";

class ProductDesc extends Component {
  render() {
    console.log(this.props.productData);
    return (
      <div className={styles["product-desc-container"]}>
        <div className={styles["images-container"]}>
          {this.props.productData?.gallery?.map((img, i) => (
            <div className={styles["image-select-container"]}>
              <img src={img} alt={`product ${i}`} key={i} />
            </div>
          ))}
        </div>
        <div className={styles["main-image-container"]}>
          <img src={this.props.productData?.gallery?.at(0)} alt="product" />
        </div>
        <div className={styles["description-container"]}>
          <div className={styles["brand"]}>{this.props.productData?.brand}</div>
          <div className={styles["name"]}>{this.props.productData?.name}</div>
          <div className={styles["attributes-main-container"]}>
            {this.props.productData?.attributes?.map((attr) => (
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
                </div>
              </div>
            ))}
          </div>
          <div className={styles["price-container"]}>
            <div className={styles["detail-title"]}>PRICE:</div>
            <div className={styles["price"]}>
              {`${this.props.currentCurrency.symbol}${
                this.props.productData?.prices?.find(
                  (cur) =>
                    cur.currency.label === this.props.currentCurrency.label
                )?.amount
              }`}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.productList.currency.currentCurrency,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDesc);
