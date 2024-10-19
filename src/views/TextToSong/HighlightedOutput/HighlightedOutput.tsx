import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAPI } from "../../../utils/fetch-api";
import Block from "./Block/Block";
import EditIcon from "../../../icons/EditIcon";
import ArrowLeftIcon from "../../../icons/ArrowLeftIcon";
import MagicInput from "../../../components/Song/MagicInput/MagicInput";
import { ContentBlock, SongObject } from "../../../utils/compiler/compiler";

export default function SingleSong({
  songObject,
  hideSongName = false,
}: {
  songObject;
  hideSongName?: boolean;
}) {
  // const { songId } = useParams();
  const [editMode, setEditMode] = React.useState(false);
  // const [song, setSong] = React.useState<SongObject>(songObject);
  // useEffect(() => {
  //   fetchAPI(`/songs/${songId}`).then((data) => {
  //     setSong(data.data.attributes);
  //   });
  // }, [songId]);

  if (Object.keys(songObject).length === 0) {
    return null;
  }

  return (
    <div className="p-4">
      {!hideSongName && (
        <div className="mb-4">
          <SongTitle editMode={editMode}>{songObject?.name}</SongTitle>
        </div>
      )}
      <div className="grid grid-cols-1 gap-7 text-lg">
        {songObject.blocks.map((block: ContentBlock, index) => {
          return <Block data={block} key={index} editMode={editMode} />;
        })}
      </div>
      <ToggleModeButton setEditMode={setEditMode} editMode={editMode} />
    </div>
  );
}

function SongTitle({ children, editMode }) {
  if (editMode) {
    return (
      <MagicInput className="text-3xl font-bold tracking-tight focus:outline-neutral">
        {children}
      </MagicInput>
    );
  } else {
    return <h1 className="text-3xl font-bold tracking-tight">{children}</h1>;
  }
}

function ToggleModeButton({ setEditMode, editMode }) {
  return (
    <div className="fixed bottom-4 right-4">
      <button
        className="btn btn-square bg-base-300 ring-neutral ring-1"
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? <ArrowLeftIcon /> : <EditIcon />}
      </button>
    </div>
  );
}
