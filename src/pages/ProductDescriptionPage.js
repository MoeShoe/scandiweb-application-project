import { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { fetchProductDescription } from "../store/product-desc-slice/product-desc-action-thunk";

import ProductDesc from "../components/ProductDesc/ProductDesc";
import { productDescActions } from "../store/product-desc-slice/product-desc-slice";

class ProductDescriptionPage extends Component {
  componentDidMount() {
    this.props.getProductDescription(this.props.match.params.product);
  }

  componentWillUnmount() {
    this.props.pdpUnmountHandler();
  }

  render() {
    // simple product not found page
    if (this.props.productNotFound) return <div>Product not found!</div>;
    return (
      <ProductDesc
        productData={this.props.productData}
        currentCurrency={this.props.currentCurrency}
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
  pdpUnmountHandler() {
    dispatch(productDescActions.setProductDesc({}));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDescriptionPage));
