import LyricsPlayground from "../../components/LyricsPlayground/LyricsPlayground.tsx";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchSongThunk } from "../../redux/thunks/songThunks";
import { useSetEditMode } from "../../hooks/song";

export default function Sandbox() {
  const dispatch = useDispatch();
  const setEditMode = useSetEditMode();

  React.useEffect(() => {
    dispatch(fetchSongThunk(94));
    setEditMode(true);
  }, [dispatch, setEditMode]);

  return <div className="m-auto">
    <LyricsPlayground className="text-3xl font-bold min-h-96 min-w-96" />
  </div>
}