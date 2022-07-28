import { Component } from "react";

import styles from "./NavBar.module.css";
import { ReactComponent as Logo } from "../../assets/web-app-logo.svg";
import { ReactComponent as Cart } from "../../assets/cart.svg";

class NavBar extends Component {
  render() {
    return (
      <div className={styles["nav-bar-container"]}>
        {/*TODO, actually.. i'll do just that! * I thought about making categories render dynamically from the API but i
        decided against it to avoid over-engineering */}
        <div
          className={`${styles["container"]} ${styles["categories-container"]}`}
        >
          <div className={`${styles["category"]} ${styles["category-active"]}`}>
            ALL
          </div>
          <div className={styles["category"]}>CLOTHES</div>
          <div className={styles["category"]}>TECH</div>
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
            $ <span>&#8964;</span>
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
