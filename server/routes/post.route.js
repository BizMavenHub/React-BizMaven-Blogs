import express from "express";
import verifyUser from "../utils/verifyUser.js";

import {
  createPost,
  getPost,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create-post", verifyUser, createPost);
router.get("/get-post/:postId", getPost);
router.get("/get-post", getPosts);
router.delete("/delete-post/:postId", verifyUser, deletePost);
router.put("/update-post/:postId/:userId", verifyUser, updatePost);

export default router;
