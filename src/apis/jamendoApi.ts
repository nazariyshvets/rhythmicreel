const API_KEY = "api_key";
const API_BASE_URL = "https://api.jamendo.com/v3.0";

async function getSongs(
  search = "",
  offset = 0,
  limit = 20,
  imageSize = 35,
  order = "popularity_total",
) {
  const tracksEndpoint = `${API_BASE_URL}/tracks/?client_id=${API_KEY}&search=${search}&offset=${offset}&limit=${limit}&imagesize=${imageSize}&order=${order}`;

  try {
    const response = await fetch(tracksEndpoint);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export { getSongs };
