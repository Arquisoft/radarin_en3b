import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setProfile } from "../../FetchProfile";
import { getFriends, getFriendsWithDistance } from "../../FetchFriends";

export const fetchFriends = createAsyncThunk("user/fetchFriends", async (webId) => {
    return await(await getFriends(webId)).map(friend => friend.value);
});

export const fetchFriendsWithDistance = createAsyncThunk("user/fetchFriendsWithDistance", async () => {
    return await getFriendsWithDistance();
});

export const fetchProfile = createAsyncThunk("user/fetchProfile", async(webId) => {
    return await setProfile(webId);
})

const initialState = {
    webId: "",
    fn: "",
    friendsStatus: "idle",
    closeFriendsStatus: "idle",
    profileStatus: "idle",
    friendsError: null,
    closeFriendsError: null,
    profileError: null,
    onlineFriends: [],
    onlineCloseFriends: {}
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: {
        [fetchFriends.pending]: (state, action) => {
            state.friendsStatus = "loading"
        },
        [fetchFriends.fulfilled]: (state, action) => {
            state.friendsStatus = "succeeded"
            state.onlineFriends = action.payload
        },
        [fetchFriends.rejected]: (state, action) => {
            state.friendsStatus = "failed"
            state.friendsError = action.error.message
        },
        [fetchFriendsWithDistance.pending]: (state, action) => {
            state.closeFriendsStatus = "loading"
        },
        [fetchFriendsWithDistance.fulfilled]: (state, action) => {
            state.closeFriendsStatus = "succeeded"
            state.onlineCloseFriends = action.payload
        },
        [fetchFriendsWithDistance.rejected]: (state, action) => {
            state.closeFriendsStatus = "failed"
            state.closeFriendsError = action.error.message
        },
        [fetchProfile.pending]: (state, action) => {
            state.profileStatus = "loading"
        },
        [fetchProfile.fulfilled]: (state, action) => {
            state.profileStatus = "succeeded"
            state.webId = action.payload.webId;
            state.fn = action.payload.fn;
        },
        [fetchProfile.rejected]: (state, action) => {
            state.profileStatus = "failed"
            state.profileError = action.error.message
        }
    }
});

export default userSlice.reducer;