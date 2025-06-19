import type React from "react";
import store from "../../../redux/store.ts";
import { setSections } from "../../../redux/slices/songSlice.ts";
import parseSections from "../../../utils/parseSections.ts";
import diffSections from "../../../utils/diffSections.ts";
import { Section } from "../../../models";

const history: any = [];
let historyIndex = -1;

export const handleSongTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const inputType = (e.nativeEvent as InputEvent).inputType;
  const rawText = e.target.value;

  if (inputType === 'historyUndo') {
    if (historyIndex > 0) {
      historyIndex -= 1;
      const snapshot = history[historyIndex];
      store.dispatch(setSections(snapshot.sections));
    }
    return;
  }

  if (inputType === 'historyRedo') {
    if (historyIndex < history.length - 1) {
      historyIndex += 1;
      const snapshot = history[historyIndex];
      store.dispatch(setSections(snapshot.sections));
    }
    return;
  }

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

  history.splice(historyIndex + 1);
  history.push({ text: rawText, sections: updatedSections });
  historyIndex = history.length - 1;
}