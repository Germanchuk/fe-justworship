import React from "react";
import { useParams } from "react-router-dom";
import { fetchAPI } from "../../utils/fetch-api";
import Song from "../../components/Song/Song";
import {
  ArrowLeftIcon,
  CheckIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import ReactDOM from "react-dom";

export default function SingleSong() {
  const { songId } = useParams();
  const [initialSong, setInitialSong] = React.useState<any>({});
  const [song, setSong] = React.useState<any>({});
  const [editMode, setEditMode] = React.useState(false);

  const songChanged = JSON.stringify(song) !== JSON.stringify(initialSong);

  React.useEffect(() => {
    fetchAPI(`/songs/${songId}`, {
      populate: ["sections"],
    }).then((data) => {
      setSong(data.data.attributes);
      setInitialSong(JSON.parse(JSON.stringify(data.data.attributes))); // deep copy of data.data.attributes);
    });
  }, [songId]);

  const saveSong = async () => {
    await fetchAPI(
      `/songs/${songId}`,
      {},
      {
        method: "PUT",
        body: JSON.stringify({
          data: song,
        }),
      }
    );
    // Create a deep copy of `song` before setting `initialSong`
    setInitialSong(JSON.parse(JSON.stringify(song)));
    setEditMode(false);
  };

  if (Object.keys(song).length === 0) {
    return <div>Такої пісні не існує</div>;
  }

  return (
    <>
      <Song song={song} setSong={setSong} editMode={editMode} />
      <ToggleModeButton
        toggleMode={() => setEditMode(!editMode)}
        editMode={editMode}
      />
      {songChanged && <SavingButton saveSong={saveSong} />}
    </>
  );
}

function ToggleModeButton({ toggleMode, editMode }) {
  return ReactDOM.createPortal(
    <div className="fixed bottom-4 right-4">
      <button
        className="btn btn-square bg-base-300 ring-neutral ring-1"
        onClick={toggleMode}
      >
        {editMode ? (
          <ArrowLeftIcon className="w-6 h-6" />
        ) : (
          <PencilIcon className="w-6 h-6" />
        )}
      </button>
    </div>, document.body
  );
}

function SavingButton({ saveSong }) {
  return ReactDOM.createPortal(
    <div className="fixed bottom-4 left-4">
      <button
        className="btn btn-square bg-base-300 ring-neutral ring-1"
        onClick={saveSong}
      >
        <CheckIcon className="w-6 h-6" />
      </button>
    </div>, document.body
  );
}
