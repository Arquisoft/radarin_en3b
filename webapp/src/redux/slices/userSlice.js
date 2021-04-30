import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    logguedStatus: false,
    canLogin: true,
    limitedVersion: false,
    urlParams: "/uploadLocation",
};


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogguedStatus: (state, action) => {
            state.logguedStatus = action.payload
        },
        setLimitedVersion: (state, action) => {
            state.limitedVersion = action.payload
        },
        setUrlParams: (state, action) => {
            state.urlParams = action.payload
        }
    },
});

export const { setLogguedStatus, setLimitedVersion, setUrlParams } = userSlice.actions;

export default userSlice.reducer;