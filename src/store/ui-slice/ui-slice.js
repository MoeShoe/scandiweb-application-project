import { createSlice } from "@reduxjs/toolkit";

const uiSliceInitialState = {
  showCurrencyOverLay: false,
  showCartOverLay: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: uiSliceInitialState,
  reducers: {
    toggleCurrencyOverLay(state) {
      state.showCurrencyOverLay = !state.showCurrencyOverLay;
      state.showCartOverLay = false;
    },

    toggleCartOverLay(state) {
      state.showCartOverLay = !state.showCartOverLay;
      state.showCurrencyOverLay = false;
    },

    closeAllOverLays(state) {
      state.showCartOverLay = state.showCurrencyOverLay = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
