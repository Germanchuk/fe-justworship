import {Midi} from "@tonejs/midi";
import store from "../../../../../redux/store.ts";
import {sectionsToLinesStream} from "../../sectionsToLinesStream.ts";
import {isChordsLine} from "../../../../../utils/keyUtils.ts";
import {chordLineToProgressionMap} from "./utils/chordLineToProgressionMap.ts";
import {createMidiFromProgression, type ChordEvent} from "./utils/createMidiFromProgression.ts";
import {progressionToTimeline, type ChordTimelineEvent} from "./utils/progressionToTimeline.ts";

export interface PreparedMidiData {
  midi: Midi;
  progression: ChordEvent[];
  timeline: ChordTimelineEvent[];
  bpm: number;
}

export const getMidiFromSections = (): PreparedMidiData => {
  const sections = store.getState()?.song?.song?.sections;
  const bpm = store.getState()?.song?.song?.bpm ?? 70;

  const progression = sectionsToLinesStream(sections)
    .filter((line) => (isChordsLine(line)))
    .flatMap((line) => chordLineToProgressionMap(line)) as ChordEvent[];

  const midi = createMidiFromProgression(progression, bpm);
  const timeline = progressionToTimeline(progression, bpm);

  return { midi, progression, timeline, bpm };
};
