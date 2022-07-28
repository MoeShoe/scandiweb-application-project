import { Component } from "react";
import { connect } from "react-redux";

import ProductList from "../components/ProductList/ProductList";
import fetchProductList from "../store/product-list-slice/product-list-action-thunk";

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
    dispatch(fetchProductList("all"));
  },
});

export default connect(null, mapDispatchToProps)(ProductListingPage);
