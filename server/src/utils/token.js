import jwt from "jsonwebtoken";
import emailjs from "@emailjs/browser";
import { environment } from "../config/environment.js";

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, environment.jwt.secret, {
    expiresIn: environment.jwt.expiresIn,
  });
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
};

const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;

// Generate email verification token (expires in 1 hour)
const generateEmailVerificationToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
// Send verification email
const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink = `${environment.cors.origin}/verify-email?token=${verificationToken}`;

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: email,
      verification_link: verificationLink,
    });
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export {
  generateToken,
  cookieOptions,
  generateEmailVerificationToken,
  sendVerificationEmail,
};
