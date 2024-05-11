import express from "express";
import { verifyUser } from "../utils/verifyUser.js";

import {
  updateUserProfile,
  getAllUser,
  getUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/get-all-users-from-db", getAllUser);
router.get("/get-user/:userId", getUser);
router.put("/update-profile/:userId", verifyUser, updateUserProfile);
router.delete("/delete-user/:userId", verifyUser, deleteUser);

export default router;
