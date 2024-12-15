import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { environment } from "../config/environment.js";

export const protect = async (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token;

  // If no token
  if (!token) {
    res.clearCookie("token");
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, environment.jwt.secret);

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      res.clearCookie("token");
      return res.status(401).json({ message: "Token expired" });
    }

    // Find user and attach to request
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      res.clearCookie("token");
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.clearCookie("token");
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
