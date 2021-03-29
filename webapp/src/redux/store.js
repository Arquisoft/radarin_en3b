import { configureStore } from "@reduxjs/toolkit";
import locationsSlice from "./slices/locationsSlice";

export default configureStore({
    reducer: {
        locations: locationsSlice
    }
});