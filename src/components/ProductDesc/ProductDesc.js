import { Component } from "react";

import styles from "./ProductDesc.module.css";

class ProductDesc extends Component {
  render() {
    return (
      <div className={styles["product-desc-container"]}>
        This is the product description page!
      </div>
    );
  }
}

export default ProductDesc;
