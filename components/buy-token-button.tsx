import { useState } from "react";
import { Button } from "@/components/ui/button";

interface BuyTokenButtonProps {
  tokenSymbol: string;
  tokenAddress: string;
}

export default function BuyTokenButton({ tokenSymbol, tokenAddress }: BuyTokenButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // For demo: hardcoded buy 1 token, value 0.01 AVAX
  const handleBuy = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        setError("MetaMask is not available");
        setLoading(false);
        return;
      }
      // Prompt user to connect wallet if not already
      await window.ethereum.request({ method: "eth_requestAccounts" });
      // For demo: send 0.01 AVAX to the token contract (simulate buy)
      const tx = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            to: tokenAddress,
            from: window.ethereum.selectedAddress,
            value: "0x2386F26FC10000", // 0.01 AVAX in wei
          },
        ],
      });
      setSuccess("Transaction sent! Hash: " + tx);
    } catch (err) {
      if (err && typeof err === "object" && "message" in err) {
        setError((err as { message?: string }).message || "Transaction failed");
      } else {
        setError("Transaction failed");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-end">
      <Button onClick={handleBuy} disabled={loading} size="sm" className="bg-[#2D3562] text-white hover:bg-[#3C47A0]">
        {loading ? "Processing..." : `Buy ${tokenSymbol}`}
      </Button>
      {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
      {success && <span className="text-xs text-green-400 mt-1">{success}</span>}
    </div>
  );
}
