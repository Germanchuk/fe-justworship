import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import notificationsSlice from "./slices/notificationsSlice";
import viewConfigSlice from "./slices/viewConfigSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notifications: notificationsSlice,
    viewConfig: viewConfigSlice,
  },
});

export default store;
