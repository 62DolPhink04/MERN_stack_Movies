import publicClient from "../api/client/client.public";

const mediaEndpoints = {
  list: (mediaType, mediaCategory, page) =>
    `${mediaType}/${mediaCategory}?page=${page}`,
  details: (mediaType, mediaId) => `${mediaType}/detail/${mediaId}`,
  search: (mediaType, query, page) =>
    `${mediaType}/search?query=${query}&page=${page}`,
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.list(mediaType, mediaCategory, page)
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getDetails: async ({ mediaType, mediaId }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.details(mediaType, mediaId)
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  search: async ({ mediaType, query, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.search(mediaType, query, page)
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default mediaApi;
