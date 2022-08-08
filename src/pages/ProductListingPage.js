import { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ProductList from "../components/ProductList/ProductList";

import { fetchProductDescription } from "../store/product-desc-slice/product-desc-action-thunk";
import { fetchProductList } from "../store/product-list-slice/product-list-action-thunks";

class ProductListingPage extends Component {
  componentDidMount() {
    // will fetch product list if it wasn't fetched from before
    if (this.props.products.length === 0) this.props.getProductList();
  }

  addProductToCart(productId, addToCart) {
    this.props.addProductToCart(productId, addToCart);
  }

  productClickHandler(productId) {
    this.props.history.push(`/products/${productId}`);
  }

  render() {
    const products =
      this.props.category === "all"
        ? this.props.products
        : this.props.products.filter(
            (pro) => pro.category === this.props.category
          );
    return (
      <ProductList
        products={products}
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
  getProductList() {
    dispatch(fetchProductList());
  },

  addProductToCart(id, addToCart) {
    dispatch(fetchProductDescription(id, addToCart));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductListingPage));
