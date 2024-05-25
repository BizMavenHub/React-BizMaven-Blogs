import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler("You are not allowed to get all users", 403));
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const userWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.find({
      createdAt: { $gte: oneMonthAgo },
    });

    res.send({
      message: "Getting all users",
      users: userWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {}
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.send({ message: `Getting user id : ${req.params.userId}`, user });
};

export const updateUserProfile = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler("You are not allowed to update this account", 403)
    );
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler("Password must be at least 6 characters", 400));
    }
    req.body.password = await bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 8 || req.body.username.length > 20) {
      return next(
        errorHandler("Username must be between 8 and 20 characters", 400)
      );
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler("Username must only contain letters and numbers", 400)
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler("Username cannot contain spaces", 400));
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          pictureProfile: req.body.pictureProfile,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler("You are not allowed to delete this account", 403)
    );
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  res
    .status(200)
    .clearCookie("access_token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json("Logged out successfully");
};
