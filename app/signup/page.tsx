"use client";

import React, { useState } from "react";
import { useWalletRedirect } from "@/lib/useWalletRedirect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  useWalletRedirect();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setError(error.message);
    else setSuccess("Check your email for the signup link!");
    setLoading(false);
  };

  // MetaMask signup (same as login, but you may want to handle new users differently)
  const handleMetaMaskSignup = async () => {
    setError(null);
    setSuccess(null);
    if (!(window as any).ethereum) {
      setError("MetaMask is not installed.");
      return;
    }
    setLoading(true);
    try {
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      setSuccess(`Wallet connected: ${address}`);
      // Here you would send the address to your backend or Supabase for registration
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a]">
      <Card className="w-full max-w-md bg-[#23232b] border border-[#2a2a2a] shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-2xl text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleEmailSignup} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-lg bg-[#18181b] border border-[#333] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Sign up with Email"}
            </Button>
          </form>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="flex-1 h-px bg-[#333]" />
            or
            <div className="flex-1 h-px bg-[#333]" />
          </div>
          <Button
            onClick={handleMetaMaskSignup}
            className="w-full bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-bold hover:from-yellow-500 hover:to-pink-600"
            disabled={loading}
          >
            Connect with MetaMask
          </Button>
          {error && <div className="text-red-500 text-center text-sm mt-2">{error}</div>}
          {success && <div className="text-green-400 text-center text-sm mt-2">{success}</div>}
        </CardContent>
      </Card>
    </div>
  );
}
