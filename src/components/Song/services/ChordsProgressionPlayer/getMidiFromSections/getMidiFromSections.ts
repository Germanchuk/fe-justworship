import {Midi} from "@tonejs/midi";
import store from "../../../../../redux/store.ts";
import {sectionsToLinesStream} from "../../sectionsToLinesStream.ts";
import {isChordsLine} from "../../../../../utils/keyUtils.ts";
import {chordLineToProgressionMap} from "./utils/chordLineToProgressionMap.ts";
import {createMidiFromProgression} from "./utils/createMidiFromProgression.ts";


export const getMidiFromSections = (): Midi => {
  const sections = store.getState()?.song?.song?.sections;
  const bpm = store.getState()?.song?.song?.bpm;

  const preparedProgression = sectionsToLinesStream(sections)
    .filter((line) => (isChordsLine(line)))
    .flatMap((line) => chordLineToProgressionMap(line))

  return createMidiFromProgression(preparedProgression, bpm);
}