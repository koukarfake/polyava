"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export type Transaction = {
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
};

export default function TransactionsList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("timestamp", { ascending: false });
      if (error) setError(error.message);
      else setTransactions(data || []);
      setLoading(false);
    };
    fetchTransactions();
  }, []);

  if (loading) return <div className="text-center py-8">Loading transactions...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="overflow-x-auto w-full mt-8">
      <table className="min-w-full bg-zinc-900 rounded-xl overflow-hidden">
        <thead>
          <tr className="text-left text-zinc-400 text-sm">
            <th className="px-4 py-2">Hash</th>
            <th className="px-4 py-2">From</th>
            <th className="px-4 py-2">To</th>
            <th className="px-4 py-2">Token</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Network</th>
            <th className="px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-t border-zinc-800 hover:bg-zinc-800/50 transition">
              <td className="px-4 py-2 font-mono text-xs max-w-[120px] truncate">{tx.hash}</td>
              <td className="px-4 py-2 font-mono text-xs max-w-[120px] truncate">{tx.from_address}</td>
              <td className="px-4 py-2 font-mono text-xs max-w-[120px] truncate">{tx.to_address}</td>
              <td className="px-4 py-2">{tx.token_symbol}</td>
              <td className="px-4 py-2">{tx.amount}</td>
              <td className="px-4 py-2">{tx.status}</td>
              <td className="px-4 py-2">{tx.network}</td>
              <td className="px-4 py-2 text-xs">{new Date(tx.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
