import { Component } from "react";

import styles from "./ProductDesc.module.css";

class ProductDesc extends Component {
  render() {
    console.log(this.props.productData);
    return (
      <div className={styles["product-desc-container"]}>
        <div className={styles["images-container"]}></div>
        <div className={styles["main-image-container"]}></div>
        <div className={styles["description-container"]}></div>
      </div>
    );
  }
}

export default ProductDesc;
