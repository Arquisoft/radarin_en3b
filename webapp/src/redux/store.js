import { configureStore } from "@reduxjs/toolkit";
import keysSlice from "./slices/keysSlice";
import locationsSlice from "./slices/locationsSlice";
import userSlice from "./slices/userSlice";

export default configureStore({
    reducer: {
        locations: locationsSlice,
        user: userSlice,
        keys: keysSlice,
    }
});