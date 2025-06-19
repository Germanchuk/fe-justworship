import store from "../../../redux/store.ts";
import { setPreferences } from "../../../redux/slices/songSlice.ts";

export const handleTranspositionChange = (transposition: number) => {
  const prefs = store.getState().song.preferences || {};
  store.dispatch(setPreferences({ ...prefs, transposition }));
};
