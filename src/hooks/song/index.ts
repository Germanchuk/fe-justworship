import { useDispatch, useSelector } from 'react-redux';
import {
  setSong,
  setBpm,
  setKey,
  setSongName,
  setEditMode,
  setSections,
} from '../../redux/slices/songSlice';
import { remapChords } from '../../utils/keyUtils';

export const useSong = () => useSelector((state: any) => state.song);
export const useBpm = () => useSelector((state: any) => state.song.bpm);
export const useKey = () => useSelector((state: any) => state.song.key);
export const useSongName = () => useSelector((state: any) => state.song.name);
export const useEditMode = () => useSelector((state: any) => state.song.editMode);
export const useSections = () => useSelector((state: any) => state.song.sections);

export const useSetSong = () => {
  const dispatch = useDispatch();
  return (song: any) => dispatch(setSong(song));
};

export const useSetBpm = () => {
  const dispatch = useDispatch();
  return (value: string) => dispatch(setBpm(value));
};

export const useSetKey = () => {
  const dispatch = useDispatch();
  return (
    newKey: string,
    { shouldRemapSections = false } = {},
  ) => {
    const song = useSong();
    if (shouldRemapSections) {
      dispatch(setSections(remapChords(song.sections, song.key, newKey)));
    }
    dispatch(setKey(newKey));
  };
};

export const useSetSongName = () => {
  const dispatch = useDispatch();
  return (name: string) => dispatch(setSongName(name));
};

export const useSetEditMode = () => {
  const dispatch = useDispatch();
  return (mode: boolean) => dispatch(setEditMode(mode));
};

export const useSetSections = () => {
  const dispatch = useDispatch();
  return (sections: any) => dispatch(setSections(sections));
};
