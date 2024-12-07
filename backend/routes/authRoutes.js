import express from "express";
import { register, login } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Example of a protected route
router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "You are authorized", user: req.user });
});

export default router;
