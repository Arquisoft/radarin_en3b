import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isTourOpen: false,
    isShowingMore: false,
};

export const tourSlice = createSlice({
    name: "tour",
    initialState,
    reducers: {
        setIsTourOpen: (state, action) => {
            state.isTourOpen = action.payload;
        },
        setIsShowingMore: (state, action) => {
            state.isShowingMore = action.payload;
        }
    }
});

export const { setIsTourOpen, setIsShowingMore } = tourSlice.actions;

export default tourSlice.reducer;