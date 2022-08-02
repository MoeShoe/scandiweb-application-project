import { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ProductList from "../components/ProductList/ProductList";

import { fetchProductDescription } from "../store/product-desc-slice/product-desc-action-thunk";

class ProductListingPage extends Component {
  addProductToCart(productId, addToCart) {
    this.props.addProductToCart(productId, addToCart);
  }

  productClickHandler(productId) {
    this.props.history.push(`/products/${productId}`);
  }

  render() {
    return (
      <ProductList
        products={this.props.products}
        category={this.props.category}
        currency={this.props.currency}
        addProductHandler={this.addProductToCart.bind(this)}
        productClickHandler={this.productClickHandler.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productList.products,
  category: state.productList.category.currentCategory,
  currency: state.productList.currency.currentCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  addProductToCart(id, addToCart) {
    dispatch(fetchProductDescription(id, addToCart));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductListingPage));
