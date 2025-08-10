"use client"


import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Activity } from "lucide-react"
import PortfolioChart from "@/components/portfolio-chart"
import ChainIncomeChart from "@/components/chain-income-chart"
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

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


  type Transaction = {
    id: string;
    user_id: string;
    hash: string;
    from_address: string;
    to_address: string;
    token_symbol: string;
    amount: number;
    status: string;
    network: string;
    timestamp: string;
    type?: string; // fallback for type if available
  };

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(4);
      if (error) setError(error.message);
      else setTransactions(data || []);
      setLoading(false);
    };
    fetchTransactions();
  }, []);

  // Chain income chart data
  // Always show these chains
  const defaultChains = ['C Chain', 'P Chain', 'S Chain', 'Subnets'];
  const { chainChartData, chainList } = useMemo(() => {
    // If no transactions, show mock data for all chains
    if (!transactions.length) {
      const dayCount = 30;
      // Make C Chain (Avalanche) start at $15,000, others more realistic
      let c = 15000, p = 8000, s = 6000, sub = 4000;
      const data = [];
      for (let i = dayCount; i >= 0; i--) {
        c += Math.random() * 200 - 50;
        p += Math.random() * 120 - 30;
        s += Math.random() * 80 - 20;
        sub += Math.random() * 40 - 10;
        data.push({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          }),
          'C Chain': Math.round(c),
          'P Chain': Math.round(p),
          'S Chain': Math.round(s),
          'Subnets': Math.round(sub),
        });
      }
      return { chainChartData: data, chainList: defaultChains };
    }
    // Otherwise, aggregate real data
    const chains = Array.from(new Set(transactions.map(t => t.network)));
    // Ensure all default chains are present in the legend
    defaultChains.forEach(chain => { if (!chains.includes(chain)) chains.push(chain); });
    const days = Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    const chartData = days.map(date => {
      const entry: any = { date };
      chains.forEach(chain => {
        const sum = transactions
          .filter(t => t.network === chain && new Date(t.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === date)
          .reduce((acc, t) => acc + (t.amount || 0), 0);
        entry[chain] = sum;
      });
      return entry;
    });
    return { chainChartData: chartData, chainList: chains };
  }, [transactions]);

  return (
    <div className="flex min-h-screen w-full bg-[#1a1a1a]">
      <Sidebar highlight="Analytics" />
      <div className="flex-1 p-6 min-h-screen space-y-8">
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
            {/* Chain Income Chart */}
            <div className="bg-[#171717] border-[#2a2a2a] rounded-2xl lg:col-span-2">
              <ChainIncomeChart data={chainChartData} chains={chainList} />
            </div>

            {/* Recent Transactions */}
            <Card className="bg-[#2a2a2a] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <svg className="animate-spin h-8 w-8 text-blue-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      <span className="text-blue-300">Loading transactions...</span>
                    </div>
                  ) : error ? (
                    <div className="text-red-500 text-center py-8">{error}</div>
                  ) : transactions.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">No transactions found.</div>
                  ) : (
                    <AnimatePresence>
                      {transactions.map((tx) => {
                        // Guess type from status or fallback
                        let type = tx.type || (tx.status === "Active" ? "Stake" : "Buy");
                        let typeColor =
                          type === "Buy"
                            ? "bg-green-500/20 text-green-400"
                            : type === "Sell"
                            ? "bg-red-500/20 text-red-400"
                            : type === "Stake"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-purple-500/20 text-purple-400";
                        return (
                          <motion.div
                            key={tx.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, type: "spring" }}
                            className="p-3 bg-[#3a3a3a] rounded-lg border border-gray-600 mb-2"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${typeColor}`}>
                                  {type.slice(0, 1)}
                                </div>
                                <div>
                                  <p className="text-white font-medium text-sm">
                                    {type} {tx.amount} {tx.token_symbol}
                                  </p>
                                  <p className="text-gray-400 text-xs">{new Date(tx.timestamp).toLocaleString()}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-white font-medium text-sm">{tx.amount} {tx.token_symbol}</p>
                                <Badge
                                  className={(() => {
                                    const status = (tx.status || "").toLowerCase();
                                    if (status === "completed") return "text-green-400 bg-green-500/20 border-green-500/30";
                                    if (status === "pending") return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
                                    if (status === "failed") return "text-red-400 bg-red-500/20 border-red-500/30";
                                    return "text-blue-400 bg-blue-500/20 border-blue-500/30";
                                  })()}
                                >
                                  {tx.status}
                                </Badge>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
