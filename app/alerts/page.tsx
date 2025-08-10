"use client";



import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { fetchCChainTokens, fetchTokenPricesByIds } from "@/lib/fetchCChainTokens";
import Sidebar from "@/components/sidebar";
import dynamic from "next/dynamic";
// Lazy load BuyTokenButton to avoid SSR issues with window.ethereum
const BuyTokenButton = dynamic(() => import("@/components/buy-token-button"), { ssr: false });

  // Special buy button for AVAX (native coin)
  function BuyAvaxButton() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

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
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({ method: "eth_accounts" }) as string[];
        const from = accounts && accounts[0];
        if (!from) throw new Error("No wallet connected");
        const tx = await window.ethereum.request({
          method: "eth_sendTransaction",
          // @ts-expect-error: MetaMask types are not always up to date
          params: [
            {
              to: from,
              from,
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
        <button onClick={handleBuy} disabled={loading} className="bg-[#2D3562] text-white hover:bg-[#3C47A0] rounded px-3 py-1 text-sm">
          {loading ? "Processing..." : `Buy AVAX`}
        </button>
        {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
        {success && <span className="text-xs text-green-400 mt-1">{success}</span>}
      </div>
    );
  }

export default function AlertsPage() {
  const [tokens, setTokens] = useState<Array<{ id: string; symbol: string; name: string; image: string; address: string }>>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [prevPrices, setPrevPrices] = useState<Record<string, number>>({});
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [priceError, setPriceError] = useState<string | null>(null);

  // Fetch token list on mount
  useEffect(() => {
    let mounted = true;
    async function fetchTokens() {
      setLoading(true);
      const t = await fetchCChainTokens();
      if (mounted) setTokens(t);
      setLoading(false);
    }
    fetchTokens();
    return () => { mounted = false; };
  }, []);

  // Fetch prices every 15 seconds
  useEffect(() => {
    if (!tokens.length) return;
    let mounted = true;
    async function fetchPrices() {
      setPriceError(null);
      const ids = tokens.map((t) => t.id);
      try {
        const data = await fetchTokenPricesByIds(ids);
        if (mounted) {
          setPrevPrices(prices);
          setPrices(data);
          setLastUpdated(new Date().toLocaleTimeString());
        }
      } catch (e) {
        if (mounted) setPriceError("Failed to fetch token prices. Please try again later.");
      }
    }
    fetchPrices();
    const interval = setInterval(fetchPrices, 15000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens]);

  return (
    <div className="flex min-h-screen bg-[#0B0B0F]">
      <Sidebar highlight="Alerts" />
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-10">
        <div className="w-full max-w-2xl h-[calc(100vh-80px)] flex flex-col">
          <h1 className="text-2xl font-bold mb-4 text-center text-white tracking-tight shrink-0">Live C-Chain Coin Prices</h1>
          <Card className="bg-gradient-to-br from-[#18181b] to-[#23232b] border border-[#2a2a2a] shadow-xl flex-1 flex flex-col min-h-0">
            <ul className="divide-y divide-[#2a2a2a] overflow-y-auto flex-1 min-h-0" style={{ maxHeight: "calc(100vh - 220px)" }}>
              {priceError && (
                <li className="p-6 text-center text-red-400">{priceError}</li>
              )}
              {loading && (
                <li className="p-6 text-center text-gray-500">Loading tokens...</li>
              )}
              {!loading && tokens.length === 0 && (
                <li className="p-6 text-center text-gray-500">No C-Chain tokens found.</li>
              )}
              {tokens.map((token) => {
                const price = prices[token.id];
                const prev = prevPrices[token.id];
                let direction: "up" | "down" | null = null;
                if (prev !== undefined && price !== undefined) {
                  direction = price > prev ? "up" : price < prev ? "down" : null;
                }
                const tokenAddress = token.address || "";
                return (
                  <li key={token.id} className="p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={token.image} alt={token.name} className="w-8 h-8 rounded-full bg-[#23232b] border border-[#2a2a2a]" />
                      <span className="font-semibold text-white text-lg">{token.name}</span>
                      <span className="ml-2 text-xs text-gray-400">({token.symbol})</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {direction === "up" && <span className="text-green-400 text-lg">▲</span>}
                        {direction === "down" && <span className="text-red-400 text-lg">▼</span>}
                        <span className="text-white text-xl font-mono">{price !== undefined ? `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}` : <span className="text-gray-500">Loading...</span>}</span>
                      </div>
                      {token.symbol.toUpperCase() === "AVAX" ? (
                        <BuyAvaxButton />
                      ) : tokenAddress ? (
                        <BuyTokenButton tokenSymbol={token.symbol} tokenAddress={tokenAddress} />
                      ) : (
                        <span className="text-xs text-gray-500">No address</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="text-right text-xs text-gray-500 mt-2 shrink-0">Last updated: {lastUpdated || "-"}</div>
          </Card>
          <div className="mt-6 text-center text-gray-400 text-sm shrink-0">Prices auto-refresh every 15 seconds. Powered by CoinGecko.</div>
        </div>
      </main>
    </div>
  );
}
