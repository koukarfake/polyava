"use client";


import Sidebar from "@/components/sidebar";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#1a1a1a]">
      <Sidebar highlight="Portfolio" />
      <div className="flex-1 p-6 min-h-screen space-y-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Welcome to Polyava Dashboard</h1>
            <p className="text-gray-400">Your main dashboard overview</p>
            <Link href="/secure-share" passHref legacyBehavior>
              <button
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold shadow"
                type="button"
              >
                Secure Send
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
