import { Switch, Route } from "react-router-dom";
import { Component } from "react";
import { connect } from "react-redux";

import { initializeProductPage } from "./store/product-list-slice/product-list-action-thunks";

import NavBar from "./components/NavBar/NavBar";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDescriptionPage from "./pages/ProductDescriptionPage";
import CartPage from "./pages/CartPage";

import { uiActions } from "./store/ui-slice/ui-slice";

class App extends Component {
  componentDidMount() {
    this.props.initializeWebApp();
  }

  pageClickHandler(e) {
    //Guard Clause
    // if the user clicks on the Overlay itself, it won't close
    if (e.target.closest("[data-isaction]")) return;

    this.props.closeAllOverLays();
  }

  render() {
    return (
      <div onClick={this.pageClickHandler.bind(this)}>
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <ProductListingPage />
          </Route>
          <Route path="/products/:product" exact>
            <ProductDescriptionPage />
          </Route>
          <Route path="/cart" exact>
            <CartPage />
          </Route>
          <Route path="/">
            <div>404!</div>
          </Route>
        </Switch>
        {this.props.showLayout && (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(57, 55, 72, 0.22)",
            }}
          ></div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  showLayout: state.ui.showCartOverLay,
});

const mapDispatchToProps = (dispatch) => ({
  initializeWebApp() {
    dispatch(initializeProductPage());
  },
  closeAllOverLays() {
    dispatch(uiActions.closeAllOverLays());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
