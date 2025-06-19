import store from "../../../redux/store.ts";
import {setSongName } from "../../../redux/slices/songSlice.ts";

export const handleSongName = (songName) => {
  store.dispatch(setSongName(songName));
}