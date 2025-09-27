import { createSlice } from '@reduxjs/toolkit';
import { Song, Status } from '../../models';

export interface SongState extends Partial<Song> {
  editMode: boolean;
  status: Status;
  song: Partial<Song>;
  preferences: { transposition: number; chordsHidden: boolean; };
}

const initialState: SongState = {
  editMode: true,
  status: "pending",
  song: {},
  preferences: {
    transposition: 0,
    chordsHidden: false
  },
};

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setSong: (state, action) => {
      state.song = action.payload;
    },
    resetSong: (state) => {
      state.song = {};
    },
    setSongName: (state, action) => {
      state.song.name = action.payload;
    },
    setBpm: (state, action) => {
      state.song.bpm = action.payload;
    },
    setKey: (state, action) => {
      state.song.key = action.payload;
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    setSections: (state, action) => {
      state.song.sections = action.payload;
    },
    setPreferences: (state, action) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload
      };
    },
    toggleChordsVisibility: (state) => {
      state.preferences.chordsHidden = !state.preferences.chordsHidden;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    }
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
  setPreferences,
  toggleChordsVisibility,
  setStatus
} = songSlice.actions;

export default songSlice.reducer;
