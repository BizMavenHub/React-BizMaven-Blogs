import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";
import { LocalStorage } from "node-localstorage";

dotenv.config();

const localStorage = new LocalStorage("./scratch");

export const verifyUser = (req, res, next) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return next(errorHandler("You are not authenticated", 401));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler("Token is not valid", 401));
    req.user = user;
    next();
  });
};
