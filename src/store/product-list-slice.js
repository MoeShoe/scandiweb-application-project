import { createSlice } from "@reduxjs/toolkit";

const productListSlice = createSlice({
  name: "product-list",
  initialState: {
    products: [],
  },
  reducers: {
    setProductList(state, action) {
      state.products = action.payload;
    },
  },
});

export const productListActions = productListSlice.actions;

export default productListSlice.reducer;
