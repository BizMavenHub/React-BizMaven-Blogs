import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  const { postId, userId, content } = req.body;

  console.log(postId, req.user.id, content);

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
