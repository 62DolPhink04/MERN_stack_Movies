import publicClient from "../api/client/client.public";

const genreEndpoints = {
  list: ({ mediaType }) => `${mediaType}/genres`,
};

const genreApi = {
  getList: async ({ mediaType }) => {
    try {
      const response = await publicClient.get(
        genreEndpoints.list({ mediaType })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default genreApi;
