import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/model.favorite.js";

const addfavorite = async (req, res) => {
  try {
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });
    if (isFavorite) return responseHandler.ok(res, isFavorite);

    const favorite = new favoriteModel({
      ...req.body,
      user: req.user.id,
    });

    await favorite.save();
    responseHandler.created(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

const removefavorite = async (req, res) => {
  try {
    const { favoriveId } = req.params;
    const favorite = await favoriteModel.findOne({
      user: req.user.id,
      _id: favoriveId,
    });
    if (!favorite) return responseHandler.notFound(res);

    await favorite.remove();
    responseHandler.ok(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

const getFavirotesOfUser = async (req, res) => {
  try {
    const favorite = await favoriteModel
      .find({
        user: req.user.id,
      })
      .sort("-createdAt");

    responseHandler.ok(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  addfavorite,
  removefavorite,
  getFavirotesOfUser,
};
