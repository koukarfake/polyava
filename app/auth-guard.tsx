"use client";


import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [walletConnected, setWalletConnected] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkWallet() {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        try {
          const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
          setWalletConnected(accounts && accounts.length > 0);
        } catch {
          setWalletConnected(false);
        }
      } else {
        setWalletConnected(false);
      }
    }
    checkWallet();
    if ((window as any).ethereum && (window as any).ethereum.on) {
      (window as any).ethereum.on('accountsChanged', checkWallet);
      return () => {
        (window as any).ethereum.removeListener('accountsChanged', checkWallet);
      };
    }
  }, []);

  useEffect(() => {
    if (walletConnected === false && pathname !== "/login" && pathname !== "/signup") {
      router.push("/login");
    }
    if (walletConnected && (pathname === "/login" || pathname === "/signup")) {
      router.push("/dashboard");
    }
  }, [walletConnected, pathname, router]);

  if (walletConnected === null) return null;
  if (!walletConnected && pathname !== "/login" && pathname !== "/signup") return null;
  if (walletConnected && (pathname === "/login" || pathname === "/signup")) return null;
  return <>{children}</>;
}
