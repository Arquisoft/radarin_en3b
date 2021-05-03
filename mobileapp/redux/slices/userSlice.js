import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setProfile } from "../../FetchProfile";
import { getFriends, getFriendsNames, getFriendsWithDistance } from "../../FetchFriends";

//Fetch friends with distance, far or close
export const fetchFriendsWithDistance = createAsyncThunk("user/fetchFriends", async (webId) => {
  return await intermediateFriends(webId);
});

<<<<<<< HEAD
export const fetchFriendsWithDistance = createAsyncThunk("user/fetchFriendsWithDistance", 
async (undefined, { getState }) => {
    const { friendsStatus } = getState().user;
    if (friendsStatus === "loading"){
        return;
    }
        
    const friends = getState().user.onlineFriends;
    
    const friendsWithDistance = await getFriendsWithDistance(friends);
    console.log(friendsWithDistance);
    return friendsWithDistance;
=======
export const refreshFriends = createAsyncThunk("user/refreshFriends", async (webId) => {
  return await intermediateFriends(webId);
>>>>>>> d758e213412f8b81441e4f5adb5b78d420e0e68a
});

async function intermediateFriends(webId) {
  const friends = await getFriends(webId);

  if (friends === "No location")
    return "No location";

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
  refreshStatus: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    backToIdle: (state) => {
      state.friendsStatus = "idle";
    },
    setFriends: (state, action) => {
      state.friends = action.payload
    }
  },
  extraReducers: {
    [fetchFriendsWithDistance.pending]: (state) => {
      state.friendsStatus = "loading";
    },
    [fetchFriendsWithDistance.fulfilled]: (state, action) => {
      state.friendsStatus = "succeeded";
      state.friends = action.payload;
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
      state.friends = action.payload
    }
  }
});

export default userSlice.reducer;

export const { backToIdle, setFriends } = userSlice.actions;