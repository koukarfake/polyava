"use client";


import Sidebar from "@/components/sidebar";
export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#1a1a1a]">
      <Sidebar highlight="Portfolio" />
      <div className="flex-1 p-6 min-h-screen space-y-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Welcome to Polyava Dashboard</h1>
            <p className="text-gray-400">Your main dashboard overview</p>
          </div>
        </div>
      </div>
    </div>
  );
}
