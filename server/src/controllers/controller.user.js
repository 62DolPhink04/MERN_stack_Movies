import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/model.user.js";

const signUp = async (req, res) => {
  try {
    const { username, password, disPlayName, email } = req.body;

    const checkUser = await userModel.findOne({ username });
    if (checkUser) {
      return responseHandler.badRequest(res, "User already used");
    }

    const user = new userModel();

    user.username = username;
    user.email = email;
    user.disPlayName = disPlayName;
    // @ts-ignore
    user.setPassword(password);
    await user.save();

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch (error) {
    responseHandler.error(res);
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel
      .findOne({ username })
      .select("username password salt id disPlayName");
    if (!user) {
      return responseHandler.badRequest(res, "User not exist");
    }
    if (!user.validPassword(password)) {
      return responseHandler.badRequest(res, "Wrong password");
    }

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { Password, newPassword } = req.body;
    // const { id } = req.user;

    const user = await userModel
      .findById(req.user.id)
      .select("password salt id");
    if (!user) {
      return responseHandler.unauthorized(res);
    }
    if (!user.validPassword(Password)) {
      return responseHandler.badRequest(res, "Wrong password");
    }

    user.setPassword(newPassword);
    await user.save();

    responseHandler.ok(res, "Update password successfully");
  } catch (error) {
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("username disPlayName email id");

    if (!user) {
      return responseHandler.notFound(res);
    }

    responseHandler.ok(res, user);
  } catch (error) {
    responseHandler.error(res);
  }
};

export default {
  signIn,
  signUp,
  updatePassword,
  getInfo,
};
