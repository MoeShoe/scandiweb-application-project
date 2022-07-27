import { configureStore } from "@reduxjs/toolkit";

// Slices' reducers
import productListSliceReducer from "./product-list-slice";

const store = configureStore({
  reducer: { productList: productListSliceReducer },
});

export default store;
