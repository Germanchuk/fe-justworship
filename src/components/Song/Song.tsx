import MagicInput from "./MagicInput/MagicInput";
import LyricsPlayground from "../LyricsPlayground/LyricsPlayground";
import "./Song.css";
import KeySelector from "./KeySelector/KeySelector";
import BpmSelector from "./BpmSelector/BpmSelector";
import { useState } from "react";
import {DocumentArrowDownIcon, EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import classNames from "classnames";
import DeleteSong from "./DeleteSong/DeleteSong.tsx";
import CapoSelector from "./CapoSelector/CapoSelector.tsx";
import {createDocument} from "../../services";
import ReactSwitch from "react-switch";
import { useSong, useSongName, useSetSongName, useEditMode } from "../../hooks/song";

export default function Song({ deleteSong = null, preferences = null, setPreferences = null }) {
  const song = useSong();
  const songName = useSongName();
  const setSongName = useSetSongName();
  const editMode = useEditMode();
  const [chordsHidden, setChordsHidden] = useState(false);
  const handleSongName = (value: string) => {
    setSongName(value);
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
      <ReactSwitch
        checked={chordsHidden}
        onChange={setChordsHidden}
        width={72}
        onClick={() => null}
      />
      <MagicInput
        className="text-3xl font-bold"
        value={songName}
        setValue={handleSongName}
      />
      <div className="flex flex-col gap-2">
        <KeySelector />
        <CapoSelector value={preferences?.transposition || 0} setValue={setTransposition} basicKey={song.key} />
        <BpmSelector />
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
      <LyricsPlayground
        transposition={preferences?.transposition || 0}
      />
      {editMode && deleteSong && <DeleteSong deleteSong={deleteSong}/>}
    </div>
  );
}
