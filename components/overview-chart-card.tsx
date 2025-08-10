"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer } from "recharts"

const data = [{ v: 2 }, { v: 4 }, { v: 6 }, { v: 6.5 }, { v: 7.2 }, { v: 8.8 }, { v: 12.4 }]

export function OverviewChartCard() {
  return (
    <Card className="bg-[#171717] border-[#2a2a2a] rounded-2xl overflow-hidden">
      <CardHeader className="pb-0">
        <CardTitle className="text-white text-base">Overall Portfolio Value</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <div
          className="h-64 rounded-xl overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(#1A1A1A,#1A1A1A), repeating-linear-gradient(0deg, #2a2a2a 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, #2a2a2a 0 1px, transparent 1px 24px)",
            backgroundBlendMode: "normal, overlay, overlay",
          }}
        >
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <defs>
                  <linearGradient id="blueFade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5B67C6" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#5B67C6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#6B75E0"
                  fill="url(#blueFade)"
                  strokeWidth={2.5}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
