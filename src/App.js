import { Switch, Route } from "react-router-dom";
import { Component } from "react";

import NavBar from "./components/NavBar/NavBar";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDescriptionPage from "./pages/ProductDescriptionPage";
import CartPage from "./pages/CartPage";

class App extends Component {
  render() {
    return (
      <>
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
      </>
    );
  }
}

export default App;
