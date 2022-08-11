import { createSlice } from "@reduxjs/toolkit";

const productsInitialState = {
  category: {
    currentCategory: {},
    listOfCategories: [],
  },
  currency: {
    currentCurrency: { label: "USD", symbol: "$" },
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

    addToProductList(state, action) {
      // finds the fetched category and sets its fetched state to true
      const fetchedCategoryIndex = state.category.listOfCategories.findIndex(
        (cat) => cat.name === action.payload.category
      );

      state.category.listOfCategories[
        fetchedCategoryIndex
      ].hasBeenFetched = true;

      // in case we fetched all category
      if (action.payload.category === "all")
        state.category.listOfCategories = state.category.listOfCategories.map(
          (cat) => ({
            ...cat,
            hasBeenFetched: true,
          })
        );

      // in case we have fetched all sub categories which means that all is fetched
      if (
        action.payload.category !== "all" && // it would have been applied already
        state.category.listOfCategories.every(
          (cat) => cat.hasBeenFetched || cat.name === "all"
        )
      ) {
        const indexOfAll = state.category.listOfCategories.findIndex(
          (cat) => cat.name === "all"
        );

        state.category.listOfCategories[indexOfAll].hasBeenFetched = true;
      }

      // pushes fetched category into the products list
      state.products = [...state.products, ...action.payload.products];
    },

    setCategory(state, action) {
      state.category.currentCategory = action.payload;
    },

    setCurrency(state, action) {
      state.currency.currentCurrency = action.payload;
    },
  },
});

export const productListActions = productListSlice.actions;

export default productListSlice.reducer;
