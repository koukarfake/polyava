"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function NetWorthCard({
  total = 24596.48,
  breakdown = [
    { chain: "Avalanche chain", amount: 12086 },
    { chain: "X chain", amount: 12086 },
    { chain: "P Chain", amount: 12086 },
  ],
}: {
  total?: number
  breakdown?: { chain: string; amount: number }[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-white/5 bg-[#141419] text-white">
        <CardContent className="p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-zinc-300 text-2xl"
          >
            Total Net worth
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-5xl font-bold tracking-tight md:text-6xl text-white"
          >
            {"$"}
            {Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(total)}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 grid gap-6 sm:grid-cols-3"
          >
            {breakdown.map((b, index) => (
              <motion.div
                key={b.chain}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="text-left"
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  className="text-base text-zinc-400"
                >
                  {b.chain}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="mt-2 text-xl font-semibold text-white"
                >
                  {"$"}
                  {Intl.NumberFormat("en-US").format(b.amount)}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
