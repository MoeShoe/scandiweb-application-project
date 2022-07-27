import { Switch, Route } from "react-router-dom";
import { Component } from "react";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDescriptionPage from "./pages/ProductDescriptionPage";
import CartPage from "./pages/CartPage";

class App extends Component {
  render() {
    return (
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
          <p>404!</p>
        </Route>
      </Switch>
    );
  }
}

export default App;
