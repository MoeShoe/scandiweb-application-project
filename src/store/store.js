import { configureStore } from "@reduxjs/toolkit";

// Slices' reducers
import productListReducers from "./product-list-slice/product-list-slice";

const store = configureStore({
  reducer: { productList: productListReducers },
});

export default store;
