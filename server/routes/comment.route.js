import express from "express";
import { createComment } from "../controllers/comment.controller.js";
import verifyUser from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create-comment", verifyUser, createComment);

export default router;
