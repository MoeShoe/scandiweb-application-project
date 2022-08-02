import { Component } from "react";
import { connect } from "react-redux";

import ProductList from "../components/ProductList/ProductList";

class ProductListingPage extends Component {
  render() {
    return (
      <ProductList
        products={this.props.products}
        category={this.props.category}
        currency={this.props.currency}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productList.products,
  category: state.productList.category.currentCategory,
  currency: state.productList.currency.currentCurrency,
  // showLayout: state.ui.showCartOutlay,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingPage);
