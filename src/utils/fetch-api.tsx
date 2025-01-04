import qs from "qs";
import store from "../redux/store";
import { disableGlobalLoader, enableGlobalLoader } from "../redux/slices/viewConfigSlice";

export function getStrapiURL(path = "") {
  return `${import.meta.env.VITE_API_URL}${path}`;
}

export async function fetchAPI(
  path: string,
  urlParamsObject: any = {},
  options = {}
) {
  const token = localStorage.getItem("authToken");
  store.dispatch(enableGlobalLoader());
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);

    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;
    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`
    );
  } finally {
    store.dispatch(disableGlobalLoader());
  }
}

export async function loginUser({ username, password }) {
  const response = await fetch(getStrapiURL("/api/auth/local"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: username,
      password,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function registerUser({ username, password, email }) {
  const response = await fetch(getStrapiURL("/api/auth/local/register"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      email,
    }),
  });
  if (!response.ok) {
    // @ts-ignore
    throw new Error(response);
  }
  const data = await response.json();
  return data;
}
