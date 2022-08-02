import { Component } from "react";
import { withRouter } from "react-router-dom";

import styles from "./ProductItem.module.css";

class CategoryItem extends Component {
  productClickHandler(e) {
    //Guard Clause
    if (e?.target?.closest(`.${styles["add-product-to-cart-button"]}`)) return;

    this.props.history.push(`/products/${this.props.productId}`);
  }

  addProductHandler() {
    if (this.props.productData.attributes.length === 0) {
      this.props.addProductHandler(this.props.productId, true);
      return;
    }

    this.productClickHandler();
  }

  render() {
    const { name, brand, img, amount, inStock } = this.props.productData;
    return (
      <div
        className={`${styles["product-item-container"]} ${
          !inStock ? styles["product-out-of-stock"] : ""
        }`}
        onClick={this.productClickHandler.bind(this)}
      >
        <div className={styles["image-container"]}>
          <img src={img} alt="a pic" />
          <div
            className={styles["add-product-to-cart-button"]}
            onClick={this.addProductHandler.bind(this)}
          ></div>
        </div>
        <div className={styles["product-details"]}>
          <div className={styles["product-name"]}>{`${brand} ${name}`}</div>
          <div className={styles["product-price"]}>{amount}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(CategoryItem);
