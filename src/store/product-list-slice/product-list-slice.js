import { createSlice } from "@reduxjs/toolkit";

const productsInitialState = { products: [] };

const productListSlice = createSlice({
  name: "product-list",
  initialState: productsInitialState,
  reducers: {
    setProductList(state, action) {
      /* thanks to the integrated immerjs technology implemented in redux-toolkit,
       i don't have to worry about state mutations and just use this straight forward assignment */
      state.products = action.payload;
    },
  },
});

export const productListActions = productListSlice.actions;

export default productListSlice.reducer;
