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

    incrementItemCount(state, action) {
      state.products.find(
        (pro) => pro.item.id === action.payload
      ).quantity += 1;
    },

    decrementItemCount(state, action) {
      const targetItemIndex = state.products.findIndex(
        (pro) => pro.item.id === action.payload
      );

      // if quantity is decremented to 0, the item gets removed from the cart
      if (state.products[targetItemIndex].quantity - 1 === 0) {
        state.products = state.products.filter(
          (pro) => pro.item.id !== action.payload
        );
        return;
      }

      state.products[targetItemIndex].quantity -= 1;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
