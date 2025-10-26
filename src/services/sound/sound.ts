import store from "../../redux/store.ts";
import {sectionsToLinesStream} from "../../components/Song/utils/songUtils.ts";
import {isChordsLine} from "../../utils/keyUtils.ts";

export const playSound = () => {
  const linesArray = sectionsToLinesStream(store.getState().song.song.sections);
  // console.log(store.getState());

  const chords = linesArray.filter((line) => (isChordsLine(line)));

  console.log(chords);
}
