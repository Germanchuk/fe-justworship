import React, {useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { fetchAPI } from "../../utils/fetch-api";
import Song from "../../components/Song/Song";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import ReactDOM from "react-dom";
import {useDispatch} from "react-redux";
import ActionBar from "./ActionBar";
import {addNotificationWithTimeout} from "../../redux/slices/notificationsSlice.ts";
import { Routes } from "../../constants/routes";

export default function SingleSong() {
  const { songId } = useParams();
  const [initialSong, setInitialSong] = React.useState<any>({});
  const [song, setSongState] = React.useState<any>({});
  const [preferences, setPreferences] = React.useState<any>({});
  const [editMode, setEditMode] = React.useState(false);
  const [hideLyrics, setHideLyrics] = React.useState(false);
  const [showTips, setShowTips] = React.useState(true);
  const [lockEditing, setLockEditing] = React.useState(false);
  const history = useRef<any[]>([]);
  const historyIndex = useRef(-1);
  const prevSongRef = useRef<any>();
  const [ error, setError ] = React.useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isReadonly = Boolean(initialSong?.readonly);
  const renderTime = useRef(0);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  const updateSong = (value: any) => {
    setSongState((prev) => {
      const newSong = typeof value === 'function' ? value(prev) : value;
      if (prevSongRef.current) {
        history.current = history.current.slice(0, historyIndex.current + 1);
        history.current.push(prev);
        historyIndex.current++;
      }
      prevSongRef.current = newSong;
      return newSong;
    });
  };

  const undo = () => {
    if (historyIndex.current >= 0) {
      const prev = history.current[historyIndex.current];
      historyIndex.current -= 1;
      prevSongRef.current = prev;
      setSongState(prev);
    }
  };

  const redo = () => {
    if (historyIndex.current + 1 < history.current.length) {
      historyIndex.current += 1;
      const next = history.current[historyIndex.current];
      prevSongRef.current = next;
      setSongState(next);
    }
  };


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
    fetchAPI(`/currentBandSongs/${songId}`, {
      populate: ["sections"],
    })
      .then((data) => {
        setSongState(data.data);
        prevSongRef.current = data.data;
        setInitialSong(JSON.parse(JSON.stringify(data.data))); // deep copy of data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [songId]);

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
        message: "Збережено"
      }));
      setSongState(data.data);
      prevSongRef.current = data.data;
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
        song={song}
        setSong={updateSong}
        editMode={editMode}
        deleteSong={deleteSong}
        preferences={preferences}
        setPreferences={setPreferences}
        hideLyrics={hideLyrics}
        showTips={showTips}
      />
      {isReadonly ? (
        <CopyButton copySong={copySong} />
      ) : (
        <ActionBar
          editMode={editMode}
          toggleEdit={() => !lockEditing && setEditMode(!editMode)}
          hideLyrics={hideLyrics}
          toggleHideLyrics={() => setHideLyrics(!hideLyrics)}
          showTips={showTips}
          toggleShowTips={() => setShowTips(!showTips)}
          lockEditing={lockEditing}
          toggleLock={() => {
            const next = !lockEditing;
            setLockEditing(next);
            if (next) setEditMode(false);
          }}
          undo={undo}
          redo={redo}
        />
      )}
    </>
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
