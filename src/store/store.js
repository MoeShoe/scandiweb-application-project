import { configureStore } from "@reduxjs/toolkit";

// Slices' reducers
import productListReducers from "./product-list-slice/product-list-slice";
import uiReducers from "./ui-slice/ui-slice";

const store = configureStore({
  reducer: { productList: productListReducers, ui: uiReducers },
});

export default store;
