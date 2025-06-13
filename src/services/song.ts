import { fetchAPI } from "../utils/fetch-api";

export async function fetchSong(songId: string | number) {
  const data = await fetchAPI(`/currentBandSongs/${songId}`, {
    populate: ["sections"],
  });
  return data.data;
}

export async function saveSong(songId: string | number, song: any) {
  return fetchAPI(`/currentBandSongs/${songId}`, {}, {
    method: "PUT",
    body: JSON.stringify({ data: song }),
  });
}

export async function removeSong(songId: string | number, song?: any) {
  return fetchAPI(`/currentBandSongs/${songId}`, {}, {
    method: "DELETE",
    body: song,
  });
}

export async function copySong(songId: string | number) {
  return fetchAPI(`/copySong/${songId}`, {}, { method: "POST" });
}

export async function fetchPreferences(songId: string | number) {
  return fetchAPI(`/getPreferencesBySongId/${songId}`);
}

export async function createPreference(songId: string | number, preferences: any) {
  return fetchAPI(`/createPreference/${songId}`, {}, {
    method: "POST",
    body: JSON.stringify(preferences),
  });
}

export async function updatePreference(preferenceId: string | number, preferences: any) {
  return fetchAPI(`/savePreference/${preferenceId}`, {}, {
    method: "PUT",
    body: JSON.stringify(preferences),
  });
}
