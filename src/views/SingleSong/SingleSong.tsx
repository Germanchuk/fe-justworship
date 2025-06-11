import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAPI } from "../../utils/fetch-api";
import Song from "../../components/Song/Song";
import {
  ArrowLeftIcon,
  DocumentDuplicateIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import {addNotificationWithTimeout} from "../../redux/slices/notificationsSlice.ts";
import { useSong, useSetSong, useEditMode, useSetEditMode } from "../../hooks/song";
import { fetchSongThunk } from "../../redux/thunks/songThunks";
import { Routes } from "../../constants/routes";

export default function SingleSong() {
  const { songId } = useParams();
  const [initialSong, setInitialSong] = React.useState<any>({});
  const [preferences, setPreferences] = React.useState<any>({});
  const editMode = useEditMode();
  const setEditMode = useSetEditMode();
  const [ error, setError ] = React.useState();
  const dispatch = useDispatch();
  const song = useSong();
  const setSong = useSetSong();
  const navigate = useNavigate();
  const isReadonly = Boolean(initialSong?.readonly);
  const renderTime = useRef(0);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    setEditMode(false);
  }, []);


  React.useEffect(() => {
    fetchAPI(`/getPreferencesBySongId/${songId}`)
      .then((response) => {
        setPreferences(response.data);
      });
  }, [songId]);

  React.useEffect(() => {
    if (renderTime.current === 0 || renderTime.current === 1) {
      renderTime.current++;
      return;
    }
      if (!preferences?.id) {
        fetchAPI(`/createPreference/${songId}`, {}, {
          method: "POST",
          body: JSON.stringify(preferences)
        });
      } else {
        fetchAPI(`/savePreference/${preferences?.id}`, {}, {
          method: "PUT",
          body: JSON.stringify(preferences),
        });
      }
  }, [preferences, songId]);

  React.useEffect(() => {
    if (!songId) return;
    dispatch(fetchSongThunk(songId))
      .then((data: any) => {
        setInitialSong(JSON.parse(JSON.stringify(data)));
      })
      .catch((error) => {
        setError(error);
      });
  }, [songId, dispatch]);

  React.useEffect(() => {
    if (!initialSong?.id) return;
    if (JSON.stringify(song) === JSON.stringify(initialSong)) return;

    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    saveTimeout.current = setTimeout(() => {
      saveSong();
    }, 5000);

    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, [song]);

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
    ).then((data) => {
      dispatch(addNotificationWithTimeout({
        type: "success",
        message: "Збережено",
      }));
      setSong(data.data);
      // Create a deep copy of `song` before setting `initialSong`
      setInitialSong(JSON.parse(JSON.stringify(data.data)));
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

  const copySong = () => {
    fetchAPI(
      `/copySong/${songId}`,
      {},
      {
        method: "POST",
      }
    ).then((data) => {
      navigate(`${Routes.PublicSongs}/${data.data.id}`);
    })
      .catch(() => {
        dispatch(addNotificationWithTimeout({
          type: "error",
          message: "Помилка серверу, не вдалось скопіювати пісню"
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
        deleteSong={deleteSong}
        preferences={preferences}
        setPreferences={setPreferences}
      />
      {isReadonly ?
        <CopyButton copySong={copySong} />
        : <ToggleModeButton
        toggleMode={() => setEditMode(!editMode)}
        editMode={editMode}
      />}
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


function CopyButton({ copySong }) {
  return ReactDOM.createPortal(
    <div className="fixed bottom-4 right-4">
      <button
        className="btn btn-square bg-base-300 ring-neutral ring-1 rounded-3xl"
        onClick={copySong}
      >
        <DocumentDuplicateIcon className="w-6 h-6" />
      </button>
    </div>, document.body
  );
}
