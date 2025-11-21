import React, {useCallback, useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import Song from "../../components/Song/Song";
import { useDispatch } from "react-redux";
import {addNotificationWithTimeout} from "../../redux/slices/notificationsSlice.ts";
import {
  useSong,
  useSetSong,
  usePreferences,
  useSetPreferences,
} from "../../hooks/song/selectors.ts";
import {fetchSongThunk} from "../../redux/thunks/songThunks";
import {songApi, sPreferencesApi} from "../../api";
import {useControls} from "../../context/controls.tsx";
import {SongControls} from "../../components/Song/SongControls/SongControls.tsx";
import {setStatus} from "../../redux/slices/songSlice.ts";

export default function SingleSong() {
  const { songId } = useParams();
  const preferences = usePreferences();
  const setPreferences = useSetPreferences();
  const dispatch = useDispatch();
  const song = useSong();
  const setSong = useSetSong();
  const isReadonly = Boolean(song?.readonly);
  const renderTime = useRef(0);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const isInitialSong = useRef(true);
  const { setControls } = useControls();

  React.useEffect(() => {
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

    if (song.id && isInitialSong.current) {
      isInitialSong.current = false;
      return;
    }
    dispatch(setStatus("pending"));
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    saveTimeout.current = setTimeout(() => {
      saveSong(song);
    }, 1000);

    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, [song]);

  useEffect(() => {
    setControls(<SongControls isReadonly={isReadonly} songId={songId} />);

    return () => {
      setControls(null);
    }
  }, [isReadonly, setControls, songId]);

  const saveSong = useCallback((song) => {
    dispatch(setStatus("saving"));
    songApi.updateSong(song.id, song)
      .then(() => {
        dispatch(setStatus("saved"));
      })
      .catch(() => {
        dispatch(setStatus("error"));
      });
  }, []);

  return <Song />;
}
