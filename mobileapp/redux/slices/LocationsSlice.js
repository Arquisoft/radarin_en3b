import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getLocationEnabled: "false",
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    changeLocationEnabled: (state, action) => {
      state.getLocationEnabled = action.payload
    }
  }
});

export default locationsSlice.reducer;

export const { changeLocationEnabled } = locationsSlice.actions;