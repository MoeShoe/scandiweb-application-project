import { Component } from "react";
import { connect } from "react-redux";

import { fetchProductDescription } from "../store/product-desc-slice/product-desc-action-thunk";

import ProductList from "../components/ProductList/ProductList";

class ProductListingPage extends Component {
  addProductToCart(productId, addToCart) {
    this.props.addProductToCart(productId, addToCart);
  }

  render() {
    return (
      <ProductList
        products={this.props.products}
        category={this.props.category}
        currency={this.props.currency}
        addProductHandler={this.addProductToCart.bind(this)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingPage);
