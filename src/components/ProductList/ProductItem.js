import { Component } from "react";

import styles from "./ProductItem.module.css";

class CategoryItem extends Component {
  render() {
    return (
      <div className={styles["product-item-container"]}>
        <img src="https://picsum.photos/1920/1080" alt="a pic" />
        <div className={styles["product-details"]}>
          <div className={styles["product-name"]}>
            Super Sonic Intecontinental Nuclear Capable Ballistic Missile
          </div>
          <div className={styles["product-price"]}>$50.00</div>
        </div>
      </div>
    );
  }
}

export default CategoryItem;
