import { Component } from "react";

import styles from "./NavBar.module.css";
import { ReactComponent as Logo } from "../../assets/web-app-logo.svg";
import { ReactComponent as Cart } from "../../assets/cart.svg";

class NavBar extends Component {
  render() {
    return (
      <div className={styles["nav-bar-container"]}>
        <div
          className={`${styles["container"]} ${styles["categories-container"]}`}
        >
          <div className={`${styles["category"]} ${styles["category-active"]}`}>
            WOMEN
          </div>
          <div className={styles["category"]}>MEN</div>
          <div className={styles["category"]}>KIDS</div>
        </div>

        <div
          className={`${styles["container"]} ${styles["web-app-logo-container"]}`}
        >
          <Logo />
        </div>

        <div
          className={`${styles["container"]} ${styles["actions-container"]}`}
        >
          <div className={styles["action"]}>
            $ <span style={{}}>&#8964;</span>
          </div>
          <div className={styles["action"]}>
            <Cart />
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
