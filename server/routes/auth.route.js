import express from "express";

import {
  registerWithEmail,
  loginWithEmail,
} from "../controllers/auth/auth.controller.js";

const router = express.Router();

router.post("/register-with-email", registerWithEmail);
router.post("/login-with-email", loginWithEmail);

export default router;
