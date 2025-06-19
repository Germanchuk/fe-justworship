import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Song from "../../components/Song/Song";
import {
  DocumentDuplicateIcon,
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
import ReactSwitch from "react-switch";
import {songApi, sPreferencesApi} from "../../api";

export default function SingleSong() {
  const { songId } = useParams();
  const initialSong = useInitialSong();
  const setInitialSong = useSetInitialSong();
  const preferences = usePreferences();
  const setPreferences = useSetPreferences();
  const setEditMode = useSetEditMode();
  const dispatch = useDispatch();
  const song = useSong();
  const setSong = useSetSong();
  const navigate = useNavigate();
  const isReadonly = Boolean(initialSong?.readonly);
  const renderTime = useRef(0);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    setEditMode(false);

    return () => {
      dispatch(setSong({})); // reset song
    }
  }, []);


  React.useEffect(() => {
    if (!songId) return;
    sPreferencesApi.getPreferences(songId).then((response) => {
      setPreferences(response.data);
    });
  }, [songId]);

  React.useEffect(() => {
    if (renderTime.current === 0 || renderTime.current === 1) {
      renderTime.current++;
      return;
    }
      if (!preferences?.id) {
        sPreferencesApi.createPreferences(songId as string, preferences);
      } else {
        sPreferencesApi.updatePreferences(preferences?.id, preferences);
      }
  }, [preferences, songId]);

  React.useEffect(() => {
    if (!songId) return;
    dispatch(fetchSongThunk(songId))
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
    await songApi.updateSong(songId as string, song)
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
    songApi.deleteSong(songId, song).then(() => {
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
    songApi.copySong(songId as string).then((data) => {
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
      <Song deleteSong={deleteSong} />
      {isReadonly ?
        <CopyButton copySong={copySong} />
        : <ToggleModeButton />}
    </>
  );
}

function ToggleModeButton() {
  const setEditMode = useSetEditMode();
  const editMode = useEditMode();
  return ReactDOM.createPortal(
    <div className="fixed bottom-4 right-4 p-2 bg-base-300 rounded-3xl flex items-center">
      <ReactSwitch
        checked={!editMode}
        onChange={(checked) => setEditMode(!checked)}
      />
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
