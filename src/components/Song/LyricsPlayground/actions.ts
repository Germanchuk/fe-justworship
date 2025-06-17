import store from "../../../redux/store.ts";
import { setSongAsText } from "../../../redux/slices/songSlice.ts";

export const handleSongTextChange = (e) => {
  store.dispatch(setSongAsText(e.target.value));
}