import jwt from "jsonwebtoken";
import dotnev from "dotenv";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../../../utils/error.js";
import User from "../../../models/user.model.js";

dotnev.config();

export default async function loginWithEmail(req, res, next) {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);

  if (!email || !password || email === "" || password === "") {
    next(errorHandler("All fields are required", 400));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler("User not found", 404));
    }

    const vaildPassword = await bcryptjs.compareSync(password, user.password);

    if (!vaildPassword) {
      return next(errorHandler("Invalid password", 400));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(user);
  } catch (error) {
    next(error);
  }
}
