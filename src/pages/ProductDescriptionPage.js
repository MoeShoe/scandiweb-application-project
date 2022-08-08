import { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ProductDesc from "../components/ProductDesc/ProductDesc";

import { fetchProductDescription } from "../store/product-desc-slice/product-desc-action-thunk";
import { productDescActions } from "../store/product-desc-slice/product-desc-slice";
import { cartActions } from "../store/cart-slice/cart-slice";

class ProductDescriptionPage extends Component {
  componentDidMount() {
    /* when page loads it checks the url for the product id and loads it accordingly,
     this way it allows for passing product URLs around which is a critical feature
      in an IRL project of this kind */
    if (this.props.productList.length !== 0) {
      // if the product has been fetched before, it won't refetch
      const targetProduct = this.props.productList.find(
        (prod) => prod.id === this.props.match.params.product
      );
      this.props.setProductDesc(targetProduct);
      return;
    }

    this.props.getProductDescription(this.props.match.params.product);
  }

  componentWillUnmount() {
    // resets the product description state on page component unmount
    this.props.setProductDesc({});
  }

  addProductToCartHandler(selectedAttributes) {
    // creates an id that is special to the product with its specified attribute, helps us detect duplicates
    const productId = this.props.productData.id.concat(
      selectedAttributes.reduce(
        (acc, attrId) =>
          acc.concat(attrId.id.concat(attrId.selectedAttribute.id)),
        ""
      )
    );

    this.props.onProductAdd({
      item: { ...this.props.productData, id: productId },
      selectedAttributes,
      quantity: 1, //it's 1 by default, you can change that on the mini-cart or the cart page
    });
  }

  render() {
    // simple product not found page in case user passes an incorrect url
    if (this.props.productNotFound) return <div>Product not found!</div>;
    return (
      <ProductDesc
        productData={this.props.productData}
        currentCurrency={this.props.currentCurrency}
        addProductHandler={this.addProductToCartHandler.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  productList: state.productList.products,
  productData: state.productDesc.productDesc,
  productNotFound: state.productDesc.productNotFound,
  currentCurrency: state.productList.currency.currentCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  getProductDescription(id) {
    dispatch(fetchProductDescription(id));
  },

  onProductAdd(item) {
    dispatch(cartActions.addItemToCart(item));
  },

  setProductDesc(desc) {
    dispatch(productDescActions.setProductDesc(desc));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDescriptionPage));
