import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchDBLocations from "../../components/locations/FetchDBLocations";

export const fetchLocations = createAsyncThunk("locations/fetchLocations", async (session) => {
    let apiLocations = await fetchDBLocations(session);

    //let counter = 7;
   // apiLocations = apiLocations.map((loc) => ({ id: counter, coordinates: [loc.coords.latitude, loc.coords.longitude], name: "", details: "Location #" + counter++ }));

    /*const locationsList = [
        { id: 1, coordinates: [43.3638658051, -5.84934495326], name: "Oviedo", details: "Location #1" },
        { id: 2, coordinates: [43.5410052978, -5.66364853752], name: "Gijón", details: "Location #2" },
        { id: 3, coordinates: [43.1778862222, -6.54988981222], name: "Cangas del Narcea", details: "Location #3" },
        { id: 4, coordinates: [43.3505845338, -5.13198645530], name: "Cangas de Onís (la mala)", details: "Location #4" },
        { id: 5, coordinates: [43.4476991976, -4.885938986531], name: "Gulpiyuri", details: "Location #5" },
        { id: 6, coordinates: [40.0381046896, -6.08667514877], name: "Plasencia", details: "Location #6" },
    ];*/
    
    

    //return locationsList.concat(apiLocations);

    return apiLocations;
}); 

export const refreshLocations = createAsyncThunk("locations/refreshLocations", async (session) => {
    let apiLocations = await fetchDBLocations(session);

    //let counter = 7;
    //apiLocations = apiLocations.map((loc) => ({ id: counter, coordinates: [loc.coords.latitude, loc.coords.longitude], name: "", details: "Location #" + counter++ }));

    /*const locationsList = [
        { id: 1, coordinates: [43.3638658051, -5.84934495326], name: "Oviedo", details: "Location #1" },
        { id: 2, coordinates: [43.5410052978, -5.66364853752], name: "Gijón", details: "Location #2" },
        { id: 3, coordinates: [43.1778862222, -6.54988981222], name: "Cangas del Narcea", details: "Location #3" },
        { id: 4, coordinates: [43.3505845338, -5.13198645530], name: "Cangas de Onís (la mala)", details: "Location #4" },
        { id: 5, coordinates: [43.4476991976, -4.885938986531], name: "Gulpiyuri", details: "Location #5" },
        { id: 6, coordinates: [40.0381046896, -6.08667514877], name: "Plasencia", details: "Location #6" },
    ];*/
    
    

    //return locationsList.concat(apiLocations);

    return apiLocations;
});

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
            state.locations = state.locations.concat(action.payload)
            state.coordinates = state.locations[0].coords[0]
            state.polyline = state.locations[0].coords
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