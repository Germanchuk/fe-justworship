import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import notificationsSlice from "./slices/notificationsSlice";
import viewConfigSlice from "./slices/viewConfigSlice";
import songSlice from "./slices/songSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notifications: notificationsSlice,
    viewConfig: viewConfigSlice,
    song: songSlice,
  },
});

export default store;
