import responseHandler from "../handlers/response.handler";
import favariteModel from "../models/model.fav.js";
import userModel from "../models/model.user.js";

const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCatelogy } = req.params;
    const response = await tmdbapi.mediaList({
      mediaType,
      mediaCatelogy,
      page,
    });

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const response = await tmdbapi.mediaGenres({ mediaType });
    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;
    const response = await tmdbapi.mediaSearch({
      mediaType: mediaType === "people" ? "person" : mediaType,
      query,
      page,
    });
    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;

    const media = await tmdbapi.mediaDetail({
      params,
    });
    media.creadits = await tmdbapi.mediaCreadits({
      params,
    });

    const videos = await tmdbapi.mediaVideos({
      params,
    });
    media.videos = videos;

    const images = await tmdbapi.mediaImages({
      params,
    });
    media.images = images;

    const recomment = await tmdbapi.mediaRecomment({
      params,
    });
    media.recomment = recomment.results;

    const tokenMiddleware = await tokenMiddleware.tokenDecode(req);
    if (tokenMiddleware) {
      const user = await userModel.findById(tokenDecode.data);
      if (user) {
        const isFavarite = await favariteModel
          .find({ mediaId })
          .populate("user")
          .sort("-createdAt");
        media.status = mediaStatus;
      }
    }
    responseHandler.ok(res, media);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  getList,
  getGenres,
  search,
  getDetail,
};
