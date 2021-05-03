import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doOnce: false,
  doOnceNotifications: false,
  expoPushToken: "",
  scanned: false,
  overlayVisible: false,
};

export const executingSlice = createSlice({
  name: "executing",
  initialState,
  reducers: {
    doOnce: (state) => {
      state.doOnce = !state.doOnce;
    },
    doOnceNotifications: (state) => {
      state.doOnceNotifications = !state.doOnce;
    },
    setExpoPushToken: (state, action) => {
      state.expoPushToken = action.payload;
    },
    setScanned: (state, action) => {
      state.scanned = action.payload;
    },
    changeOverlayVisible: (state, action) => {
      state.overlayVisible = !state.overlayVisible
    }
  }
});

export default executingSlice.reducer;

export const { doOnce, doOnceNotifications, setExpoPushToken, setScanned, changeOverlayVisible } = executingSlice.actions;