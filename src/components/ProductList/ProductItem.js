import { Component } from "react";

import styles from "./ProductItem.module.css";

class CategoryItem extends Component {
  productClickHandler(e) {
    //Guard Clause
    // prevents this event from running when the user clicks the green add to cart button
    if (e?.target?.closest(`.${styles["add-product-to-cart-button"]}`)) return;
    this.props.productClickHandler(this.props.productData.id);
  }

  addProductHandler() {
    /* checks if the product has no attributes. if it does not, it gets added to the cart immediately
    else the user gets forwarded into the product's PDP dynamic route to choose its attributes */
    if (this.props.productData.attributes.length === 0) {
      this.props.addProductHandler(this.props.productData.id, true);
      return;
    }

    this.productClickHandler();
  }

  render() {
    const { name, brand, img, amount, inStock } = this.props.productData;
    return (
      <div
        className={`${styles["product-item-container"]} ${
          !inStock ? styles["product-out-of-stock"] : ""
        }`}
        onClick={this.productClickHandler.bind(this)}
      >
        {/* Product image */}
        <div className={styles["image-container"]}>
          <img src={img} alt="a pic" />
          <div
            className={styles["add-product-to-cart-button"]}
            onClick={this.addProductHandler.bind(this)}
          ></div>
        </div>

        {/* Product description */}
        <div className={styles["product-details"]}>
          <div className={styles["product-name"]}>{`${brand} ${name}`}</div>
          <div className={styles["product-price"]}>{amount}</div>
        </div>
      </div>
    );
  }
}

export default CategoryItem;
