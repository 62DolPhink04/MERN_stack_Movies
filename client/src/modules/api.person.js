import publicClinet from "../api/client/client.private.js";

const personEndpoints = {
  detail: ({ personId }) => `person/${personId}`,
  medias: ({ personId }) => `person/${personId}/medias`,
};

const personApi = {
  detail: async ({ personId }) => {
    try {
      const response = await publicClinet.get(
        personEndpoints.detail({ personId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  medias: async ({ personId }) => {
    try {
      const response = await publicClinet.get(
        personEndpoints.medias({ personId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default personApi;
