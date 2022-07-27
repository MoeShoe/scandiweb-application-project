import { createSlice } from "@reduxjs/toolkit";

const productsInitialState = { products: [] };

const productListSlice = createSlice({
  name: "product-list",
  initialState: productsInitialState,
  reducers: {
    setProductList(state, action) {
      state.products = action.payload;
    },
  },
});

export const productListActions = productListSlice.actions;

export default productListSlice.reducer;
