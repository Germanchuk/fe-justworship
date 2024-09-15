import qs from "qs";

export function getStrapiURL(path = '') {
  return `${process.env?.NEXT_PUBLIC_STRAPI_API_URL || 'https://be.justworship.uk'}${path}`;
}

export async function fetchAPI(
  path: string,
  urlParamsObject: any = {},
  options = {}
) {


  const token = "7e0833be3171f22a847a1ee557d84dea5f2b8f5e07116f5db978f6f15a62f9212f94ee5ea7a2d43e17844653d0902bb0ada7429c7c2201ab9de86823419531d656de37bb7b1fa055cbb7b2fa47d4e3ecbdfb8629ea810fc7fd4eaecbec6635e6d81a6ded495484caa5f595a1e4286e5b6560e91f866094af1020cd79c3350766";
  
  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");
  
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
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
