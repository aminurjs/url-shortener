import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { environment } from "../config/environment.js";

export const protect = async (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token;

  // If no token
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, environment.jwt.secret);

    // Find user and attach to request
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized" });
  }
};
