import qs from "qs";

export function getStrapiURL(path = "") {
  return `${
    process.env?.NEXT_PUBLIC_STRAPI_API_URL || "https://be.justworship.uk"
  }${path}`;
}

export async function fetchAPI(
  path: string,
  urlParamsObject: any = {},
  options = {}
) {
  
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 774099e6aefe03b082250a5dd917928a50b6aaf5d71b4959e929923a4a6fa82f957dd1fa472e1b7d032672cb23dc308be35c2d532a2d0eb512d36b213b781701ae7375a56109ab2dd00797c4a71b16c3dbc6ce3f68b255384364528cde1c1a45563505e8284fb28942c670f3292a1f522a9078f21ac8964c95837babfe7b22e2`,
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
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
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
