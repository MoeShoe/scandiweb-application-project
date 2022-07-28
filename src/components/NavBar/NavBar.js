import { Component } from "react";
import { connect } from "react-redux";

import styles from "./NavBar.module.css";
import { ReactComponent as Logo } from "../../assets/web-app-logo.svg";
import { ReactComponent as Cart } from "../../assets/cart.svg";
import fetchProductList from "../../store/product-list-slice/product-list-action-thunk";

class NavBar extends Component {
  setCategory(category) {
    //Guard Clause
    if (category === this.props.currentCategory) return;

    this.props.setCategory(category);
  }

  render() {
    return (
      <div className={styles["nav-bar-container"]}>
        {/* Categories */}
        {/* I considered making categories render dynamically from the API  to improve scalability 
        but i decided against it to avoid over-engineering, my thought process was that in a real
        life project, if we decide to add more categories, we'll have to redesign the categories select UI */}
        <div
          className={`${styles["container"]} ${styles["categories-container"]}`}
        >
          <div
            className={`${styles["category"]} ${
              this.props.currentCategory === "all" && styles["category-active"]
            }`}
            onClick={this.setCategory.bind(this, "all")}
          >
            ALL
          </div>
          <div
            className={`${styles["category"]} ${
              this.props.currentCategory === "clothes" &&
              styles["category-active"]
            }`}
            onClick={this.setCategory.bind(this, "clothes")}
          >
            CLOTHES
          </div>
          <div
            className={`${styles["category"]} ${
              this.props.currentCategory === "tech" && styles["category-active"]
            }`}
            onClick={this.setCategory.bind(this, "tech")}
          >
            TECH
          </div>
        </div>

        {/* Logo */}
        <div
          className={`${styles["container"]} ${styles["web-app-logo-container"]}`}
        >
          <Logo />
        </div>

        {/* Actions */}
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

const mapStateToProps = (state) => ({
  currentCategory: state.productList.currentCategory,
});
const mapDispatchToProps = (dispatch) => ({
  setCategory(category) {
    dispatch(fetchProductList(category));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
