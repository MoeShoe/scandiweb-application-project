import { Component } from "react";
import { connect } from "react-redux";

import CategoryItem from "../components/CategoryItem";
import fetchProductList from "../store/product-list-action-thunk";

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
      dispatch(fetchProductList("all"));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingPage);
