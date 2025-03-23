import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { environment } from "../config/environment.js";

export const protect = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return unauthorizedResponse(res, "Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, environment.jwt.secret);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return unauthorizedResponse(res, "Not authorized, user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    unauthorizedResponse(res, "Not authorized, invalid or expired token");
  }
};

// Helper function for cleaner logic
const unauthorizedResponse = (res, message) => {
  return res.status(401).json({ message });
};
