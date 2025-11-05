import {playMidiProgressionGpt} from "./playMidiGpt.ts";
import {getMidiFromSections} from "./getMidiFromSections/getMidiFromSections.ts";

class ChordsProgressionPlayer {
  static instance: ChordsProgressionPlayer;
  private controls = null;

  constructor() {}

  static getInstance = () => {
    if (!ChordsProgressionPlayer.instance) {
      ChordsProgressionPlayer.instance = new ChordsProgressionPlayer();
    }
    return ChordsProgressionPlayer.instance;
  }

  play = () => {
      this.controls = playMidiProgressionGpt(getMidiFromSections());
  }

  pause = () => {
    this.controls.pause();
  }

  stop = () => {
    this.controls.stop();
  }

  someMethodToHighlightMyChords = (callback) => {}

}

export default ChordsProgressionPlayer;
