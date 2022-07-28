import { Component } from "react";
import { connect } from "react-redux";

import ProductList from "../components/ProductList/ProductList";
import { initializeProductPage } from "../store/product-list-slice/product-list-action-thunks";

class ProductListingPage extends Component {
  componentDidMount() {
    this.props.getProductList();
  }

  render() {
    return <ProductList />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProductList() {
    // default category displayed when the page first loads is "all"
    dispatch(initializeProductPage());
  },
});

export default connect(null, mapDispatchToProps)(ProductListingPage);
