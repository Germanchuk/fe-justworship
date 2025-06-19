import store from "../../../../redux/store.ts";
import { setKey, setSections } from "../../../../redux/slices/songSlice.ts";
import { remapChords } from "../../../../utils/keyUtils.ts";

export const handleChangeKey = (key: string) => {
  store.dispatch(setKey(key));
};

export const handleTransposeSong = (key: string) => {
  const song = store.getState().song.song;
  const sections = remapChords(song.sections, song.key, key);
  store.dispatch(setSections(sections));
  store.dispatch(setKey(key));
};
