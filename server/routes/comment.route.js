import express from "express";
import verifyUser from "../utils/verifyUser.js";
import {
  createComment,
  getComments,
  getUsers,
  likeComment,
  dislikeComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create-comment", verifyUser, createComment);
router.get("/get-comments/:postId", getComments);
router.get("/get-user/:userId", getUsers);

router.put("/like-comment/:commentId", verifyUser, likeComment);
router.put("/dislike-comment/:commentId", verifyUser, dislikeComment);

router.delete("/delete-comment/:commentId", verifyUser, deleteComment);

export default router;
