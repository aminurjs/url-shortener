"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@/types";

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

export const verifyToken = (token: string): User | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const getActiveUser = async () => {
  const token = await getTokenFromCookie();

  if (!token) {
    return null;
  }
  return verifyToken(token);
};

export const isAuthenticated = () => {
  const user = getActiveUser();
  return !!user;
};
