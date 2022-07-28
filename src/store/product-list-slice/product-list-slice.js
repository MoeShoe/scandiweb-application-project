import { createSlice } from "@reduxjs/toolkit";

const productsInitialState = {
  category: { currentCategory: "", listOfCategories: [] },
  currency: {
    currentCurrency: { label: "", symbol: "" },
    listOfCurrencies: [],
  },
  products: [],
};

const productListSlice = createSlice({
  name: "product-list",
  initialState: productsInitialState,
  reducers: {
    initializeProductList(state, action) {
      /* thanks to the integrated immerjs technology implemented in redux-toolkit
       i don't have to worry about state mutations and just use this straight forward assignment */
      state.category.listOfCategories = action.payload.categories;
      state.currency.listOfCurrencies = action.payload.currencies;
    },

    setProductList(state, action) {
      state.category.currentCategory = action.payload.category;
      state.products = action.payload.products;
    },

    setCurrency(state, action) {
      state.currency.currentCurrency = action.payload;
    },
  },
});

export const productListActions = productListSlice.actions;

export default productListSlice.reducer;
