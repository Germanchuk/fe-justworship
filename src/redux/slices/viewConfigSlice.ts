import { createSlice } from '@reduxjs/toolkit';

const viewConfigSlice = createSlice({
  name: 'viewConfig',
  initialState: {
    globalLoader: false,
  },
  reducers: {
    enableGlobalLoader: (state) => {
      console.log('enableGlobalLoader');
      state.globalLoader = true;
    },
    disableGlobalLoader: (state) => {
        console.log('disableGlobalLoader');
        state.globalLoader = false;
      },
  },
});

export const { enableGlobalLoader, disableGlobalLoader } = viewConfigSlice.actions;

export default viewConfigSlice.reducer;
