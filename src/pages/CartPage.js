import { Component } from "react";
import { connect } from "react-redux";

import CartList from "../components/CartList/CartList";

class CartPage extends Component {
  render() {
    return (
      <CartList
        cartData={this.props.cartData}
        currentCurrency={this.props.currentCurrency}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  cartData: state.cart.products,
  currentCurrency: state.productList.currency.currentCurrency,
});
const mapDispatchToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
