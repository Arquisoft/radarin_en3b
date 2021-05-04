import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setProfile } from "../../FetchProfile";
import { getFriends } from "../../FetchFriends";

//Fetch friends with distance, far or close
export const fetchFriendsWithDistance = createAsyncThunk("user/fetchFriends", async (webId, { getState }) => {
  return await intermediateFriends(webId);
});

export const refreshFriends = createAsyncThunk("user/refreshFriends", async (webId, { getState }) => {
  return await intermediateFriends(webId);
});

async function intermediateFriends(webId) {
  const friends = await getFriends(webId);
    
  console.log(friends);

  return friends;
}


export const fetchProfile = createAsyncThunk("user/fetchProfile", async (webId) =>
  await setProfile(webId));

const initialState = {
  webId: "",
  fn: "",
  friendsStatus: "idle",
  profileStatus: "idle",
  friendsError: null,
  profileError: null,
  friends: [],
  prevfriends: [],
  refreshStatus: "idle",
  refreshPrevented: false,
  refreshError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    backToIdle: (state) => {
      state.friendsStatus = "idle"
      state.refreshStatus = "idle"
      state.profileStatus = "idle"
    },
    setFriends: (state, action) => {
      state.friends = action.payload
    },
    setRefreshPrevented: (state, action) => {
      state.refreshPrevented = action.payload
    }
  },
  extraReducers: {
    [fetchFriendsWithDistance.pending]: (state) => {
      state.friendsStatus = "loading";
    },
    [fetchFriendsWithDistance.fulfilled]: (state, action) => {
      state.friendsStatus = "succeeded";
      state.friends = action.payload;
      state.prevfriends = action.payload;
    },
    [fetchFriendsWithDistance.rejected]: (state, action) => {
      state.friendsStatus = "failed";
      state.friendsError = action.error.message;
    },
    [fetchProfile.pending]: (state) => {
      state.profileStatus = "loading";
    },
    [fetchProfile.fulfilled]: (state, action) => {
      state.profileStatus = "succeeded";
      state.webId = action.payload.webId;
      state.fn = action.payload.fn;
    },
    [fetchProfile.rejected]: (state, action) => {
      state.profileStatus = "failed";
      state.profileError = action.error.message;
    },
    [refreshFriends.pending] : (state) => {
      state.refreshStatus = "loading"
    },
    [refreshFriends.fulfilled]: (state, action) => {
      state.refreshStatus = "idle"
      state.prevfriends = state.friends
      state.friends = action.payload
    },
    [refreshFriends.rejected] : (state, action) => {
      state.refreshStatus = "failed"
      state.refreshError = action.error.message
    }
  }
});

export default userSlice.reducer;

export const { backToIdle, setFriends, setRefreshPrevented } = userSlice.actions;