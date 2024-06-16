import express from "express";
import verifyUser from "../utils/verifyUser.js";
import {
  createComment,
  getComment,
  getComments,
  getUsers,
  likeComment,
  dislikeComment,
  deleteComment,
  editComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create-comment", verifyUser, createComment);
router.get("/get-comment/:postId", getComment);
router.get("/get-comments", verifyUser, getComments);
router.get("/get-user/:userId", getUsers);

router.put("/like-comment/:commentId", verifyUser, likeComment);
router.put("/dislike-comment/:commentId", verifyUser, dislikeComment);

router.put("/edit-comment/:commentId", verifyUser, editComment);

router.delete("/delete-comment/:commentId", verifyUser, deleteComment);

export default router;
