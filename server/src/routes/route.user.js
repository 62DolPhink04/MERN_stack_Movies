import express from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/controller.favorive.js";
import userController from "../controllers/controller.user.js";
import requestHandler from "../handlers/request.handler.js";
import tokenMiddleware from "../middlewares/token.middlewares.js";
import userModel from "../models/model.user.js";

const router = express.Router();

router.post(
  "/signup",
  body("username")
    .exists()
    .withMessage("userName is required")
    .isLength({ min: 8 })
    .withMessage("username minium  8 characters")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("Username already in use");
    }),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minium 8 characters"),

  body("confirmPassword")
    .exists()
    .withMessage("confirmPassword is required")
    .isLength({ min: 8 })
    .withMessage("ConfirmPassword minium 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("ConfirmPassword not match");
      return true;
    }),

  body("disPlayName")
    .exists()
    .withMessage("disPlayName is required")
    .isLength({ min: 8 })
    .withMessage("displayName minium 8 characters"),

  requestHandler.validate,
  userController.signUp
);

router.post(
  "/signin",
  body("username")
    .exists()
    .withMessage("userName is required")
    .isLength({ min: 8 })
    .withMessage("username minium  8 characters"),

  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minium 8 characters"),

  requestHandler.validate,
  userController.signIn
);

router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("passwod")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minium 8 characters"),

  body("newPasswod")
    .exists()
    .withMessage("newPasswod is required")
    .isLength({ min: 8 })
    .withMessage("newPasswod minium 8 characters"),

  body("confirmNewPasswod")
    .exists()
    .withMessage("confirmNewPasswod is required")
    .isLength({ min: 8 })
    .withMessage("confirmNewPasswod minium 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.newPasswod)
        throw new Error("confirmNewPasswod not match");
      return true;
    }),

  requestHandler.validate,
  userController.updatePassword
);

router.get("/info", tokenMiddleware.auth, userController.getInfo);
router.get(
  "/favorites",
  tokenMiddleware.auth,
  favoriteController.getFavirotesOfUser
);

router.post(
  "/favariotes",
  tokenMiddleware.auth,
  body("mediatype")
    .exists()
    .withMessage("MediaType is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("MediaType invalid"),
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId can not be empty"),
  body("mediaTitle").exists().withMessage("mediaTitle is required"),
  body("mediaPoster").exists().withMessage("mediaPoster is required"),
  body("mediaRate").exists().withMessage("mediaRate is required"),
  favoriteController.addfavorite
);

router.delete(
  "/favariotes/:favoriveId",
  tokenMiddleware.auth,
  favoriteController.removefavorite,
  body("favoriveId")
    .exists()
    .withMessage("favoriveId is required")
    .isLength({ min: 1 })
    .withMessage("favoriveId can not be empty"),
  favoriteController.removefavorite
);
export default router;
