"use client";

import { useState } from "react";

export default function SecureSharePage() {
  const [sendAddress, setSendAddress] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerateLink = () => {
    // In a real app, this would call an API to create a secure share and return a unique link
    // For now, just mock a link with the address as a query param (not secure, just demo)
    if (sendAddress) {
      setGeneratedLink(`${window.location.origin}/secure-share/claim?share=${btoa(sendAddress)}`);
      setCopied(false);
    }
  };

  const handleCopy = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Secure Share</h1>
      <label className="block mb-2 font-medium">Send To Address</label>
      <input
        type="text"
        className="w-full border rounded px-3 py-2 mb-4"
        placeholder="0x..."
        value={sendAddress}
        onChange={e => setSendAddress(e.target.value)}
      />
      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-4"
        onClick={handleGenerateLink}
        disabled={!sendAddress}
      >
        Generate Secure Link
      </button>
      {generatedLink && (
        <div className="bg-gray-100 p-3 rounded mb-2 flex items-center justify-between">
          <span className="truncate text-sm">{generatedLink}</span>
          <button
            className="ml-2 px-2 py-1 bg-gray-300 rounded text-xs hover:bg-gray-400"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
      <p className="text-xs text-gray-500 mt-2">Share this link with the recipient. When they open it and verify their address, tokens will be added to their account.</p>
    </div>
  );
}
