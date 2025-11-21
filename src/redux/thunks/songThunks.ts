import { Dispatch } from '@reduxjs/toolkit';
import { fetchAPI } from '../../utils/fetch-api';
import {setSong, setStatus} from '../slices/songSlice';

export const fetchSongThunk = (songId: string | number) => async (dispatch: Dispatch) => {

  try {
    const data = await fetchAPI(`/currentBandSongs/${songId}`, {
      populate: ['sections'],
    });
    dispatch(setSong(data.data));
    dispatch(setStatus("saved"));
  } catch {
    dispatch(setStatus("error"));
  }

};

