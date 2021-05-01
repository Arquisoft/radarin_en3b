import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isTourOpen: false,
};

export const tourSlice = createSlice({
    name: "tour",
    initialState,
    reducers: {
        setIsTourOpen: (state, action) => {
            state.isTourOpen = action.payload
        }
    }
});

export const { setIsTourOpen } = tourSlice.actions;

export default tourSlice.reducer;