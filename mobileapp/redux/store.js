import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import executingSlice from "./slices/executingSlice";
import locationsSlice from "./slices/LocationsSlice";

export default configureStore({
<<<<<<< HEAD
    reducer: {
        user: userSlice,
        executing: executingSlice,
        locations: locationsSlice
    }
=======
  reducer: {
    user: userSlice,
    executing: executingSlice,
    locations: locationsSlice,
  }
>>>>>>> d758e213412f8b81441e4f5adb5b78d420e0e68a
});