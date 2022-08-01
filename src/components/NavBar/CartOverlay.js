import { Component } from "react";

import styles from "./CartOverlay.module.css";

class CartOverlay extends Component {
  render() {
    return (
      <div className={styles["cart-overlay-container"]}>
        this is the cart overlay component !
      </div>
    );
  }
}

export default CartOverlay;
