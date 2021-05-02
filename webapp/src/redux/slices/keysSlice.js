import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import keyManagement from "../../utils/keyManagement";

export const manageKeys = createAsyncThunk("keys/manageKeys", async (session, { getState }) => {
    await keyManagement(session, getState().keys.pair);
}); 



const initialState = {
    status: "idle",
    error: null,
    pair: null,
};


export const keysSlice = createSlice({
    name: "keys",
    initialState,
    reducers: {
        setPair: (state, action) => {
            state.pair = action.payload;
        }
    },
    extraReducers: {
        [manageKeys.pending]: (state, action) => {
            state.status = "loading";
        },
        [manageKeys.fulfilled]: (state, action) => {
            state.status = "succeeded";
        },
        [manageKeys.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }
    }
});

export default keysSlice.reducer;

export const { setPair } = keysSlice.actions;