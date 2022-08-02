import { Component } from "react";

import styles from "./ProductList.module.css";
import ProductItem from "./ProductItem";

class ProductList extends Component {
  render() {
    return (
      <>
        <div className={styles["product-list-container"]}>
          <div className={styles["category-name"]}>
            {this.props.category[0]
              ?.toUpperCase()
              ?.concat(this.props.category?.slice(1))}
          </div>
          <div className={styles["product-items-container"]}>
            {this.props.products.map((prod) => (
              <ProductItem
                productData={{
                  name: prod.name,
                  brand: prod.brand,
                  amount: `${this.props.currency.symbol}${
                    prod.prices.find(
                      (amt) => amt.currency.label === this.props.currency.label
                    ).amount
                  }`,
                  img: prod.gallery.at(0),
                  attributes: prod.attributes,
                  inStock: prod.inStock,
                }}
                addProductHandler={this.props.addProductHandler}
                productId={prod.id}
                key={prod.id}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default ProductList;
