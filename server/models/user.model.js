import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  pictureProfile: {
    type: String,
    default: "../assets/default_profile.png",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
