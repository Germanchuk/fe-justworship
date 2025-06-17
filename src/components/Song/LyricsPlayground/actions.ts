import store from "../../../redux/store.ts";
import { setSections } from "../../../redux/slices/songSlice.ts";
import parseSections from "../../../utils/parseSections.ts";
import diffSections from "../../../utils/diffSections.ts";

export const handleSongTextChange = (e) => {
  const rawText = e.target.value;
  const state = store.getState();
  const oldSections = state.song.song.sections || [];
  const parsed = parseSections(rawText);
  const newContents = parsed.map((p) => p.content);
  const updatedSections = diffSections(oldSections, newContents).map(
    (section, idx) => ({
      ...section,
      spacing: parsed[idx]?.spacing ?? section.spacing ?? 2,
    }),
  );
  store.dispatch(setSections(updatedSections));
}