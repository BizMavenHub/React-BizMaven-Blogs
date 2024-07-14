import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";

dotenv.config();

const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  console.log("Token: ", token);
  console.log("Request Cookies: ", req.cookies);

  if (!token) {
    return next(errorHandler("You are not authenticated", 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler("Token is not valid", 401));
    req.user = user;
    next();
  });
};

export default verifyUser;
