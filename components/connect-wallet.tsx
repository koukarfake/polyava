"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ConnectWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    setError(null);
    interface EthereumProvider {
      request: (args: { method: string }) => Promise<string[]>;
    }
    const eth = (window as { ethereum?: EthereumProvider }).ethereum;
    if (typeof window === "undefined" || !eth) {
      setError("MetaMask is not installed");
      return;
    }
    try {
      const accounts = await eth.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (err) {
      if (typeof err === 'object' && err && 'message' in err) {
        setError((err as { message?: string }).message || "Failed to connect");
      } else {
        setError("Failed to connect");
      }
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
