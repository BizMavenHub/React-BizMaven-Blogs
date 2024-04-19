import User from "../../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotnev from "dotenv";
import { errorHandler } from "../../utils/error.js";

dotnev.config();

export async function loginWithEmail(req, res, next) {
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
    res.send({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
}

export async function loginWithGoogle(req, res, next) {
  const { username, email, google_photo_url } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
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
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
}

export default { registerWithEmail, loginWithEmail, loginWithGoogle };
