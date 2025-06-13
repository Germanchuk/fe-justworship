import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPreferences,
  createPreference,
  updatePreference,
  saveSong as saveSongRequest,
  removeSong,
  copySong as copySongRequest,
} from "../../services";
import Song from "../../components/Song/Song";
import {
  ArrowLeftIcon,
  DocumentDuplicateIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import {addNotificationWithTimeout} from "../../redux/slices/notificationsSlice.ts";
import {
  useSong,
  useSetSong,
  useEditMode,
  useSetEditMode,
  useInitialSong,
  useSetInitialSong,
  usePreferences,
  useSetPreferences,
} from "../../hooks/song";
import { fetchSongThunk } from "../../redux/thunks/songThunks";
import { Routes } from "../../constants/routes";

export default function SingleSong() {
  const { songId } = useParams();
  const initialSong = useInitialSong();
  const setInitialSong = useSetInitialSong();
  const preferences = usePreferences();
  const setPreferences = useSetPreferences();
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
    if (!songId) return;
    fetchPreferences(songId).then((response) => {
      setPreferences(response.data);
    });
  }, [songId]);

  React.useEffect(() => {
    if (renderTime.current === 0 || renderTime.current === 1) {
      renderTime.current++;
      return;
    }
      if (!preferences?.id) {
        createPreference(songId as string, preferences);
      } else {
        updatePreference(preferences?.id, preferences);
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
    await saveSongRequest(songId as string, song)
      .then((data) => {
        dispatch(
          addNotificationWithTimeout({
            type: "success",
            message: "Збережено",
          })
        );
        setSong(data.data);
        // Create a deep copy of `song` before setting `initialSong`
        setInitialSong(JSON.parse(JSON.stringify(data.data)));
        setEditMode(false);
      })
      .catch(() => {
        dispatch(
          addNotificationWithTimeout({
            type: "error",
            message: "Нажаль пісня не збереглась, спробуй ще раз",
          })
        );
      })
  };

  const deleteSong = async () => {
    await removeSong(songId as string, song).then(() => {
      navigate(Routes.BandSongs);
    })
      .catch(() => {
        dispatch(addNotificationWithTimeout({
          type: "error",
          message: "Помилка серверу, не вдалось видалити пісню",
        }));
      });
  }

  const copySong = () => {
    copySongRequest(songId as string).then((data) => {
      navigate(`${Routes.PublicSongs}/${data.data.id}`);
    })
      .catch(() => {
        dispatch(addNotificationWithTimeout({
          type: "error",
          message: "Помилка серверу, не вдалось скопіювати пісню",
        }));
      });
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
