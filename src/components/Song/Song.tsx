import MagicInput from "./MagicInput/MagicInput";
import SongSections from "./SongSections/SongSections";
import "./Song.css";
import KeySelector from "./KeySelector/KeySelector";
import { useState } from "react";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

export default function Song({ song, setSong, editMode }) {
    const [chordsHidden, setChordsHidden] = useState(false);
  const handleSongName = (value) => {
    setSong((song) => {
      return { ...song, name: value };
    });
  };

  const setBpm = (value) => {
    setSong((song) => {
      return { ...song, bpm: value.replace(/\D+/g, "") };
    });
  };

  const setBasicKey = (key) => {
    setSong((song) => {
      return { ...song, key };
    });
  };
  const setTransposition = (transposition) => {
    setSong((song) => {
      return { ...song, transposition };
    });
  };

  return (
    <div className={classNames("flex flex-col gap-4 pb-8", {
        "chordsHidden": chordsHidden
    })}>
      <MagicInput
        className="text-3xl font-bold"
        value={song.name}
        setValue={handleSongName}
        editMode={editMode}
      />
      <div className="flex flex-col gap-2">
        <KeySelector
          basicKey={song.key}
          transposition={song.transposition}
          setBasicKey={setBasicKey}
          setTransposition={setTransposition}
        />
        <div className="flex gap-2 items-center">
          <div className="text font-semibold">Темп:</div>
          <MagicInput
            placeholder="-"
            className="px-2 text-xl rounded"
            value={String(song.bpm)}
            setValue={setBpm}
            editMode={editMode}
          />
        </div>
        <button className="btn btn-square" onClick={() => setChordsHidden(!chordsHidden)}>
            <EyeSlashIcon className="w-4" />
        </button>
      </div>
      <SongSections song={song} setSong={setSong} editMode={editMode} />
    </div>
  );
}
