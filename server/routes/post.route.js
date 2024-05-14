import express from "express";
import { verifyUser } from "../utils/verifyUser.js";

import { createPost, getPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create-post", verifyUser, createPost);
router.get("/get-post", getPost);

export default router;
