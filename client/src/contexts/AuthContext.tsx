"use client";

import * as z from "zod";
import React, { createContext, useState, useEffect, ReactNode } from "react";
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
  logout: async () => ({ message: "" }),
  isPending: false,
});

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  // Check authentication on initial load
  useEffect(() => {
    const checkAuth = async () => {
      setIsPending(true);
      try {
        const response = await apiInstance.get("/auth/me");
        if (response.status === 200) {
          setUser(response.data.user);
          setIsAuthenticated(true);
          router.push("/dashboard");
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check failed", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsPending(false);
      }
    };

    checkAuth();
  }, [router]);

  // Sign Up method
  const signUp = async (values: z.infer<typeof signUpSchema>) => {
    setIsPending(true);
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
    } finally {
      setIsPending(false);
    }
  };

  // Login method
  const login = async (values: z.infer<typeof loginSchema>) => {
    setIsPending(true);
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
    } finally {
      setIsPending(false);
    }
  };

  // Logout method
  const logout = async () => {
    setIsPending(true);
    try {
      const response = await apiInstance.post("/auth/logout");
      if (response?.status === 200) {
        setUser(null);
        setIsAuthenticated(false);
        return { message: "Logout Success" };
      } else {
        return { message: "An unexpected error occurred" };
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return { message: error.response?.data?.message || "Something went wrong" };
      } else {
        return { message: "An unexpected error occurred" };
      }
    } finally {
      setIsPending(false);
    }
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
