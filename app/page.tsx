import Sidebar from "@/components/sidebar"
import NetWorthCard from "@/components/net-worth-card"
import PortfolioChart from "@/components/portfolio-chart"
import BalanceCard from "@/components/balance-card"
import ChainOverview from "@/components/chain-overview"

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_600px_at_50%_-200px,rgba(234,92,92,0.05),transparent)]"
      />
      <div className="mx-auto flex min-h-screen w-full max-w-[1800px]">
        <Sidebar />
        <main className="flex-1 relative px-8 pb-12 pt-10 overflow-y-auto overflow-x-hidden h-screen">
          <div className="grid gap-8 xl:grid-cols-[1.6fr_1fr]">
            <div className="grid gap-8 max-w-4xl">
              <NetWorthCard />
              <PortfolioChart />
            </div>
            <div className="w-full max-w-md justify-self-end">
              <BalanceCard />
            </div>
          </div>

          <div className="mt-10">
            <ChainOverview />
          </div>
        </main>
      </div>
    </div>
  )
}
