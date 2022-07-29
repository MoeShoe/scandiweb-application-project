import { Component } from "react";
import { withRouter } from "react-router-dom";

import styles from "./ProductItem.module.css";

class CategoryItem extends Component {
  productClickHandler() {
    this.props.history.push(`/products/${this.props.productId}`);
  }

  render() {
    return (
      <div
        className={`${styles["product-item-container"]} ${
          !this.props.inStock ? styles["product-out-of-stock"] : ""
        }`}
        onClick={this.productClickHandler.bind(this)}
      >
        <div className={styles["image-container"]}>
          <img src={this.props.img} alt="a pic" />
        </div>
        <div className={styles["product-details"]}>
          <div className={styles["product-name"]}>{this.props.name}</div>
          <div className={styles["product-price"]}>{this.props.amount}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(CategoryItem);
