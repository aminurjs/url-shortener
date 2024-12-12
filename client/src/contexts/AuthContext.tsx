"use client";

import * as z from "zod";
import React, { createContext, useState, useEffect, ReactNode, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AuthContextType, User } from "@/types";
import apiInstance from "@/utils/apiInstance";
import { AxiosError } from "axios";
import { loginSchema, signUpSchema } from "@/schemas";

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  signUp: async () => ({ message: "" }),
  login: async () => ({ message: "" }),
  logout: async () => {},
  isPending: false,
});

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Check authentication on initial load
  useEffect(() => {
    const checkAuth = async () => {
      startTransition(async () => {
        try {
          const response = await apiInstance.get("/user/me");
          if (response.status === 200) {
            setUser(response.data.user);
            setIsAuthenticated(true);
          } else {
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Authentication check failed", error);
          setUser(null);
          setIsAuthenticated(false);
        }
      });
    };

    checkAuth();
  }, [router]);

  // Sign Up method
  const signUp = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const response = await apiInstance.post("/auth/register", values);
      if (response?.data?.user) {
        setUser(response?.data?.user);
        setIsAuthenticated(true);
        return { message: "Success" };
      } else {
        return { message: "An unexpected error occurred" };
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return { message: error.response?.data?.message || "Something went wrong" };
      } else {
        return { message: "An unexpected error occurred" };
      }
    }
  };

  // Login method
  const login = async (values: z.infer<typeof loginSchema>) => {
    try {
      const response = await apiInstance.post("/auth/login", values);
      if (response?.data?.user) {
        setUser(response?.data?.user);
        setIsAuthenticated(true);
        return { message: "Success" };
      } else {
        return { message: "An unexpected error occurred" };
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return { message: error.response?.data?.message || "Something went wrong" };
      } else {
        return { message: "An unexpected error occurred" };
      }
    }
  };

  // Logout method
  const logout = async () => {
    startTransition(async () => {
      try {
        const response = await apiInstance.post("/auth/logout");
        if (response?.status === 200) {
          setUser(null);
          setIsAuthenticated(false);
          return response?.data;
        } else {
          throw new Error("An unexpected error occurred");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data?.message || "Something went wrong");
        } else {
          throw new Error("An unexpected error occurred");
        }
      }
    });
  };

  // Context value
  const contextValue = {
    user,
    isAuthenticated,
    signUp,
    login,
    logout,
    isPending,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
