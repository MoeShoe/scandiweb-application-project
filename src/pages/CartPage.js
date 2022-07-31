import { Component } from "react";
import { connect } from "react-redux";

import CartList from "../components/CartList/CartList";
import { cartActions } from "../store/cart-slice/cart-slice";

class CartPage extends Component {
  incrementHandler(itemId) {
    this.props.incrementItem(itemId);
  }

  decrementHandler(itemId) {
    this.props.decrementItem(itemId);
  }

  render() {
    return (
      <CartList
        cartData={this.props.cartData}
        onItemIncrement={this.incrementHandler.bind(this)}
        onItemDecrement={this.decrementHandler.bind(this)}
        currentCurrency={this.props.currentCurrency}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  cartData: state.cart.products,
  currentCurrency: state.productList.currency.currentCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  incrementItem(itemId) {
    dispatch(cartActions.incrementItemCount(itemId));
  },

  decrementItem(itemId) {
    dispatch(cartActions.decrementItemCount(itemId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
