import { useDispatch, useSelector } from 'react-redux';
import {
  setSong,
  setEditMode,
  setPreferences,
} from '../../redux/slices/songSlice';

export const useSong = () => useSelector((state: any) => state.song.song);
export const useBpm = () => useSelector((state: any) => state.song.song.bpm);
export const useKey = () => useSelector((state: any) => state.song.song.key);
export const useSongName = () => useSelector((state: any) => state.song.song.name);
export const useEditMode = () => useSelector((state: any) => state.song.editMode);
export const useStatus = () => useSelector((state: any) => state.song.status);
export const useSections = () => useSelector((state: any) => state.song.song.sections);

export const usePreferences = () => useSelector((state: any) => state.song.preferences);
export const useChordsVisibility = () => useSelector((state: any) => state.song.preferences.chordsHidden);
export const useTransposition = () => useSelector((state: any) => state.song.preferences.transposition);

export const useSetSong = () => {
  const dispatch = useDispatch();
  return (song: any) => dispatch(setSong(song));
};

export const useSetEditMode = () => {
  const dispatch = useDispatch();
  return (mode: boolean) => dispatch(setEditMode(mode));
};

export const useSetPreferences = () => {
  const dispatch = useDispatch();
  return (prefs: any) => dispatch(setPreferences(prefs));
};
