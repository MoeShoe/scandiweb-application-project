import { Component } from "react";
import { connect } from "react-redux";

import styles from "./ProductDesc.module.css";
import ProductImages from "./ProductImages";
import ProductForm from "./ProductForm";

class ProductDesc extends Component {
  render() {
    console.log(this.props.productData);
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

const mapStateToProps = (state) => ({
  currentCurrency: state.productList.currency.currentCurrency,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDesc);
