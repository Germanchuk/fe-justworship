import * as Tone from "tone";
import {
  getMidiPlayerState,
  playMidiProgressionGpt,
  type MidiPlaybackControls,
  type MidiPlayerState,
  type PlayOptions,
} from "./playMidiGpt.ts";
import {getMidiFromSections} from "./getMidiFromSections/getMidiFromSections.ts";
import type {ChordTimelineEvent} from "./getMidiFromSections/utils/progressionToTimeline.ts";

type StateListener = (state: MidiPlayerState) => void;
type ChordListener = (event: ChordTimelineEvent | null) => void;

class ChordsProgressionPlayer {
  static instance: ChordsProgressionPlayer;
  private controls: MidiPlaybackControls | null = null;
  private state: MidiPlayerState = getMidiPlayerState();
  private stateListeners = new Set<StateListener>();
  private chordListeners = new Set<ChordListener>();
  private scheduledChordEvents: number[] = [];
  private currentChordEvent: ChordTimelineEvent | null = null;

  static getInstance = () => {
    if (!ChordsProgressionPlayer.instance) {
      ChordsProgressionPlayer.instance = new ChordsProgressionPlayer();
    }
    return ChordsProgressionPlayer.instance;
  };

  private setState(state: MidiPlayerState) {
    if (this.state === state) return;
    this.state = state;
    this.stateListeners.forEach((listener) => listener(state));
  }

  private emitChord(event: ChordTimelineEvent | null) {
    this.currentChordEvent = event;
    this.chordListeners.forEach((listener) => listener(event));
  }

  private clearScheduledChordEvents() {
    this.scheduledChordEvents.forEach((id) => Tone.Transport.clear(id));
    this.scheduledChordEvents = [];
  }

  private scheduleChordHighlights(timeline: ChordTimelineEvent[]) {
    this.clearScheduledChordEvents();

    if (timeline.length === 0) {
      this.emitChord(null);
      return;
    }

    const Transport = Tone.Transport;
    const now = Transport.seconds;
    const activeEvent = [...timeline].reverse().find((event) => {
      const end = event.start + event.duration;
      return now >= event.start && now < end;
    }) ?? null;

    this.emitChord(activeEvent ?? null);

    timeline.forEach((event) => {
      const timeUntil = event.start - now;
      if (timeUntil <= 0) {
        return;
      }

      const id = Transport.scheduleOnce(() => {
        this.emitChord(event);
      }, `+${timeUntil}`);
      this.scheduledChordEvents.push(id);
    });
  }

  private handlePlaybackComplete() {
    this.clearScheduledChordEvents();
    this.emitChord(null);
    this.controls = null;
    this.setState("idle");
  }

  getState() {
    return this.state;
  }

  getCurrentChord() {
    return this.currentChordEvent;
  }

  onStateChange(listener: StateListener) {
    this.stateListeners.add(listener);
    listener(this.state);
    return () => this.stateListeners.delete(listener);
  }

  onChordChange(listener: ChordListener) {
    this.chordListeners.add(listener);
    listener(this.currentChordEvent);
    return () => this.chordListeners.delete(listener);
  }

  play = async (options: Partial<PlayOptions> = {}) => {
    if (this.state !== "idle") {
      this.stop();
    }

    const prepared = getMidiFromSections();
    const { midi, timeline, bpm } = prepared;

    if (timeline.length === 0) {
      this.handlePlaybackComplete();
      return;
    }

    this.setState("loading");

    const mergedOptions: PlayOptions = {
      bpm,
      ...options,
    };

    mergedOptions.onEnded = () => {
      this.handlePlaybackComplete();
      options.onEnded?.();
    };

    try {
      this.controls = await playMidiProgressionGpt(midi, mergedOptions);
      this.scheduleChordHighlights(timeline);
      this.setState("playing");
    } catch (error) {
      this.handlePlaybackComplete();
      throw error;
    }
  };

  pause = () => {
    if (this.state !== "playing") return;
    this.controls?.pause();
    this.setState("paused");
  };

  resume = () => {
    if (this.state !== "paused") return;
    this.controls?.resume();
    this.setState("playing");
  };

  stop = () => {
    if (this.state === "idle") return;
    this.controls?.stop({ hard: true });
    this.handlePlaybackComplete();
  };
}

export default ChordsProgressionPlayer;
