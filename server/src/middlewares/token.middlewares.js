import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      return jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    }
    return false;
  } catch (error) {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  if (!tokenDecoded) {
    return responseHandler.unaithorized(res, "Token is not valid");
  }

  const user = await userModel.findById(tokenDecoded.data);

  if (!user) {
    return responseHandler.unaithorized(res, "User not found");
  }

  req.user = user;

  next();
};

export default { auth, tokenDecode };
