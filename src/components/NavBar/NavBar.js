import { Component } from "react";

import styles from "./NavBar.module.css";

class NavBar extends Component {
  render() {
    return (
      <div className={styles["nav-bar-container"]}>
        <div className={styles["categories-container"]}>
          <div></div>
        </div>
        <div className={styles["web-app-logo-container"]}></div>
        <div className={styles["actions-container"]}></div>
      </div>
    );
  }
}

export default NavBar;
