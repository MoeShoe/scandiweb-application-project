import { createSlice } from "@reduxjs/toolkit";

const productDescInitialState = {
  productNotFound: false,
  productDesc: {},
};

const productDescSlice = createSlice({
  name: "product-desc",
  initialState: productDescInitialState,
  reducers: {
    setProductDesc(state, action) {
      state.productNotFound = false;
      state.productDesc = action.payload;
    },

    setProductIsNotFound(state, action) {
      state.productNotFound = action.payload;
    },
  },
});

export const productDescActions = productDescSlice.actions;

export default productDescSlice.reducer;
