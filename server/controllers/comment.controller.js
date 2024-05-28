import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  const { postId, userId, content } = req.body;

  try {
    if (userId !== req.user.id) {
      return next(errorHandler("You are not allowed to create a comment", 403));
    }

    const newComment = await Comment.create({
      postId,
      userId,
      content,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId: postId }).sort({
      createdAt: -1,
    });

    if (!comments) {
      return next(errorHandler("Comments not found", 404));
    }

    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(errorHandler("User not found", 404));
    }

    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};
