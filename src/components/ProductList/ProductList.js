import { Component } from "react";

import styles from "./ProductList.module.css";
import ProductItem from "./ProductItem";

class ProductList extends Component {
  render() {
    return (
      <div className={styles["product-list-container"]}>
        {/* Current category name */}
        <div className={styles["category-name"]}>
          {this.props.category[0]
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
              addProductHandler={this.props.addProductHandler}
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
