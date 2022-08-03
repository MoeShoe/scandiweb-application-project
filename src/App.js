import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import NavBar from "./components/NavBar/NavBar";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDescriptionPage from "./pages/ProductDescriptionPage";
import CartPage from "./pages/CartPage";
import Layout from "./components/UI/Layout";

import { initializeProductPage } from "./store/product-list-slice/product-list-action-thunks";
import { uiActions } from "./store/ui-slice/ui-slice";

class App extends Component {
  // when the app first loads, this initializes it by fetching the available categories and currencies
  componentDidMount() {
    this.props.initializeWebApp();
  }

  pageClickHandler(e) {
    //Guard Clause
    // if the user clicks on the Overlay itself, it won't close because it has data-isaction attribute
    if (e.target.closest("[data-isaction]")) return;

    this.props.closeAllOverLays();
  }

  render() {
    return (
      // needed to add this div to attach the event listener to it
      <div onClick={this.pageClickHandler.bind(this)}>
        <NavBar />
        <Switch>
          <Route path="/" exact>
            {/* PLP */}
            <ProductListingPage />
          </Route>

          <Route path="/products/:product" exact>
            {/* PDP */}
            <ProductDescriptionPage />
          </Route>

          <Route path="/cart" exact>
            {/* cart page */}
            <CartPage />
          </Route>

          <Route path="/">
            {/* simple not found page */}
            <div>Page not Found 404!</div>
          </Route>
        </Switch>

        {/* Layout */}
        {this.props.showLayout && <Layout />}
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
