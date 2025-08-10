"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SecureShareClaimPage() {
  const searchParams = useSearchParams();
  const [shareAddress, setShareAddress] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const share = searchParams.get("share");
    if (share) {
      try {
        setShareAddress(atob(share));
      } catch {
        setError("Invalid share link.");
      }
    }
  }, [searchParams]);

  const handleVerify = () => {
    if (userAddress.toLowerCase() === shareAddress.toLowerCase()) {
      setVerified(true);
      setError("");
      // Here you would call backend to transfer tokens to this address
    } else {
      setError("Address does not match the intended recipient.");
      setVerified(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Claim Secure Share</h1>
      {shareAddress && !verified && (
        <>
          <label className="block mb-2 font-medium">Verify Your Address</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="0x..."
            value={userAddress}
            onChange={e => setUserAddress(e.target.value)}
          />
          <button
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition mb-4"
            onClick={handleVerify}
            disabled={!userAddress}
          >
            Verify & Claim
          </button>
        </>
      )}
      {verified && (
        <div className="bg-green-100 text-green-800 p-3 rounded text-center font-semibold">
          Success! Tokens have been added to your account.
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 p-2 rounded text-center mt-2">
          {error}
        </div>
      )}
      {!shareAddress && !error && (
        <div className="text-center text-gray-500">Invalid or missing share link.</div>
      )}
    </div>
  );
}
