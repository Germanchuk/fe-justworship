import React from "react";
import useUndo from "./useUndo";

export default function useSongEditor<T>(initialValue: T, maxHistory = 15) {
  const [initialSong, setInitialSong] = React.useState<T>(initialValue);
  const {
    state: song,
    set: setSong,
    reset: resetSong,
    undo: undoSong,
    canUndo,
  } = useUndo<T>(initialValue, maxHistory);

  const loadSong = React.useCallback(
    (data: T) => {
      setInitialSong(JSON.parse(JSON.stringify(data)));
      resetSong(data);
    },
    [resetSong]
  );

  const songChanged = React.useMemo(
    () => JSON.stringify(song) !== JSON.stringify(initialSong),
    [song, initialSong]
  );

  return {
    song,
    setSong,
    loadSong,
    undoSong,
    canUndo,
    songChanged,
    initialSong,
  } as const;
}
