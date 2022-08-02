import { Component } from "react";

import styles from "./ProductDesc.module.css";
import ProductImages from "./ProductImages";
import ProductForm from "./ProductForm";

class ProductDesc extends Component {
  render() {
    const { gallery, ...formData } = this.props.productData;
    return (
      <div className={styles["product-desc-container"]}>
        {/* Displays product images */}
        <ProductImages imagesList={gallery} />

        {/* Displays product details and select attributes */}
        <ProductForm
          formData={{
            ...formData,
            currentCurrency: this.props.currentCurrency,
          }}
          addProductHandler={this.props.addProductHandler}
        />
      </div>
    );
  }
}

export default ProductDesc;
