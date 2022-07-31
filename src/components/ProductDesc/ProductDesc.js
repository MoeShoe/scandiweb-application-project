import { Component } from "react";

import styles from "./ProductDesc.module.css";
import ProductImages from "./ProductImages";
import ProductForm from "./ProductForm";

class ProductDesc extends Component {
  $onProductAdd(selectedAttributes) {
    this.props.onProductAdd(selectedAttributes);
  }

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
          onProductAdd={this.$onProductAdd.bind(this)}
        />
      </div>
    );
  }
}

export default ProductDesc;
