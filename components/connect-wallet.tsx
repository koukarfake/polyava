"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ConnectWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    setError(null);
    if (typeof window === "undefined" || !(window as any).ethereum) {
      setError("MetaMask is not installed");
      return;
    }
    try {
      const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (err: any) {
      setError(err.message || "Failed to connect");
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 border border-[#3C47A0] rounded-xl bg-zinc-800/70 mt-4">
      <Button onClick={connectWallet} className="w-full bg-[#2D3562] text-white hover:bg-[#2b3157]">
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
      </Button>
      {error && <span className="text-red-400 text-xs mt-1">{error}</span>}
    </div>
  );
}
