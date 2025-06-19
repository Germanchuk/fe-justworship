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
  useSetEditMode,
  useInitialSong,
  useSetInitialSong,
  usePreferences,
  useSetPreferences,
} from "../../hooks/song/selectors.ts";
import { fetchSongThunk } from "../../redux/thunks/songThunks";
import { Routes } from "../../constants/routes";
import {songApi, sPreferencesApi} from "../../api";
import {SwitchEdit} from "../../components/Song/Widgets/SwitchEdit/SwitchEdit.tsx";
import {CopyButton} from "../../components/Song/Widgets/CopyButton/CopyButton.tsx";
import {BackButton} from "../../components/BackButton/BackButton.tsx";

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
  const isReadonly = Boolean(song?.readonly);
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

  return (
    <>
      <BackButton />
      <Song />
      {isReadonly ?
        <CopyButton songId={songId} />
        : <SwitchEdit />}
    </>
  );
}
