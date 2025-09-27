import "./Song.css";
import KeySelector from "./Widgets/KeySelector/KeySelector";
import BpmSelector from "./Widgets/BpmSelector/BpmSelector";
import classNames from "classnames";
import DeleteSong from "./DeleteSong/DeleteSong.tsx";
import CapoSelector from "./Widgets/CapoSelector/CapoSelector.tsx";
import {useChordsVisibility, useSections} from "../../hooks/song/selectors.ts";
import { SongName } from "./SongName/SongName.tsx";
import {ExportDoc} from "./Widgets/ExportDoc/ExportDoc.tsx";
import {HideChords} from "./Widgets/HideChords/HideChords.tsx";
import LyricsPlayground from "./LyricsPlayground/LyricsPlayground.tsx";

export default function Song() {
  const chordsHidden = useChordsVisibility();
  const sections = useSections();

  return (
    <div
      className={classNames("flex flex-col gap-4 pb-16", {
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
          {/* row-like widget zone, behavior flex-wrap */}
        </div>
      </div>
      <LyricsPlayground sections={sections} />
      <DeleteSong />
    </div>
  );
}
