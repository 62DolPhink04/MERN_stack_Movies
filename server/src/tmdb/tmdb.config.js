const baseURL = process.env.TMDB_BASE_URL;
const Key = process.env.TMDB_KEY;

const getUrl = (endpoint, params) => {
  const ps = new URLSearchParams(params);

  return `${baseURL}${endpoint}?api_key=${Key}&${ps}`;
};

export default { getUrl };
