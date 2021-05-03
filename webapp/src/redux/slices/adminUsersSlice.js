import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BlockUser from "../../components/BlockUser";
import FetchUsersAdmin from "../../components/FetchUsersAdmin";
import GetBlacklist from "../../components/GetBlacklist";
import UnblockUser from "../../components/UnblockUser";

export const fetchUsersAdmin = createAsyncThunk("users/fetchUsersAdmin", async () => {
    return await getUsers();
});

export const refreshUsersAdmin = createAsyncThunk("users/refreshUsersAdmin", async () => {
    return await getUsers();
});

async function getUsers() {
    let users = await FetchUsersAdmin();

    if(users.length === 0)
        return [ "No users" ];
    else
        return users;
};

export const blockUserAdmin = createAsyncThunk("user/blockUser", async (webId) => {
    return await BlockUser(webId);
});

export const unblockUserAdmin = createAsyncThunk("user/unblockUser", async (webId) => {
    return await UnblockUser(webId);
});

export const getBlacklistAdmin = createAsyncThunk("users/getBlacklist", async () => {
    return await getBlacklist();
});

async function getBlacklist() {
    let users = await GetBlacklist();

    if(users.length === 0)
        return [];
    else if (users==="unauthorized")
        return "unauthorized";
    else
        return users;
};

const initialState = {
    status: "idle",
    refreshStatus: "idle",
    users: [],
    searchText: "",
    error: null,
    usersBL: [],
    statusBL: "failed",
    show: false
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload
        },
        changeShow: (state, action) => {
            state.show = action.payload
        }
    },
    extraReducers: {
        [fetchUsersAdmin.pending]: (state) => {
            state.status = "loading"
        },
        [fetchUsersAdmin.fulfilled]: (state, action) => {
            state.status = "succeeded"
            state.users = action.payload
        },
        [fetchUsersAdmin.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        },
        [refreshUsersAdmin.pending]: (state) => {
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
        [getBlacklistAdmin.fulfilled]: (state, action) => {
            state.statusBL = "idle"
            state.usersBL = action.payload
        },
        [getBlacklistAdmin.rejected]: (state) => {
            state.statusBL = "failed"
        },
    }
});

export const { setSearchText, changeShow } = usersSlice.actions;

export default usersSlice.reducer;