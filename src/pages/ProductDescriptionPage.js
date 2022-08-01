import { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { fetchProductDescription } from "../store/product-desc-slice/product-desc-action-thunk";

import ProductDesc from "../components/ProductDesc/ProductDesc";
import { productDescActions } from "../store/product-desc-slice/product-desc-slice";
import { cartActions } from "../store/cart-slice/cart-slice";

class ProductDescriptionPage extends Component {
  componentDidMount() {
    this.props.getProductDescription(this.props.match.params.product);
  }

  componentWillUnmount() {
    this.props.pdpUnmountHandler();
  }

  // i took the approach of handling all state in the page component and having the children of said component be controlled
  $addProductToCartHandler(selectedAttributes) {
    // creates a special id that is special to the product with its attribute, helps us detect duplicates
    const productId = this.props.productData.id.concat(
      selectedAttributes.reduce(
        (acc, attrId) =>
          acc.concat(attrId.id.concat(attrId.selectedAttribute.id)),
        ""
      )
    );

    this.props.addProductToCartHandler({
      item: { ...this.props.productData, id: productId },
      selectedAttributes,
      quantity: 1, //by default is 1
    });
    this.props.history.push("/");
  }

  render() {
    // simple product not found page
    if (this.props.productNotFound) return <div>Product not found!</div>;
    return (
      <ProductDesc
        productData={this.props.productData}
        currentCurrency={this.props.currentCurrency}
        onProductAdd={this.$addProductToCartHandler.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  productData: state.productDesc.productDesc,
  productNotFound: state.productDesc.productNotFound,
  currentCurrency: state.productList.currency.currentCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  getProductDescription(id) {
    dispatch(fetchProductDescription(id));
  },

  addProductToCartHandler(item) {
    dispatch(cartActions.addItemToCart(item));
  },

  pdpUnmountHandler() {
    dispatch(productDescActions.setProductDesc({}));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDescriptionPage));
