import { Component } from "react";
import { connect } from "react-redux";

import styles from "./ProductList.module.css";
import ProductItem from "./ProductItem";

class ProductList extends Component {
  render() {
    return (
      <div className={styles["product-list-container"]}>
        <div className={styles["category-name"]}>
          {this.props.category[0]
            .toUpperCase()
            .concat(this.props.category.slice(1))}
        </div>
        <div className={styles["product-items-container"]}>
          {this.props.products.map((prod) => (
            <ProductItem key={prod.id} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productList.products,
  category: state.productList.currentCategory,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
