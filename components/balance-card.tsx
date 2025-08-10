
"use client"

import React from "react";
import { AnimatePresence } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function BalanceCard({
  token = "AVAX",
  amount = 48.567,
}: {
  token?: string
  amount?: number
}) {
  const [selectedToken, setSelectedToken] = React.useState("AVAX");
  // Map token value to display name and image
  const tokenMap: Record<string, { name: string; image: string }> = {
    AVAX: { name: "AVAX", image: "/Coin.png" },
    token1: { name: "USDC", image: "/usdc.webp" },
    token2: { name: "BNB", image: "/bnb.webp" },
  };
  // Track previous token for animation direction
  const prevToken = React.useRef(selectedToken);
  const [direction, setDirection] = React.useState(0); // 1 for right, -1 for left

  const handleTabChange = (val: string) => {
    const order = ["AVAX", "token1", "token2"];
    const prevIdx = order.indexOf(selectedToken);
    const nextIdx = order.indexOf(val);
    setDirection(nextIdx > prevIdx ? 1 : -1);
    prevToken.current = selectedToken;
    setSelectedToken(val);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-white/5 bg-[#141419] text-white h-full">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-center"
            >
              <Tabs value={selectedToken} onValueChange={handleTabChange} className="w-auto">
                <TabsList className="bg-zinc-800/50 p-1 rounded-full">
                  <TabsTrigger value="AVAX" className="data-[state=active]:bg-zinc-700 rounded-full px-4 text-white">
                    AVAX
                  </TabsTrigger>
                  <TabsTrigger value="token1" className="data-[state=active]:bg-zinc-700 rounded-full px-4 text-white">
                    Token 1
                  </TabsTrigger>
                  <TabsTrigger value="token2" className="data-[state=active]:bg-zinc-700 rounded-full px-4 text-white">
                    Token 2
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Token section with horizontal scroll animation */}
            <div className="flex flex-col items-center pt-8 min-h-[180px]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={selectedToken}
                  initial={{ x: -200, opacity: 0, scale: 0.9 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: 200, opacity: 0, scale: 0.9 }}
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
                  className="flex flex-col items-center w-full absolute"
                  style={{ position: "absolute" }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} className="relative h-32 w-32">
                    <Image
                      src={tokenMap[selectedToken].image}
                      alt={tokenMap[selectedToken].name}
                      fill
                      className="object-contain drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]"
                      sizes="128px"
                      priority={false}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-8 flex items-baseline gap-2 justify-center"
                  >
                    <div className="text-4xl font-bold tracking-tight">
                      {Intl.NumberFormat("en-US", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(amount)}
                    </div>
                    <div className="text-lg text-zinc-400">{tokenMap[selectedToken].name}</div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Divider - add extra margin above to avoid collision with coin value */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="h-px w-full bg-white/10 mt-20 mb-12" 
              aria-hidden="true" 
            />
            
            {/* NFT section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="relative h-[260px] w-full max-w-[320px] mx-auto mb-2">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Card stack effect */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative w-[220px] h-[300px]"
                  >
                    {/* Background cards - tilted left */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="absolute left-[-24px] top-[12px] w-[200px] h-[280px] bg-zinc-800/60 rounded-xl transform -rotate-6" 
                    />
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      className="absolute left-[-12px] top-[6px] w-[200px] h-[280px] bg-zinc-800/80 rounded-xl transform -rotate-3" 
                    />
                    {/* Main card */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1 }}
                      className="absolute inset-0 w-[200px] h-[280px] bg-zinc-800 rounded-xl shadow-lg"
                    >
                      <Image
                        src="/123.png"
                        alt="NFT card"
                        fill
                        className="object-cover rounded-xl"
                        sizes="200px"
                        
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="text-sm text-zinc-300 mt-4"
              >
                {/* There are no NFTs on your name */}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <Button 
                  variant="ghost" 
                  className="w-full bg-zinc-800/80 text-white hover:bg-zinc-700/90 mt-0 py-6 text-xl font-bold rounded-2xl"
                  asChild
                >
                  <a href="https://magiceden.io/avalanche" target="_blank" rel="noopener noreferrer">
                    Get NFTs
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  )
}
