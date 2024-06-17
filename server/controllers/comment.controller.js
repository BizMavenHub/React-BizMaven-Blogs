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

export const getComment = async (req, res, next) => {
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

export const getComments = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler("You are not allowed to get comments", 403));
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalComments = await Comment.countDocuments();
    const now = Date.now();
    const oneMonthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
    const lastMonthComments = await Comment.countDocuments({
      createdAt: {
        $gte: oneMonthAgo,
      },
    });

    res.status(200).json({
      comments,
      lastMonthComments,
      totalComments,
    });
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

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler("Comment not found", 404));
    }

    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};

export const dislikeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler("Comment not found", 404));
    }

    const userIndex = comment.dislikes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfDislikes += 1;
      comment.dislikes.push(req.user.id);
    } else {
      comment.numberOfDislikes -= 1;
      comment.dislikes.splice(userIndex, 1);
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(errorHandler("Comment not found", 404));
    }

    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler("You are not allowed to edit this comment", 403)
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { content: req.body.content },
      { new: true }
    );

    if (!editedComment) {
      return next(errorHandler("Comment not found", 404));
    }

    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(errorHandler("Comment not found", 404));
    }

    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler("You are not allowed to delete this comment", 403)
      );
    }

    await Comment.findByIdAndDelete(req.params.commentId);

    res.status(200).json("Comment has been deleted");
  } catch (error) {
    next(error);
  }
};
