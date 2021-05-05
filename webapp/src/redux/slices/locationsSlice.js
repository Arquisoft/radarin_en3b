import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchDBLocations from "../../components/locations/FetchDBLocations";
import fetchPodCreatedLocations from "../../components/locations/FetchPodCreatedLocations";
import fetchPodFriendsCreatedLocations from "../../components/locations/FetchPodFriendsCreatedLocations";

export const fetchLocations = createAsyncThunk("locations/fetchLocations", async (session) => {
    return await getLocations(session);
});

export const refreshLocations = createAsyncThunk("locations/refreshLocations", async (session) => {
    return await getLocations(session);
});


async function getLocations(session) {
    let apiLocations = await fetchDBLocations(session);

    let podLocations = await fetchPodCreatedLocations(session, [ apiLocations[apiLocations.length - 1]?.id ?? 0]);

    let podFriendsLocations = await fetchPodFriendsCreatedLocations(session, [ podLocations[podLocations.length - 1]?.id ?? 0]);


    const result = podLocations.concat(podFriendsLocations).concat(apiLocations);

    if(result.length === 0)
    {return [{ type: "poly", id: 1, name: "You dont have any locations", details: "Add some from the mobile!", coords: [[0, 0]] }];}
    else
    {return result;}
}


const initialState = {
    coordinates: [0, 0],
    lastCoords: [0, 0],
    names: "",
    status: "idle",
    refreshStatus: "idle",
    searchText: "",
    error: null,
    locations: [],
    polyline: [],
    legendAdded: false,
};

export const locationsSlice = createSlice({
    name: "locations",
    initialState,
    reducers: {
        moveTo: (state, action) => {
            state.coordinates = action.payload;
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setPolyline: (state, action) => {
            state.polyline = action.payload;
        },
        saveNames: (state, action) => {
            state.names = action.payload;
        },
        saveLastCoords: (state, action) => {
            state.lastCoords = action.payload;
        },
        setLegend: (state, action) => {
            state.legendAdded = action.payload;
        }
    },
    extraReducers: {
        [fetchLocations.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchLocations.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.locations = action.payload;
            state.coordinates = state.locations[0].coords[0];
            state.polyline = state.locations[0].type === "poly" ? state.locations[0].coords : [];
            state.names = state.locations[0].type !== "poly" ? state.locations[0].name.concat('$').concat(state.locations[0].details).concat('$').concat(state.locations[0].webId) : "";
        },
        [fetchLocations.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [refreshLocations.pending]: (state, action) => {
            state.refreshStatus = "loading";
        },
        [refreshLocations.fulfilled]: (state, action) => {
            state.refreshStatus = "idle";
            state.locations = action.payload;
        },
        [refreshLocations.rejected]: (state, action) => {
            state.refreshStatus = "failed";
            state.error = action.error.message;
        },
    }
});

export const { moveTo, setSearchText, setPolyline, saveNames, saveLastCoords, setLegend } = locationsSlice.actions;

export default locationsSlice.reducer;