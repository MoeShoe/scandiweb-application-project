import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = { products: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addItemToCart(state, action) {
      state.products.push(action.payload);
    },

    removeItemFromCart(state, action) {},

    incrementItemCount(state, action) {},

    decrementItemCount(state, action) {},
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
