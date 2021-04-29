import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchDBLocations from "../../components/locations/FetchDBLocations";
import fetchPodCreatedLocations from "../../components/locations/FetchPodCreatedLocations";

export const fetchLocations = createAsyncThunk("locations/fetchLocations", async (session) => {
    return await getLocations(session);
});

export const refreshLocations = createAsyncThunk("locations/refreshLocations", async (session) => {
    return await getLocations(session);
});


async function getLocations(session) {
    let apiLocations = await fetchDBLocations(session);

    let podLocations = await fetchPodCreatedLocations(session, [ apiLocations[apiLocations.length - 1]?.id + 1 ?? 0]);


    if (apiLocations.length === 0) {
        if(podLocations.length === 0)
            return [{ type: "poly", id: 1, name: "You dont have any locations", details: "Add some from the mobile!", coords: [[0, 0]] }]
        else
            return podLocations;
    } else {
        if(podLocations.length === 0)
            return apiLocations;
        else 
            return podLocations.concat(apiLocations);
    }
}


const initialState = {
    coordinates: [0, 0],
    status: "idle",
    refreshStatus: "idle",
    searchText: "",
    error: null,
    locations: [],
    polyline: [],
    picture: null,
};

export const locationsSlice = createSlice({
    name: "locations",
    initialState,
    reducers: {
        moveTo: (state, action) => {
            state.coordinates = action.payload
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload
        },
        setPolyline: (state, action) => {
            state.polyline = action.payload
        },
        setPicture: (state, action) => {
            state.picture = action.payload
        }
    },
    extraReducers: {
        [fetchLocations.pending]: (state, action) => {
            state.status = "loading"
        },
        [fetchLocations.fulfilled]: (state, action) => {
            state.status = "succeeded"
            state.locations = action.payload
            state.coordinates = state.locations[0].coords[0]
            state.polyline = state.locations[0].type === "poly" ? state.locations[0].coords : []
        },
        [fetchLocations.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        },
        [refreshLocations.pending]: (state, action) => {
            state.refreshStatus = "loading"
        },
        [refreshLocations.fulfilled]: (state, action) => {
            state.refreshStatus = "idle"
            state.locations = action.payload
        },
        [refreshLocations.rejected]: (state, action) => {
            state.refreshStatus = "failed"
            state.error = action.error.message
        },
    }
});

export const { moveTo, setSearchText, setPolyline, setPicture } = locationsSlice.actions;

export default locationsSlice.reducer;