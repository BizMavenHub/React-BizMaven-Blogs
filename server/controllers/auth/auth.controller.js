import User from "../../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotnev from "dotenv";
import { errorHandler } from "../../utils/error.js";

dotnev.config();

export async function registerWithEmail(req, res, next) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    next(errorHandler("All fields are required", 400));
  }

  const existedEmail = await User.findOne({ email });

  if (existedEmail) {
    next(errorHandler("Email already exists", 400));
  }

  const hashedPassword = await bcryptjs.hashSync(password, 10);

  // Save user to database
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.send({ message: "User created successfully", newUser });
  } catch (error) {
    next(error);
  }
}

export async function loginWithEmail(req, res, next) {
  const { email, password } = req.body;

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

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const { password: pass, ...rest } = user._doc;

    res
      .cookie("access_token", token, {
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
        sameSite: "none",
        secure: true,
        domain: "react-bizmaven-blogs.onrender.com",
        path: "/",
      })
      .status(200)
      .json({ message: "Login successfully", ...rest });
  } catch (error) {
    next(error);
  }
}

export async function loginWithGoogle(req, res, next) {
  const { username, email, google_photo_url } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
      const { password, ...rest } = user._doc;

      res
        .status(200)
        .setHeader("Access-Control-Allow-Credentials", true)
        .cookie("access_token", token, {
          expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30), // 30 days
          secure: true,
          sameSite: "none",
        })
        .json({ message: "Login successfully", ...rest });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          username.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        pictureProfile: google_photo_url,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
      const { password, ...rest } = newUser._doc;

      res
        .status(200)
        .setHeader("Access-Control-Allow-Credentials", true)
        .cookie("access_token", token, {
          expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30), // 30 days
          secure: true,
          sameSite: "none",
        })
        .json({ message: "Login successfully", ...rest });
    }
  } catch (error) {
    next(error);
  }
}

export default {
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
};
