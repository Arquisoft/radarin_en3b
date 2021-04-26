import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    doOnce: false,
    doOnceNotifications: false,
    expoPushToken: '',
    scanned: false,
};

export const executingSlice = createSlice({
    name: "executing",
    initialState,
    reducers: {
        doOnce: (state, action) => {
            state.doOnce = true;
        },
        doOnceNotifications: (state, action) => {
            state.doOnceNotifications = true;
        },
        setExpoPushToken: (state, action) => {
            state.expoPushToken = action.payload;
        },
        setScanned: (state, action) => {
            state.scanned = action.payload;
        }
    }
});

export default executingSlice.reducer;

export const { doOnce, doOnceNotifications, setExpoPushToken, setScanned} = executingSlice.actions;