import { Component } from "react";

import styles from "./ProductDesc.module.css";
import ProductImages from "./ProductImages";
import ProductForm from "./ProductForm";

class ProductDesc extends Component {
  render() {
    const { gallery, ...formData } = this.props.productData;
    return (
      <div className={styles["product-desc-container"]}>
        <ProductImages imagesList={gallery} />
        <ProductForm
          formData={{
            ...formData,
            currentCurrency: this.props.currentCurrency,
          }}
        />
      </div>
    );
  }
}

export default ProductDesc;
