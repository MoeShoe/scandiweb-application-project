import { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import styles from "./NavBar.module.css";
import CurrencyOverlay from "./CurrencyOverlay";
import CartOverlay from "./CartOverlay";
import { ReactComponent as Logo } from "../../assets/web-app-logo.svg";
import { ReactComponent as Cart } from "../../assets/cart.svg";

import { productListActions } from "../../store/product-list-slice/product-list-slice";
import { cartActions } from "../../store/cart-slice/cart-slice";
import { uiActions } from "../../store/ui-slice/ui-slice";

class NavBar extends Component {
  componentDidMount() {
    // it made sense to put this in the navbar where categories are selected

    // gets the specified category in the search params
    const categorySearchParam =
      new URLSearchParams(this.props.location.search).get("category") || "all";

    // and applies it
    this.props.setCategory({
      name: categorySearchParam,
      hasBeenFetched: false,
    });
  }

  setCategory(category) {
    // sets the clicked category
    this.props.setCategory({
      ...this.props.listOfCategories.find((cat) => cat.name === category),
    });

    // sets query paramters for category
    if (category !== "all") {
      this.props.history.push(`/?category=${category}`);
      return;
    }

    this.props.history.push("/");
  }

  currencyClickHandler(e) {
    //Guard Clause
    // OverLay will not close if the user clicks on its scrollbar thanks to this
    if (e.target.closest("#overlay")) return;

    this.props.toggleCurrencyOverLay();
  }

  currencySelectHandler = (cur) => {
    //Guard Clause
    if (cur.label === this.props.currentCurrency.label) return;

    this.props.setCurrency(cur);
    this.props.toggleCurrencyOverLay();
  };

  cartClickHandler(e) {
    // Cart overlay also closes when the user click viewbag button
    if (e.target.closest("#overlay") && !(e.target.id === "view-bag")) return;

    this.props.toggleCartOverLay();
  }

  orderSubmitHandler() {
    window.alert("purchase successful!");

    this.props.onOrderSubmit();
  }

  render() {
    const itemCount = this.props.cartData.reduce(
      (acc, itm) => acc + itm.quantity,
      0
    );
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
          <Link to="/" onClick={() => this.props.setCategory("all")}>
            <Logo />
          </Link>
        </div>

        {/* Actions */}
        <div
          className={`${styles["container"]} ${styles["actions-container"]}`}
        >
          {/* Change currency action */}
          <div
            className={styles["action"]}
            onClick={this.currencyClickHandler.bind(this)}
            data-isaction // used to prevent close overlay event from happening
          >
            <div className={styles["action-icon"]}>
              {this.props.currentCurrency.symbol}{" "}
              <span
                className={`${
                  this.props.showCurrencyOverLay ? styles["flip-symbol"] : ""
                }`}
              >
                &#8964;
              </span>
            </div>
            {this.props.showCurrencyOverLay && (
              <CurrencyOverlay
                listOfCurrencies={this.props.listOfCurrencies}
                onCurrencyClick={this.currencySelectHandler.bind(this)}
              />
            )}
          </div>

          {/* Open mini-cart action */}
          <div
            className={styles["action"]}
            onClick={this.cartClickHandler.bind(this)}
            data-isaction
          >
            <div
              className={`${styles["action-icon"]} ${
                //hides the item count if it's 0
                itemCount ? styles["cart-action"] : ""
              } `}
              // cart count is a pseudo element that uses this attribute to show its value
              data-cart-item-count={itemCount}
            >
              <Cart />
            </div>

            {this.props.showCartOverLay && (
              <CartOverlay
                cartData={this.props.cartData}
                currentCurrency={this.props.currentCurrency}
                onCartItemIncrement={this.props.cartIncrementHandler}
                onCartItemDecrement={this.props.cartDecrementHandler}
                orderSubmitHandler={this.orderSubmitHandler.bind(this)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // categories state
  currentCategory: state.productList.category.currentCategory.name,
  listOfCategories: state.productList.category.listOfCategories,
  //currencies state
  currentCurrency: state.productList.currency.currentCurrency,
  listOfCurrencies: state.productList.currency.listOfCurrencies,
  //UI state
  showCurrencyOverLay: state.ui.showCurrencyOverLay,
  showCartOverLay: state.ui.showCartOverLay,
  //Cart State
  cartData: state.cart.products,
});

const mapDispatchToProps = (dispatch) => ({
  setCategory(category) {
    dispatch(productListActions.setCategory(category));
  },

  setCurrency(cur) {
    dispatch(productListActions.setCurrency(cur));
  },

  cartIncrementHandler(productId) {
    dispatch(cartActions.incrementItemCount(productId));
  },

  cartDecrementHandler(productId) {
    dispatch(cartActions.decrementItemCount(productId));
  },

  onOrderSubmit() {
    dispatch(cartActions.resetCart());
  },

  toggleCurrencyOverLay() {
    dispatch(uiActions.toggleCurrencyOverLay());
  },

  toggleCartOverLay() {
    dispatch(uiActions.toggleCartOverLay());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
