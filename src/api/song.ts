import {fetchAPI} from "../utils/fetch-api.tsx";

export const songApi = {
  createSong: (song) => fetchAPI(
    "/currentBandSongs",
    {},
    {
      method: "POST",
      body: JSON.stringify({
        data: song,
      }),
    }
  ),
  getSong: (songId) => (
    fetchAPI(`/currentBandSongs/${songId}`, {
      populate: ["sections"],
    })
  ),
  updateSong: (songId, song) => fetchAPI(`/currentBandSongs/${songId}`, {}, {
    method: "PUT",
    body: JSON.stringify({data: song}),
  }),
  deleteSong: (songId, song) => fetchAPI(`/currentBandSongs/${songId}`, {}, {
    method: "DELETE",
    body: song, // do we need this body ?
  }),
  copySong: (songId) => fetchAPI(`/copySong/${songId}`, {}, { method: "POST" })
}