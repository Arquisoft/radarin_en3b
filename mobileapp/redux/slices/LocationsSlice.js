import { createSlice } from "@reduxjs/toolkit";

const initialState = {
<<<<<<< HEAD
    switchStatus: false,
};

export const locationsSlice = createSlice({
    name: "locations",
    initialState,
    reducers: {
        toggleSwitch: (state, action) => {
            state.switchStatus = !state.switchStatus
        },
        setSwitchStatus: (state, action) => {
            state.switchStatus = action.payload
        }
    }
=======
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
>>>>>>> d758e213412f8b81441e4f5adb5b78d420e0e68a
});

export default locationsSlice.reducer;

<<<<<<< HEAD
export const { toggleSwitch, setSwitchStatus } = locationsSlice.actions;
=======
export const { changeLocationEnabled } = locationsSlice.actions;
>>>>>>> d758e213412f8b81441e4f5adb5b78d420e0e68a
