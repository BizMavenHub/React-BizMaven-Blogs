import express from "express";

import {
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
} from "../controllers/auth/auth.controller.js";

const router = express.Router();

router.post("/register-with-email", registerWithEmail);
router.post("/login-with-email", loginWithEmail);
router.post("/login-with-google", loginWithGoogle);

export default router;
