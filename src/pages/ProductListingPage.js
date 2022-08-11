import { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ProductList from "../components/ProductList/ProductList";

import { fetchProductList } from "../store/product-list-slice/product-list-action-thunks";
import { cartActions } from "../store/cart-slice/cart-slice";
import { productListActions } from "../store/product-list-slice/product-list-slice";

class ProductListingPage extends Component {
  componentDidMount() {
    // gets the specified category in the search params
    const categorySearchParam =
      new URLSearchParams(this.props.location.search).get("category") || "all";

    const targetFetchedCategory = this.props.listOfCategories.find(
      (cat) => cat.name === categorySearchParam
    );

    // and applies it
    this.props.setCategory(
      targetFetchedCategory || {
        name: categorySearchParam,
        hasBeenFetched: false,
      }
    );
  }

  componentDidUpdate() {
    // will fetch product list if it wasn't fetched from before
    if (
      !this.props.hasFetchedAll &&
      this.props.category &&
      !this.props.category?.hasBeenFetched
    ) {
      let subCategories;
      if (
        this.props.category.name === "all" &&
        this.props.listOfCategories?.some((cat) => cat.hasBeenFetched)
      )
        // in case we fetch all after fetching some other categories before
        subCategories = [
          ...this.props.listOfCategories
            .filter((cat) => !cat.hasBeenFetched && cat.name !== "all")
            .map((cat) => cat.name),
        ];
      else subCategories = [this.props.category?.name]; // fetching a regular category with no subcategories

      // dispatches the action that fetches the category's products
      this.props.getProductList({
        mainCategory: this.props.category?.name, // the name of the category
        subCategories, // in case the category includes other categories like "all"
      });

      // updates the selected category fetch state
      this.props.setCategory({
        ...this.props.category,
        hasBeenFetched: true,
      });
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
  listOfCategories: state.productList.category.listOfCategories,
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
