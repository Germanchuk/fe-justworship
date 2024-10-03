import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import notificationsSlice from './slices/notificationsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    notifications: notificationsSlice
  },
});

export default store;
