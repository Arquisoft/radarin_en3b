import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
});

export default locationsSlice.reducer;

export const { toggleSwitch, setSwitchStatus } = locationsSlice.actions;