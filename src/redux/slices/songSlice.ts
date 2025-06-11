import { createSlice, Slice } from '@reduxjs/toolkit';
import { Song } from '../../models';

interface SongState extends Partial<Song> {
  editMode: boolean;
}

const initialState: SongState = {
  editMode: false,
};

const songSlice: Slice<SongState, any> = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setSong: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    resetSong: () => initialState,
    setSongName: (state, action) => {
      state.name = action.payload;
    },
    setBpm: (state, action) => {
      state.bpm = action.payload;
    },
    setKey: (state, action) => {
      state.key = action.payload;
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    setSections: (state, action) => {
      state.sections = action.payload;
    },
  },
});

export const {
  setSong,
  resetSong,
  setSongName,
  setBpm,
  setKey,
  setEditMode,
  setSections,
} = songSlice.actions;

export default songSlice.reducer;
