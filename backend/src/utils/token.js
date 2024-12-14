import jwt from "jsonwebtoken";
import { environment } from "../config/environment.js";

export const generateToken = (user) => {
  return jwt.sign({ id: user._id }, environment.jwt.secret, {
    expiresIn: environment.jwt.expiresIn,
  });
};
