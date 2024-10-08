import { errorHandler } from "../utils/error.js";
import Post from "../models/post.model.js";

export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler("You are not allowed to create a post", 403));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler("Please provide all fields", 400));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    next(errorHandler(error));
  }
};

export const getMostViewedPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ views: -1 }).limit(5); // Sort the highest views first
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(errorHandler(error));
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          {
            title: { $regex: req.query.searchTerm, $options: "i" },
          },
          {
            content: { $regex: req.query.searchTerm, $options: "i" },
          },
        ],
      }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    // Increase view by 1 for each post viewed
    if (req.query.slug) {
      await Post.findOneAndUpdate(
        { slug: req.query.slug },
        { $inc: { views: 1 } },
        { new: true }
      );
    }

    const totalPosts = await Post.countDocuments();

    const date = new Date();

    const oneMonthAgo = new Date(
      date.getFullYear(),
      date.getMonth() - 1,
      date.getDate()
    );

    const lastMonthPosts = await Post.find({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({ posts, totalPosts, lastMonthPosts });
  } catch (error) {
    next(errorHandler(error));
  }
};

export const deletePost = async (req, res, next) => {
  const postId = req.params.postId;

  if (!req.user.isAdmin) {
    return next(errorHandler("You are not allowed to delete a post", 403));
  }

  try {
    await Post.findByIdAndDelete(postId);
    res.status(200).json("Post has been deleted");
  } catch (error) {
    next(errorHandler(error));
  }
};

export const updatePost = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.id) {
    return next(errorHandler("You are not allowed to update a post", 403));
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          keywords: req.body.keywords,
          image: req.body.image,
          category: req.body.category,
          slug: req.body.slug,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(errorHandler(error));
  }
};
