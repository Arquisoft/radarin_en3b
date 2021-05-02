import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import executingSlice from "./slices/executingSlice";
import locationsSlice from "./slices/LocationsSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        executing: executingSlice,
        locations: locationsSlice
    }
});