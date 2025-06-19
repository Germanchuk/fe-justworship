import { createSlice } from '@reduxjs/toolkit';
import { Song } from '../../models';

export interface SongState extends Partial<Song> {
  editMode: boolean;
  song: Partial<Song>;
  initialSong: Partial<Song>;
  preferences: { transposition: number; chordsHidden: boolean; };
}

const initialState: SongState = {
  editMode: true,
  song: {},
  initialSong: {},
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
    setInitialSong: (state, action) => {
      state.initialSong = action.payload;
    },
    setPreferences: (state, action) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload
      };
    },
    toggleChordsVisibility: (state) => {
      state.preferences.chordsHidden = !state.preferences.chordsHidden;
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
  setInitialSong,
  setPreferences,
  toggleChordsVisibility
} = songSlice.actions;

export default songSlice.reducer;
