import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  products: [
    // cartItem[]
    // cartItem {item, quantity, selectedAttibutes}
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addItemToCart(state, action) {
      state.products.push(action.payload);
      console.log(action.payload);
    },

    removeItemFromCart(state, action) {},

    incrementItemCount(state, action) {},

    decrementItemCount(state, action) {},
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
