import { Component } from "react";
import { connect } from "react-redux";

import styles from "./NavBar.module.css";
import { ReactComponent as Logo } from "../../assets/web-app-logo.svg";
import { ReactComponent as Cart } from "../../assets/cart.svg";
import { fetchProductList } from "../../store/product-list-slice/product-list-action-thunks";

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
        {/* i made the categories render dynamically from the backend
         to improve the scalability of the web-app */}
        <div
          className={`${styles["container"]} ${styles["categories-container"]}`}
        >
          {this.props.listOfCategories.map((cat) => (
            <div
              className={`${styles["category"]} ${
                this.props.currentCategory === cat.name &&
                styles["category-active"]
              }`}
              onClick={this.setCategory.bind(this, cat.name)}
              key={cat.name}
            >
              {cat.name.toUpperCase()}
            </div>
          ))}
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
  currentCategory: state.productList.category.currentCategory,
  listOfCategories: state.productList.category.listOfCategories,
});
const mapDispatchToProps = (dispatch) => ({
  setCategory(category) {
    dispatch(fetchProductList(category));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
