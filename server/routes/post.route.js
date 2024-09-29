import express from "express";
import verifyUser from "../utils/verifyUser.js";

import {
  getPosts,
  getMostViewedPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/get-post", getPosts);
router.get("/get-most-viewed-posts", getMostViewedPosts);

router.post("/create-post", verifyUser, createPost);
router.put("/update-post/:postId/:userId", verifyUser, updatePost);
router.delete("/delete-post/:postId", verifyUser, deletePost);

export default router;
