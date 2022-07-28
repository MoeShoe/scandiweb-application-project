import { Component } from "react";
import { connect } from "react-redux";

import CategoryItem from "../components/ProductItem/ProductItem";
import fetchProductList from "../store/product-list-slice/product-list-action-thunk";

class ProductListingPage extends Component {
  componentDidMount() {
    this.props.getProductList();
  }

  render() {
    return (
      <div>
        <h1>Category name</h1>
        {this.props.productList.map((product) => (
          <CategoryItem key={product.id} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productList: state.productList.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList() {
      // default category displayed when the page first loads is all
      dispatch(fetchProductList("all"));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingPage);
