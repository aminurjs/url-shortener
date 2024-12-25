import { Router } from "express";
import passport from "passport";
import {
  register,
  login,
  googleCallback,
  getCurrentUser,
  logout,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

// Local Authentication Routes
router.post("/register", register);
router.post("/login", login);

// Logout Route
router.post("/logout", protect, logout);

// Google OAuth Routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  googleCallback
);

// Get current user profile
router.get("/me", protect, getCurrentUser);

export default router;
