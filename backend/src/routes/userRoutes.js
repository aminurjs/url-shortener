import express from "express";
import { getUserDetails } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getUserDetails);

export default router;
