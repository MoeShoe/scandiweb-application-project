import { Component } from "react";

import styles from "./ProductItem.module.css";

class CategoryItem extends Component {
  render() {
    return (
      <div className={styles["product-item-container"]}>
        <img src={this.props.img} alt="a pic" />
        <div className={styles["product-details"]}>
          <div className={styles["product-name"]}>{this.props.name}</div>
          <div className={styles["product-price"]}>{this.props.amount}</div>
        </div>
      </div>
    );
  }
}

export default CategoryItem;
