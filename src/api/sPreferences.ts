import {fetchAPI} from "../utils/fetch-api.tsx";

export const sPreferencesApi = {
  getPreferences: (songId) => fetchAPI(`/getPreferencesBySongId/${songId}`),
  createPreferences: (songId, preferences) => fetchAPI(`/createPreference/${songId}`, {}, {
    method: "POST",
    body: JSON.stringify({ data: preferences }),
  }),
  updatePreferences: (preferenceId, preferences) => fetchAPI(`/savePreference/${preferenceId}`, {}, {
    method: "PUT",
    body: JSON.stringify({ data: preferences }),
  })
}