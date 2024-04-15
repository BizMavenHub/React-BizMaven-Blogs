import User from "../../../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../../../utils/error.js";

export default async function registerWithEmail(req, res, next) {
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
