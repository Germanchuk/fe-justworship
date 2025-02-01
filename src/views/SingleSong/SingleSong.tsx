import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import { fetchAPI } from "../../utils/fetch-api";
import Song from "../../components/Song/Song";
import {
  ArrowLeftIcon,
  CheckIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import ReactDOM from "react-dom";
import {useDispatch} from "react-redux";
import {addNotificationWithTimeout} from "../../redux/slices/notificationsSlice.ts";
import { Routes } from "../../constants/routes";

export default function SingleSong() {
  const { songId } = useParams();
  const [initialSong, setInitialSong] = React.useState<any>({});
  const [song, setSong] = React.useState<any>({});
  const [editMode, setEditMode] = React.useState(false);
  const [ error, setError ] = React.useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const songChanged = JSON.stringify(song) !== JSON.stringify(initialSong);

  React.useEffect(() => {
    fetchAPI(`/currentBandSongs/${songId}`, {
      populate: ["sections"],
    })
      .then((data) => {
        setSong(data.data);
        setInitialSong(JSON.parse(JSON.stringify(data.data))); // deep copy of data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [songId]);

  const saveSong = async () => {
    await fetchAPI(
      `/currentBandSongs/${songId}`,
      {},
      {
        method: "PUT",
        body: JSON.stringify({
          data: song,
        }),
      }
    ).then(() => {
      dispatch(addNotificationWithTimeout({
        type: "success",
        message: "Збережено"
      }));
      // Create a deep copy of `song` before setting `initialSong`
      setInitialSong(JSON.parse(JSON.stringify(song)));
      setEditMode(false);
    })
    .catch(() => {
      dispatch(addNotificationWithTimeout({
        type: "error",
        message: "Нажаль пісня не збереглась, спробуй ще раз"
      }));
    })
  };

  const deleteSong = async () => {
    await fetchAPI(
      `/currentBandSongs/${songId}`,
      {},
      {
        method: "DELETE",
        body: song
      }
    ).then(() => {
      navigate(Routes.BandSongs);
    })
      .catch(() => {
        dispatch(addNotificationWithTimeout({
          type: "error",
          message: "Помилка серверу, не вдалось видалити пісню"
        }));
      });
  }

  if (error) {
    throw new Error(error);
  }

  if (Object.keys(song).length === 0) {
    return <div>Такої пісні не існує</div>;
  }

  return (
    <>
      <Song
        song={song}
        setSong={setSong}
        editMode={editMode}
        deleteSong={deleteSong}
      />
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
        className="btn btn-square bg-base-300 ring-neutral ring-1 rounded-3xl"
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
