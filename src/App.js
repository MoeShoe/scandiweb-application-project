import { Switch, Route } from "react-router-dom";
import { Component } from "react";
import { connect } from "react-redux";

import NavBar from "./components/NavBar/NavBar";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDescriptionPage from "./pages/ProductDescriptionPage";
import CartPage from "./pages/CartPage";
import { uiSliceActions } from "./store/ui-slice/ui-slice";

class App extends Component {
  pageClickHandler(e) {
    //Guard Clause
    // if the user clicks on the outlay itself, it won't close
    if (e.target.closest("[data-isaction]")) return;

    this.props.closeAllOutlays();
  }

  render() {
    return (
      <div onClick={this.pageClickHandler.bind(this)}>
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <ProductListingPage />
          </Route>
          <Route path="/product-detail" exact>
            <ProductDescriptionPage />
          </Route>
          <Route path="/cart" exact>
            <CartPage />
          </Route>
          <Route path="/">
            <div>404!</div>
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  closeAllOutlays() {
    dispatch(uiSliceActions.closeAllOutlays());
  },
});

export default connect(null, mapDispatchToProps)(App);
