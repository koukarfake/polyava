"use client";

import { useEffect, useState, createContext, useContext } from "react"; 
// No-op AuthProvider and useAuth for wallet-only auth
export function useAuth() {
  return { user: null, loading: false };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

