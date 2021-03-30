import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLocations = createAsyncThunk("locations/fetchLocations", async () => {
    const locationsList = [
        { id: 1, coordinates: [43.3638658051, -5.84934495326], name: "Oviedo", details: "Location #1" },
        { id: 2, coordinates: [43.5410052978, -5.66364853752], name: "Gijón", details: "Location #2" },
        { id: 3, coordinates: [43.1778862222, -6.54988981222], name: "Cangas del Narcea", details: "Location #3" },
        { id: 4, coordinates: [43.3505845338, -5.13198645530], name: "Cangas de Onís (la mala)", details: "Location #4" },
        { id: 5, coordinates: [43.4476991976, -4.885938986531], name: "Gulpiyuri", details: "Location #5" },
        { id: 6, coordinates: [40.0381046896, -6.08667514877], name: "Plasencia", details: "Location #6" },
    ];
    
    return locationsList;
}); 

const initialState = {
    coordinates: [43.3589,-5.8461],
    status: "idle",
    error: null,
    locations: [],
};

export const locationsSlice = createSlice({
    name: "locations",
    initialState,
    reducers: {
        moveTo: (state, action) => {
            state.coordinates = action.payload
        }
    },
    extraReducers: {
        [fetchLocations.pending]: (state, action) => {
            state.status = "loading"
        },
        [fetchLocations.fulfilled]: (state, action) => {
            state.status = "succeeded"
            state.locations = state.locations.concat(action.payload)
        },
        [fetchLocations.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        }
    }
});

export const { moveTo } = locationsSlice.actions;

export const selectAllLocations = state => 
    state.locations.locations;

export default locationsSlice.reducer;