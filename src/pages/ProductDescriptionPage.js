import { Component } from "react";
import { withRouter } from "react-router-dom";
import ProductDesc from "../components/ProductDesc/ProductDesc";

class ProductDescriptionPage extends Component {
  render() {
    return <ProductDesc />;
  }
}

export default withRouter(ProductDescriptionPage);
