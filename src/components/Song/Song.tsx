import MagicInput from "./MagicInput/MagicInput";
import LyricsPlayground from "../LyricsPlayground/LyricsPlayground";
import "./Song.css";
import KeySelector from "./KeySelector/KeySelector";
import {useState} from "react";
import {DocumentArrowDownIcon, EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import classNames from "classnames";
import {remapChords} from "../../utils/keyUtils";
import DeleteSong from "./DeleteSong/DeleteSong.tsx";
import CapoSelector from "./CapoSelector/CapoSelector.tsx";
import {createDocument} from "../../services";

export default function Song({song, setSong, deleteSong = null, editMode, preferences = null, setPreferences = null}) {
  const [chordsHidden, setChordsHidden] = useState(false);
  const handleSongName = (value) => {
    setSong((song) => {
      return {...song, name: value};
    });
  };

  const setBpm = (value) => {
    setSong((song) => {
      return {...song, bpm: value.replace(/\D+/g, "")};
    });
  };

  const setBasicKey = (newKey, {shouldRemapSections = false} = {}) => {
    setSong((song) => {
      if (shouldRemapSections) {
        song.sections = remapChords(
          song.sections,
          song.key,
          newKey
        )
      }
      return {
        ...song,
        key: newKey
      };
    });
  };
  const setTransposition = (transposition) => {
    setPreferences((preferences) => {
      return {...preferences, transposition};
    });
  };

  return (
    <div
      className={classNames("flex flex-col gap-4 pb-8", {
        chordsHidden: chordsHidden,
      })}
    >
      <MagicInput
        className="text-3xl font-bold"
        value={song.name}
        setValue={handleSongName}
        editMode={editMode}
      />
      <div className="flex flex-col gap-2">
        <KeySelector
          basicKey={song.key}
          setBasicKey={setBasicKey}
        />
        <CapoSelector value={preferences?.transposition || 0} setValue={setTransposition} basicKey={song.key}
                      editMode={editMode}/>
        <div className="flex gap-2 items-center">
          <div className="text font-semibold">Темп:</div>
          <MagicInput
            className="px-2 text-xl rounded w-20"
            value={String(song.bpm)}
            setValue={setBpm}
            editMode={editMode}
          />
        </div>
        <div className="flex gap-2">
          <button
            className="btn btn-sm"
            onClick={() => setChordsHidden(!chordsHidden)}
          >
            {chordsHidden ? <EyeIcon className="w-4"/>
              : <EyeSlashIcon className="w-4"/>}
            {chordsHidden ? "Показати" : "Сховати"} акорди
          </button>
          <button
            className="btn btn-sm"
            onClick={() => createDocument(song)}
          >
            <DocumentArrowDownIcon className="w-5"/>
            .docx
          </button>
        </div>
      </div>
      <LyricsPlayground song={song} setSong={setSong} />
      {editMode && deleteSong && <DeleteSong deleteSong={deleteSong}/>}
    </div>
  );
}
