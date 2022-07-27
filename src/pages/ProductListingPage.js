import { Component } from "react";

import CategoryItem from "../components/CategoryItem";

class ProductListingPage extends Component {
  render() {
    return (
      <div>
        <h1>Category name</h1>
        <CategoryItem />
      </div>
    );
  }
}

export default ProductListingPage;
