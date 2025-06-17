import { createSlice, Slice } from '@reduxjs/toolkit';
import { Song } from '../../models';

interface SongState extends Partial<Song> {
  editMode: boolean;
  song: Partial<Song>;
  songAsText: string;
  initialSong: Partial<Song>;
  preferences: any;
}

const initialState: SongState = {
  editMode: true,
  song: {},
  songAsText: null,
  initialSong: {},
  preferences: {},
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
      state.preferences = action.payload;
    },
    setSongAsText: (state, action) => {
      state.songAsText = action.payload;
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
  setSongAsText,
} = songSlice.actions;

export default songSlice.reducer;
