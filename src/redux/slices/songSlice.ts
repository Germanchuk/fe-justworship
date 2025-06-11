import {createSlice, Slice} from '@reduxjs/toolkit';
import {Song} from "../../models";

const songSlice: Slice<Song, any> = createSlice({
  name: 'song',
  initialState: {
    name: null,
    bpm: null,
    key: null,
    sections: null
  },
  reducers: {
    setSong: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    }
  },
});

export const { enableGlobalLoader, disableGlobalLoader } = songSlice.actions;

export default songSlice.reducer;
