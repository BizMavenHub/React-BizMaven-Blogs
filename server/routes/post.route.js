import express from "express";
import { verifyUser } from "../utils/verifyUser.js";

import {
  createPost,
  getPost,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create-post", verifyUser, createPost);
router.get("/get-post", getPost);
router.delete("/delete-post/:postId", verifyUser, deletePost);

export default router;
