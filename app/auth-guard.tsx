"use client";

import { useAuth } from "@/components/auth-provider";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user && pathname !== "/login" && pathname !== "/signup") {
        window.location.href = "/login";
      }
      if (user && (pathname === "/login" || pathname === "/signup")) {
        window.location.href = "/";
      }
    }
  }, [user, loading, pathname]);

  if (loading) return null;
  if (!user && pathname !== "/login" && pathname !== "/signup") return null;
  if (user && (pathname === "/login" || pathname === "/signup")) return null;
  return <>{children}</>;
}
