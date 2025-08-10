"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useWalletRedirect() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const checkAndRedirect = async () => {
        try {
          const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            router.push("/root/dashboard");
          }
        } catch {}
      };
      checkAndRedirect();
      (window as any).ethereum.on && (window as any).ethereum.on('accountsChanged', checkAndRedirect);
      return () => {
        (window as any).ethereum.removeListener && (window as any).ethereum.removeListener('accountsChanged', checkAndRedirect);
      };
    }
  }, [router]);
}
