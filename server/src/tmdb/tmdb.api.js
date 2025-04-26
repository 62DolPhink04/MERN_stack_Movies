import axiosClient from "../axios/axios.client.js";
import tmdbEnpoints from "./tmdb.endpoint.js";

const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }) =>
    await axiosClient.get(
      tmdbEnpoints.mediaList({ mediaType, mediaCategory, page })
    ),

  mediaDeatail: async ({ mediaType, page }) =>
    await axiosClient.get(tmdbEnpoints.mediaDetail({ mediaType, page })),

  mediaGenres: async ({ mediaType }) =>
    await axiosClient.get(tmdbEnpoints.mediaGenres({ mediaType })),

  mediaCreadits: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEnpoints.mediaCreadits({ mediaType, mediaId })),

  mediaVideos: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEnpoints.mediaVideos({ mediaType, mediaId })),

  mediaImages: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEnpoints.mediaImages({ mediaType, mediaId })),

  mediaRecommend: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEnpoints.mediaRecommend({ mediaType, mediaId })),

  mediaSearch: async ({ mediaType, query, page }) =>
    await axiosClient.get(tmdbEnpoints.mediaSearch({ mediaType, query, page })),

  persponDetails: async ({ personId }) =>
    await axiosClient.get(tmdbEnpoints.personDetails({ personId })),

  personMedias: async ({ personId }) =>
    await axiosClient.get(tmdbEnpoints.personDetails({ personId })),
};

export default tmdbApi;
