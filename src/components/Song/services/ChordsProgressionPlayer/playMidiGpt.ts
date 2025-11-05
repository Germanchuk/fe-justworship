import * as Tone from "tone";
import { Midi } from "@tonejs/midi";
import padSample from "./pad-c4.mp3";
import pianoSample from "./c4-piano.wav";
import lotusPond from "./lotus-pond.m4a";
import {createPad} from "./createPad/createPad.ts";
import {createPiano} from "./createPiano/createPiano.ts";

type BBSTime = string; // "bars:beats:sixteenths"

interface MidiEvent {
  time: BBSTime;
  name: string;
  duration: BBSTime;
  velocity: number;
}

interface PlayOptions {
  bpm?: number;
  metronome?: boolean;     // default: true
  metronomePan?: number;   // -1..1; 1 — правий
  padVolume?: number;      // дБ
  pianoVolume?: number;    // дБ
}

interface MetronomeCtrl {
  start(at?: BBSTime | number): void;
  stop(): void;
  dispose(): void;
}

function toBBS(sec: number): BBSTime {
  return Tone.Time(sec).toBarsBeatsSixteenths();
}

function extractSignatureAndTempo(midi: Midi, fallbackBpm = 70) {
  const [num, den] = (midi.header.timeSignatures?.[0]?.timeSignature as [number, number]) || [4, 4];
  const bpm = midi.header.tempos?.[0]?.bpm ?? fallbackBpm;
  return { num, den, bpm };
}

function setupTransport(num: number, den: number, bpm: number) {
  const T = Tone.getTransport();
  T.cancel();
  T.stop();
  T.position = 0;
  T.timeSignature = [num, den];
  T.bpm.value = bpm;
  return T;
}

function midiToBBSEvents(midi: Midi): MidiEvent[] {
  return midi.tracks.flatMap((t) =>
    t.notes.map((n) => ({
      time: toBBS(n.time),
      name: Tone.Frequency(n.midi, "midi").toNote(),
      duration: toBBS(n.duration),
      velocity: n.velocity ?? 0.7,
    }))
  );
}

function createPart(events: MidiEvent[], players: { pad?: Tone.Sampler; piano?: Tone.Sampler }) {
  const part = new Tone.Part<MidiEvent>((time, e) => {
    players.pad?.triggerAttackRelease(e.name, e.duration, time, e.velocity);
    players.piano?.triggerAttackRelease(e.name, e.duration, time, e.velocity);
  }, events);
  part.loop = false;
  return part;
}

function createMetronome({ num, den, pan = 1 }: { num: number; den: number; pan?: number }): MetronomeCtrl {
  const tick = new Tone.MembraneSynth({
    octaves: 2,
    envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.05 },
    volume: 8,
  });
  const panner = new Tone.Panner(pan).toDestination();
  tick.connect(panner);

  const beatSubdivision = `${den}n`;
  let beatCount = 0;

  const loop = new Tone.Loop((time) => {
    const isBarStart = beatCount % num === 0;
    tick.triggerAttackRelease(isBarStart ? "C5" : "C4", "16n", time);
    beatCount++;
  }, beatSubdivision);

  return {
    start(at: BBSTime | number = 0) { loop.start(at); },
    stop() { loop.stop(); },
    dispose() { loop.dispose(); tick.dispose(); panner.dispose(); },
  };
}

function computeEndBBS(midi: Midi): BBSTime {
  const maxEndSec = Math.max(0, ...midi.tracks.flatMap((t) => t.notes.map((n) => n.time + n.duration)));
  return toBBS(maxEndSec);
}

// =================== КЛАС ===================

export class MidiPlayer {
  private part: Tone.Part<MidiEvent> | null = null;
  private metro: MetronomeCtrl | null = null;
  private pad: Tone.Sampler | null = null;
  private piano: Tone.Sampler | null = null;
  private isPlaying = false;

  constructor(private defaults: PlayOptions = {}) {}

  async play(midi: Midi, opts: PlayOptions = {}) {
    await Tone.start();

    if (this.isPlaying) this.stop({ hard: true });
    this.dispose(); // чистий старт

    const { num, den, bpm } = extractSignatureAndTempo(midi, opts.bpm ?? this.defaults.bpm ?? 70);
    const Transport = setupTransport(num, den, bpm);

    this.pad = createPad();
    this.piano = createPiano();
    await Tone.loaded();

    const events = midiToBBSEvents(midi);
    this.part = createPart(events, { pad: this.pad, piano: this.piano });
    this.part.start(0);

    const endBBS = computeEndBBS(midi);

    if ((opts.metronome ?? this.defaults.metronome) !== false) {
      this.metro = createMetronome({ num, den, pan: opts.metronomePan ?? this.defaults.metronomePan ?? 1 });
      this.metro.start(0);
      Transport.scheduleOnce(() => this.metro?.stop(), endBBS);
    }

    Transport.start();
    this.isPlaying = true;
  }

  stop({ hard = false, fadeOut = 0 }: { hard?: boolean; fadeOut?: number } = {}) {
    const Transport = Tone.getTransport();

    if (fadeOut > 0) Tone.Destination.volume.rampTo(-Infinity, fadeOut);

    this.metro?.stop();
    this.part?.stop();

    Transport.stop();
    if (hard) {
      Transport.cancel();
      Transport.position = 0;
    }

    this.isPlaying = false;
  }

  dispose() {
    try { this.metro?.dispose(); } catch {}
    try { this.part?.dispose(); } catch {}
    try { this.pad?.dispose(); } catch {}
    try { this.piano?.dispose(); } catch {}
    this.metro = null;
    this.part = null;
    this.pad = null;
    this.piano = null;
  }

  // опціонально: подати зовнішній Transport (для узгодженої роботи з іншими класами)
  // attachTransport(existing: typeof Tone.getTransport()) { ... }
}

// ========== Тонка обгортка під старе API (окремі функції) ==========
const defaultPlayer = new MidiPlayer();

export async function playMidiProgressionGpt(midi: Midi, opts?: PlayOptions) {
  return defaultPlayer.play(midi, opts);
}
export function stopMidiProgression(options?: { hard?: boolean; fadeOut?: number }) {
  defaultPlayer.stop(options);
}
export function disposeMidiProgression() {
  defaultPlayer.dispose();
}
