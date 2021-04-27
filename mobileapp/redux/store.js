import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import executingSlice from "./slices/executingSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        executing: executingSlice
    }
});