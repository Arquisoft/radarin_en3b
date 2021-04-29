import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    logguedStatus: false,
    canLogin: true,
    limitedVersion: false,
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
        }
    },
});

export const { setLogguedStatus, setLimitedVersion } = userSlice.actions;

export default userSlice.reducer;