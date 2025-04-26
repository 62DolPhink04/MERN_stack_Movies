import express from "express";
import { body } from "express-validator";
import userController from "../controllers/controller.user.js";
import resquestHandler from "../middleware/handler.js";
import userModel from "../models/model.user.js";

const router = express.Router();

router.post(
  "/signup",
  body("username")
    .exists()
    .withMessage("userName is required")
    .isLength({ min: 0 })
    .withMessage("username minium  8 characters")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("Username already in use");
    }),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 0 })
    .withMessage("password minium 8 characters"),

  body("confirmPassword")
    .exists()
    .withMessage("confirmPassword is required")
    .isLength({ min: 0 })
    .withMessage("ConfirmPassword minium 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("ConfirmPassword not match");
      return true;
    }),

  body("disPlayName")
    .exists()
    .withMessage("disPlayName is required")
    .isLength({ min: 0 })
    .withMessage("displayName minium 8 characters"),

  resquestHandler.validate,
  userController.signUp
);

router.post(
  "/signin",
  body("username")
    .exists()
    .withMessage("userName is required")
    .isLength({ min: 0 })
    .withMessage("username minium  8 characters"),

  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 0 })
    .withMessage("password minium 8 characters"),

  resquestHandler.validate,
  userController.signIn
);

router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("passwod")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 0 })
    .withMessage("password minium 8 characters"),

  body("newPasswod")
    .exists()
    .withMessage("newPasswod is required")
    .isLength({ min: 0 })
    .withMessage("newPasswod minium 8 characters"),

  body("confirmNewPasswod")
    .exists()
    .withMessage("confirmNewPasswod is required")
    .isLength({ min: 0 })
    .withMessage("confirmNewPasswod minium 8 characters")
);

export default router;
