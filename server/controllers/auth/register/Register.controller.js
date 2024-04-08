import User from "../../../models/user.model.js";
import bcryptjs from "bcryptjs";

export default async function registerWithEmail(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existedEmail = await User.findOne({ email });

  if (existedEmail) {
    return res.status(400).json({ message: "Email already exists" });
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
    res.send("User created successfully");
  } catch (error) {
    res.send({ message: error.message });
  }
}
