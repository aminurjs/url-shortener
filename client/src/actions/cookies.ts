"use server";

import { cookies } from "next/headers";

export const setServerCookie = async (token: string) => {
  cookies().set("auth-token", token);
  return true;
};
export const removeServerCookie = async () => {
  cookies().delete("auth-token");
  return true;
};
