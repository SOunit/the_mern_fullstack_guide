const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");
const { jwt_secret_key } = require("../env");

module.exports = (req, res, next) => {
  try {
    // authorization = "Bearer TOKEN"
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }

    // verify throws error if failed
    const decodedToken = jwt.verify(token, jwt_secret_key);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  }
};
