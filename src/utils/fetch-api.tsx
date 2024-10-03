import qs from "qs";

export function getStrapiURL(path = "") {
  return `${
    process.env?.NEXT_PUBLIC_STRAPI_API_URL || "https://be.justworship.uk"
  }${path}`;
}

export async function fetchAPI(
  path: string,
  config: any = {
    usePublicToken: false,
  },
  urlParamsObject: any = {},
  options = {}
) {
  const { usePublicToken } = config;

  let headers;

  if (usePublicToken) {
    headers = {
      Authorization: `Bearer 7e0833be3171f22a847a1ee557d84dea5f2b8f5e07116f5db978f6f15a62f9212f94ee5ea7a2d43e17844653d0902bb0ada7429c7c2201ab9de86823419531d656de37bb7b1fa055cbb7b2fa47d4e3ecbdfb8629ea810fc7fd4eaecbec6635e6d81a6ded495484caa5f595a1e4286e5b6560e91f866094af1020cd79c3350766`,
    };
  } else {
    //get token from localstorage
  }

  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        ...headers,
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
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("tryCatch: ", error);
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`
    );
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
      email
    }),
  });
  if (!response.ok) {
    // @ts-ignore
    throw new Error(response);
  }
  const data = await response.json();
  return data;
}
