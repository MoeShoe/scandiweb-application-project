import { Component } from "react";
import { connect } from "react-redux";

import styles from "./NavBar.module.css";
import { ReactComponent as Logo } from "../../assets/web-app-logo.svg";
import { ReactComponent as Cart } from "../../assets/cart.svg";
import { productListActions } from "../../store/product-list-slice/product-list-slice";
import { fetchProductList } from "../../store/product-list-slice/product-list-action-thunks";
import CurrencyToolTip from "./CurrencyOverlay";
import { uiSliceActions } from "../../store/ui-slice/ui-slice";

class NavBar extends Component {
  setCategory(category) {
    //Guard Clause
    if (category === this.props.currentCategory) return;

    this.props.setCategory(category);
  }

  currencyClickHandler(e) {
    //Guard Clause
    // outlay will not close if the user clicks on its scrollbar thanks to this
    if (e.target.hasAttribute("data-istooltip")) return;

    this.props.toggleCurrencyOutlay();
  }

  currencySelectHandler = (cur) => {
    //Guard Clause
    if (cur.label === this.props.currentCurrency.label) return;

    this.props.setCurrency(cur);
  };

  render() {
    return (
      <div className={styles["nav-bar-container"]}>
        {/* Categories */}
        {/* i made the available categories aswell as currencies render dynamically from
         the backend to improve the scalability of the web-app */}
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
          <div
            className={styles["action"]}
            onClick={this.currencyClickHandler.bind(this)}
            data-isaction
          >
            {this.props.currentCurrency.symbol}{" "}
            <span
              className={`${
                this.props.showCurrencyOutlay ? styles["flip-symbol"] : ""
              }`}
            >
              &#8964;
            </span>
            {this.props.showCurrencyOutlay && (
              <CurrencyToolTip
                listOfCurrencies={this.props.listOfCurrencies}
                onCurrencyClick={this.currencySelectHandler.bind(this)}
              />
            )}
          </div>
          <div className={styles["action"]} data-isaction>
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
  currentCurrency: state.productList.currency.currentCurrency,
  listOfCurrencies: state.productList.currency.listOfCurrencies,
  showCurrencyOutlay: state.ui.showCurrencyOutlay,
  showCartOutlay: state.ui.showCartOutlay,
});

const mapDispatchToProps = (dispatch) => ({
  setCategory(category) {
    dispatch(fetchProductList(category));
  },

  setCurrency(cur) {
    dispatch(productListActions.setCurrency(cur));
  },

  toggleCurrencyOutlay() {
    dispatch(uiSliceActions.toggleCurrencyOutlay());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
