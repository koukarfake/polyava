"use client"

import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Activity } from "lucide-react"
import PortfolioChart from "@/components/portfolio-chart"

export default function Analytics() {
  const metrics = [
    {
      title: "Portfolio Growth",
      value: "+18.2%",
      change: "+2.4%",
      isPositive: true,
      icon: TrendingUp,
    },
    {
      title: "Monthly P&L",
      value: "$4,832.50",
      change: "+12.8%",
      isPositive: true,
      icon: DollarSign,
    },
    {
      title: "Transaction Volume",
      value: "156",
      change: "-5.2%",
      isPositive: false,
      icon: Activity,
    },
    {
      title: "Best Performer",
      value: "AVAX",
      change: "+24.3%",
      isPositive: true,
      icon: TrendingUp,
    },
  ]

  const transactions = [
    { type: "Buy", token: "AVAX", amount: "25.5", value: "$1,087.50", time: "2 hours ago", status: "Completed" },
    { type: "Sell", token: "JOE", amount: "1,200", value: "$456.80", time: "5 hours ago", status: "Completed" },
    { type: "Stake", token: "AVAX", amount: "100", value: "$4,250.00", time: "1 day ago", status: "Active" },
    { type: "Bridge", token: "USDC", amount: "500", value: "$500.00", time: "2 days ago", status: "Completed" },
  ]

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar highlight="Analytics" />
      <div className="flex-1 p-6 bg-[#1a1a1a] min-h-screen space-y-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-gray-400">Detailed insights into your portfolio performance</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="bg-[#2a2a2a] border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">{metric.title}</p>
                      <p className="text-white font-bold text-lg">{metric.value}</p>
                      <Badge
                        className={
                          metric.isPositive
                            ? "text-green-400 bg-green-500/20 border-green-500/30"
                            : "text-red-400 bg-red-500/20 border-red-500/30"
                        }
                      >
                        {metric.change}
                      </Badge>
                    </div>
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <metric.icon className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Portfolio Performance */}
            <div className="bg-[#171717] border-[#2a2a2a] rounded-2xl lg:col-span-2">
              <PortfolioChart />
            </div>

            {/* Recent Transactions */}
            <Card className="bg-[#2a2a2a] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((tx, index) => (
                    <div key={index} className="p-3 bg-[#3a3a3a] rounded-lg border border-gray-600">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                              tx.type === "Buy"
                                ? "bg-green-500/20 text-green-400"
                                : tx.type === "Sell"
                                  ? "bg-red-500/20 text-red-400"
                                  : tx.type === "Stake"
                                    ? "bg-blue-500/20 text-blue-400"
                                    : "bg-purple-500/20 text-purple-400"
                            }`}
                          >
                            {tx.type.slice(0, 1)}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">
                              {tx.type} {tx.amount} {tx.token}
                            </p>
                            <p className="text-gray-400 text-xs">{tx.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium text-sm">{tx.value}</p>
                          <Badge
                            className={
                              tx.status === "Completed"
                                ? "text-green-400 bg-green-500/20 border-green-500/30"
                                : "text-blue-400 bg-blue-500/20 border-blue-500/30"
                            }
                          >
                            {tx.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
