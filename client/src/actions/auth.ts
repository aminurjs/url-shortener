"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  // email: string;
  // Add other relevant fields from your token
}

export const setTokenCookie = (token: string) => {
  cookies().set("auth-token", token);
};

export const removeTokenCookie = () => {
  cookies().delete("auth-token");
  return true;
};

export const getTokenFromCookie = (): string | null => {
  return cookies().get("auth-token")?.value || null;
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const getActiveUser = () => {
  const token = getTokenFromCookie();

  if (!token) {
    return null;
  }

  return verifyToken(token);
};

export const isAuthenticated = () => {
  const user = getActiveUser();
  return !!user;
};
