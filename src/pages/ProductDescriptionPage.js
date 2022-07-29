import { Component } from "react";
import { withRouter } from "react-router-dom";

class ProductDescriptionPage extends Component {
  render() {
    return <div>you are at {this.props.match.params.product}</div>;
  }
}

export default withRouter(ProductDescriptionPage);
