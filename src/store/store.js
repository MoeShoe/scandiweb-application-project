import { configureStore } from "@reduxjs/toolkit";

// Slices' reducers
import productListSliceReducers from "./product-list-slice/product-list-slice";

const store = configureStore({
  reducer: { productList: productListSliceReducers },
});

export default store;
