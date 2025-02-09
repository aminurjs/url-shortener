"use client";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProtectedContext = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isPending, isAuthenticated, user } = useAuth();
  console.log(user);
  useEffect(() => {
    if (!isPending && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isPending, isAuthenticated, router]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen bg-gray-50">
        <div className="custom-loader"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default ProtectedContext;
