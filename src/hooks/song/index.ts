import { useDispatch, useSelector } from 'react-redux';
import {
  setSong,
  setKey,
  setEditMode,
  setSections,
  setInitialSong,
  setPreferences,
} from '../../redux/slices/songSlice';
import { remapChords } from '../../utils/keyUtils';

export const useSong = () => useSelector((state: any) => state.song.song);
export const useBpm = () => useSelector((state: any) => state.song.song.bpm);
export const useKey = () => useSelector((state: any) => state.song.song.key);
export const useSongName = () => useSelector((state: any) => state.song.song.name);
export const useEditMode = () => useSelector((state: any) => state.song.editMode);
export const useSections = () => useSelector((state: any) => state.song.song.sections);
export const useInitialSong = () => useSelector((state: any) => state.song.initialSong);
export const usePreferences = () => useSelector((state: any) => state.song.preferences);

export const useSetSong = () => {
  const dispatch = useDispatch();
  return (song: any) => dispatch(setSong(song));
};

export const useSetKey = () => {
  const dispatch = useDispatch();
  const song = useSong();
  return (
    newKey: string,
    { shouldRemapSections = false } = {},
  ) => {
    if (shouldRemapSections) {
      dispatch(setSections(remapChords(song.sections, song.key, newKey)));
    }
    dispatch(setKey(newKey));
  };
};

export const useSetEditMode = () => {
  const dispatch = useDispatch();
  return (mode: boolean) => dispatch(setEditMode(mode));
};

export const useSetSections = () => {
  const dispatch = useDispatch();
  return (sections: any) => dispatch(setSections(sections));
};

export const useSetInitialSong = () => {
  const dispatch = useDispatch();
  return (song: any) => dispatch(setInitialSong(song));
};

export const useSetPreferences = () => {
  const dispatch = useDispatch();
  return (prefs: any) => dispatch(setPreferences(prefs));
};
