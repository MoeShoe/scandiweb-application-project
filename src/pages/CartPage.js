import { Component } from "react";
import { connect } from "react-redux";

import CartList from "../components/CartList/CartList";

import { cartActions } from "../store/cart-slice/cart-slice";

class CartPage extends Component {
  incrementHandler(itemId) {
    this.props.onIncrementItem(itemId);
  }

  decrementHandler(itemId) {
    this.props.onDecrementItem(itemId);
  }

  orderSubmitHandler() {
    window.alert("purchase successful!");
    //dispach to a server here in an irl app...

    this.props.onOrderSubmit();
  }

  render() {
    return (
      <CartList
        cartData={this.props.cartData}
        currentCurrency={this.props.currentCurrency}
        onItemIncrement={this.incrementHandler.bind(this)}
        onItemDecrement={this.decrementHandler.bind(this)}
        orderSubmitHandler={this.orderSubmitHandler.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  cartData: state.cart.products,
  currentCurrency: state.productList.currency.currentCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  onIncrementItem(itemId) {
    dispatch(cartActions.incrementItemCount(itemId));
  },

  onDecrementItem(itemId) {
    dispatch(cartActions.decrementItemCount(itemId));
  },

  onOrderSubmit() {
    dispatch(cartActions.resetCart());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
