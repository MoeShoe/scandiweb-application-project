import { Component } from "react";
import { connect } from "react-redux";

import ProductItem from "./ProductItem";

class ProductList extends Component {
  render() {
    return (
      <div>
        <div>Category Name</div>
        {this.props.products.map((prod) => (
          <ProductItem key={prod.id} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ products: state.productList.products });
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
