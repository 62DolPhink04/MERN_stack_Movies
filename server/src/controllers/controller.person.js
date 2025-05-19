import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";

const personDetail = async (req, res) => {
  try {
    const { personId } = req.params;
    const person = await tmdbApi.persponDetails({ personId });

    responseHandler.ok(res, person);
  } catch {
    responseHandler.error(res);
  }
};

const personMedias = async (req, res) => {
  try {
    const { personId } = req.params;
    const medias = await tmdbApi.personMedias({ personId });

    responseHandler.ok(res, personMedias);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  personDetail,
  personMedias,
};
