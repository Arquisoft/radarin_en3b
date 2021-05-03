import { configureStore } from "@reduxjs/toolkit";
import adminUsersSlice from "./slices/adminUsersSlice";
import keysSlice from "./slices/keysSlice";
import locationsSlice from "./slices/locationsSlice";
import tourSlice from "./slices/tourSlice";
import userSlice from "./slices/userSlice";

export default configureStore({
    reducer: {
        locations: locationsSlice,
        user: userSlice,
        keys: keysSlice,
        tour: tourSlice,
        users: adminUsersSlice,
    }
});