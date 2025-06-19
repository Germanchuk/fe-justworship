import LyricsPlayground from "./LyricsPlayground/LyricsPlayground";
import "./Song.css";
import KeySelector from "./Widgets/KeySelector/KeySelector";
import BpmSelector from "./Widgets/BpmSelector/BpmSelector";
import classNames from "classnames";
import DeleteSong from "./DeleteSong/DeleteSong.tsx";
import CapoSelector from "./Widgets/CapoSelector/CapoSelector.tsx";
import { useChordsVisibility } from "../../hooks/song/selectors.ts";
import { SongName } from "./SongName/SongName.tsx";
import {ExportDoc} from "./Widgets/ExportDoc/ExportDoc.tsx";
import {HideChords} from "./Widgets/HideChords/HideChords.tsx";

export default function Song() {
  const chordsHidden = useChordsVisibility();

  return (
    <div
      className={classNames("flex flex-col gap-4 pb-8", {
        chordsHidden: chordsHidden,
      })}
    >
      <SongName />
      <div className="flex flex-col gap-1">
        {/* column-like widget-zone */}
        <KeySelector />
        <CapoSelector />
        <BpmSelector />
        <div className="flex gap-2">
          {/* row-like widget zone */}
          <HideChords />
          <ExportDoc />
        </div>
      </div>
      <LyricsPlayground />
      <DeleteSong />
    </div>
  );
}
