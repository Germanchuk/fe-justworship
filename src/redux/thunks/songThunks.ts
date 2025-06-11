import { Dispatch } from '@reduxjs/toolkit';
import { fetchAPI } from '../../utils/fetch-api';
import { setSong } from '../slices/songSlice';

export const fetchSongThunk = (songId: string | number) => async (dispatch: Dispatch) => {
  const data = await fetchAPI(`/currentBandSongs/${songId}`, {
    populate: ['sections'],
  });
  dispatch(setSong(data.data));
  return data.data;
};
