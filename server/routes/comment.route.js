import express from "express";
import verifyUser from "../utils/verifyUser.js";
import {
  createComment,
  getComments,
  getUsers,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create-comment", verifyUser, createComment);
router.get("/get-comments/:postId", getComments);
router.get("/get-user/:userId", getUsers);

export default router;
