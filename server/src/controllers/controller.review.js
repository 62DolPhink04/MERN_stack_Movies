import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/model.review.js";

const create = async (req, res) => {
  try {
    const { movieId } = req.params;
    const review = await reviewModel({
      user: req.user.id,
      movieId,
      ...req.body,
    });
    await review.save();

    responseHandler.create(res, {
      ...review._doc,
      id: review._id,
      user: req.user,
    });
  } catch {
    responseHandler.error(res);
  }
};

const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await reviewModel.findOne({
      _id: reviewId,
      user: req.user.id,
    });

    if (!review) return responseHandler.notFound(res, "Review not found");
    await review.remove();

    responseHandler.ok(res, "Review deleted successfully");
  } catch {
    responseHandler.error(res);
  }
};

const getReviewsOfUser = async (req, res) => {
  try {
    const review = await reviewModel
      .find({
        user: req.user.id,
      })
      .sort("-createdAt");

    responseHandler.ok(res, review);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  create,
  remove,
  getReviewsOfUser,
};
