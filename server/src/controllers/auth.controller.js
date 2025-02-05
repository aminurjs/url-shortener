import { User } from "../models/user.model.js";
import {
  cookieOptions,
  generateEmailVerificationToken,
  generateToken,
  sendVerificationEmail,
} from "../utils/token.js";
import { environment } from "../config/environment.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user (not verified yet)
    user = new User({
      name,
      email,
      password,
      provider: "local",
    });

    await user.save();

    // Generate email verification token
    const verificationToken = generateEmailVerificationToken(user._id);

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    // Generate auth token
    const token = generateToken(user);

    // Set token as HTTP-only cookie
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      message:
        "User registered successfully. Please check your email for the verification link.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user. Please try again later." });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token and set as cookie
    const token = generateToken(user);
    res.cookie("token", token, cookieOptions);

    res.json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed. Please try again later." });
  }
};

export const googleCallback = (req, res) => {
  // Generate token and set as cookie
  const token = generateToken(req.user);
  res.cookie("token", token, cookieOptions);

  // Redirect to frontend
  res.redirect(`${environment.cors.origin}/dashboard`);
};

export const getCurrentUser = (req, res) => {
  res.json({
    user: req.user,
  });
};

export const logout = (req, res) => {
  // Clear the token cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: environment.nodeEnv === "production",
    sameSite: "strict",
  });

  // If using passport and session
  if (req.logout) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }

      // Destroy session if using sessions
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error destroying session" });
          }
          res.json({ message: "Logged out successfully" });
        });
      } else {
        res.json({ message: "Logged out successfully" });
      }
    });
  } else {
    res.json({ message: "Logged out successfully" });
  }
};
