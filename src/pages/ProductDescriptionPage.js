import { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { fetchProductDescription } from "../store/product-desc-slice/product-desc-action-thunk";

import ProductDesc from "../components/ProductDesc/ProductDesc";

class ProductDescriptionPage extends Component {
  componentDidMount() {
    this.props.getProductDescription(this.props.match.params.product);
  }

  render() {
    return <ProductDesc productData={this.props.productData} />;
  }
}

const mapStateToProps = (state) => ({
  productData: state.productDesc.productDesc,
});

const mapDispatchToProps = (dispatch) => ({
  getProductDescription(id) {
    dispatch(fetchProductDescription(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDescriptionPage));
