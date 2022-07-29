import { createSlice } from "@reduxjs/toolkit";

const uiSliceInitialState = {
  showCurrencyOutlay: false,
  showCartOutlay: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: uiSliceInitialState,
  reducers: {
    toggleCurrencyOutlay(state) {
      state.showCurrencyOutlay = !state.showCurrencyOutlay;
      state.showCartOutlay = false;
    },

    toggleCartOutlay(state) {
      state.showCartOutlay = !state.showCartOutlay;
      state.showCurrencyOutlay = false;
    },

    closeAllOutlays(state) {
      state.showCartOutlay = state.showCurrencyOutlay = false;
    },
  },
});

export const uiSliceActions = uiSlice.actions;

export default uiSlice.reducer;
