"use client"

import { Button } from "@/components/ui/button"
import { Lock, LogOut, Shield, ChevronRight } from "lucide-react"
import Link from "next/link"

import ConnectWallet from "./connect-wallet"
import { cn } from "@/lib/utils"

interface SidebarProps {
  highlight?: string;
}

export default function Sidebar({ highlight }: SidebarProps) {
  const navLinks = [
    { label: "Portfolio", href: "/" },
    { label: "Analytics", href: "/analytics" },
    { label: "Alerts", href: "/alerts" },
    { label: "Settings", href: "/settings" },
  ];

  const NavItem = ({
    label,
    href,
    active = false,
  }: {
    label: string;
    href: string;
    active?: boolean;
  }) => (
    <Link href={href} passHref legacyBehavior>
      <Button
        asChild
        variant={active ? "default" : "ghost"}
        className={cn(
          "w-full justify-start rounded-xl px-5 py-7 text-lg font-medium transition-colors",
          active
            ? "bg-[#2D3562] hover:bg-[#2D3562] text-white"
            : "text-zinc-300 hover:bg-zinc-900 hover:text-white focus:text-white"
        )}
      >
        <a>{label}</a>
      </Button>
    </Link>
  );

  return (
    <aside className="hidden md:flex md:flex-col md:gap-6 md:border-r md:border-white/5 md:bg-[#0B0B0F] md:px-4 md:py-6 md:w-[260px] md:min-w-[260px] md:max-w-[260px] md:overflow-hidden">
      {/* Top rounded placeholder */}
      <div className="rounded-xl bg-zinc-800/70 h-20 w-full" aria-label="Workspace placeholder" />

      <nav className="mt-4 flex flex-1 flex-col gap-2">
        {navLinks.map((item) => (
          <NavItem
            key={item.label}
            label={item.label}
            href={item.href}
            active={highlight ? item.label === highlight : item.label === "Portfolio"}
          />
        ))}

        <div className="mt-8 rounded-xl border border-[#3C47A0] bg-transparent p-3">
          <Button
            variant="ghost"
            className="flex w-full items-center justify-between rounded-lg px-4 py-6 text-zinc-100 hover:bg-transparent"
          >
            <span className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-[#7EA6FF]" />
              <span className="text-lg font-medium">Secure Share</span>
            </span>
            <ChevronRight className="h-5 w-5 text-zinc-400" />
          </Button>
        </div>
      </nav>

      {/* Connect Wallet button just before logout */}
      <ConnectWallet />

      <div className="mt-4">
        <Button className="flex w-full items-center justify-between rounded-xl bg-[#2D3562] px-4 py-6 text-white hover:bg-[#2b3157]">
          <span className="font-medium">Logout</span>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      <div className="sr-only">
        <Link href="#" aria-label="Secure Share">
          <Shield className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  )
}
