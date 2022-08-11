import { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ProductList from "../components/ProductList/ProductList";

import { fetchProductList } from "../store/product-list-slice/product-list-action-thunks";
import { cartActions } from "../store/cart-slice/cart-slice";
import { productListActions } from "../store/product-list-slice/product-list-slice";

class ProductListingPage extends Component {
  componentDidUpdate() {
    // will fetch product list if it wasn't fetched from before
    if (
      !this.props.hasFetchedAll &&
      this.props.category &&
      !this.props.category?.hasBeenFetched
    ) {
      this.props.setCategory({
        name: this.props.category.name,
        hasBeenFetched: true,
      });

      this.props.getProductList(this.props.category?.name);
    }
  }

  addProductToCart(productId, addToCart) {
    this.props.addProductToCart(productId, addToCart);
  }

  productClickHandler(productId) {
    this.props.history.push(`/products/${productId}`);
  }

  render() {
    const products =
      this.props.category?.name === "all"
        ? this.props.products
        : this.props.products.filter(
            (pro) => pro.category === this.props.category?.name
          );

    return (
      <ProductList
        products={products}
        category={this.props.category?.name}
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
  hasFetchedAll: state.productList.category.listOfCategories.find(
    (cat) => cat.name === "all"
  )?.hasBeenFetched,
  currency: state.productList.currency.currentCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  setCategory(category) {
    dispatch(productListActions.setCategory(category));
  },

  getProductList(category) {
    dispatch(fetchProductList(category));
  },

  addProductToCart(product) {
    dispatch(
      cartActions.addItemToCart({
        item: product,
        quantity: 1,
        selectedAttributes: [],
      })
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductListingPage));
