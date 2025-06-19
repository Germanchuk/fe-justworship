import store from "../../../../redux/store.ts";
import { setBpm } from "../../../../redux/slices/songSlice.ts";

export const handleBpmChange = (bpm) => {
  store.dispatch(setBpm(bpm.replace(/\D+/g, '')));
}