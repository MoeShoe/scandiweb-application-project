import { Component } from "react";

import styles from "./ProductList.module.css";
import ProductItem from "./ProductItem";

class ProductList extends Component {
  addProductHandler(product) {
    this.props.addProductHandler(product);
  }

  render() {
    return (
      <div className={styles["product-list-container"]}>
        {/* Current category name */}
        <div className={styles["category-name"]}>
          {this.props.category
            ?.at(0)
            ?.toUpperCase()
            ?.concat(this.props.category?.slice(1))}
        </div>

        {/* Products list */}
        <div className={styles["product-items-container"]}>
          {/* each product in the category is rendered into a ProductItem component */}
          {this.props.products.map((prod) => (
            <ProductItem
              productData={{
                ...prod,
                amount: `${this.props.currency.symbol}${
                  prod.prices.find(
                    (amt) => amt.currency.label === this.props.currency.label
                  ).amount
                }`,
                img: prod.gallery.at(0),
              }}
              addProductHandler={this.addProductHandler.bind(this, prod)}
              productClickHandler={this.props.productClickHandler}
              key={prod.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
