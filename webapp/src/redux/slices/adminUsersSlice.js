import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FetchUsersAdmin from "../../components/FetchUsersAdmin";

export const fetchUsersAdmin = createAsyncThunk("users/fetchUsersAdmin", async (session) => {
    return await getUsers(session);
});

export const refreshUsersAdmin = createAsyncThunk("users/refreshUsersAdmin", async (session) => {
    return await getUsers(session);
});

async function getUsers(session) {
    let users = await FetchUsersAdmin(session);

    if(users.length === 0)
        return [{ webId: "No users" }];
    else
        return users;
}

const initialState = {
    status: "idle",
    refreshStatus: "idle",
    users: [],
    searchText: "",
    error: null,
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload
        },
    },
    extraReducers: {
        [fetchUsersAdmin.pending]: (state, action) => {
            state.status = "loading"
        },
        [fetchUsersAdmin.fulfilled]: (state, action) => {
            state.status = "succeeded"
        },
        [fetchUsersAdmin.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        },
        [refreshUsersAdmin.pending]: (state, action) => {
            state.refreshStatus = "loading"
        },
        [refreshUsersAdmin.fulfilled]: (state, action) => {
            state.refreshStatus = "idle"
            state.users = action.payload
        },
        [refreshUsersAdmin.rejected]: (state, action) => {
            state.refreshStatus = "failed"
            state.error = action.error.message
        },
    }
});

export const {  setSearchText } = usersSlice.actions;

export default usersSlice.reducer;